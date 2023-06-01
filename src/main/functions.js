import round from "./round.js";
import moment from "moment";


export const toMoneyString = (val) => "$" + round(val, 2);
export const toPercentString = (val) => round(val * 100, 2) + "%";

export const getHeadToHeadMatchData = (matches, betAmount, showOnlyProfitable, allowedBookmakers) => {
  let arbedData = [];

  if(matches?.length === 0 || !matches){
    return arbedData;
  }

  for (const match of matches) {
    const homeTeam = match.home_team;
    const awayTeam = match.away_team;

    const arbedMatchData = {
      sport: match.sport_title,
      matchTitle: match.home_team + " VS " + match.away_team,
      startTime: match.commence_time,
      hasMatchStarted: moment(match.commence_time).isSameOrAfter(moment()),
      opportunities: []
    }

    for (const firstBookMaker of match.bookmakers) {
      if(!allowedBookmakers.includes(firstBookMaker.key)){
        continue;
      }

      let firstHomeTeamOdds;
      let firstAwayTeamOdds;

      for (const market of firstBookMaker.markets) {
        if (market.key === 'h2h') {
          for (const outcome of market.outcomes) {
            if (outcome.name === homeTeam) {
              firstHomeTeamOdds = outcome.price;
            } else if (outcome.name === awayTeam) {
              firstAwayTeamOdds = outcome.price;
            }
          }
        }
      }

      if (firstHomeTeamOdds && firstAwayTeamOdds) {
        for (const secondBookMaker of match.bookmakers) {
          if(!allowedBookmakers.includes(secondBookMaker.key)){
            continue;
          }

          if (firstBookMaker.key !== secondBookMaker.key) {
            let secondHomeTeamOdds;
            let secondAwayTeamOdds;

            for (const market of firstBookMaker.markets) {
              if (market.key === 'h2h') {
                for (const outcome of market.outcomes) {
                  if (outcome.name === homeTeam) {
                    secondHomeTeamOdds = outcome.price;
                  } else if (outcome.name === awayTeam) {
                    secondAwayTeamOdds = outcome.price;
                  }
                }
              }
            }

            if (secondAwayTeamOdds && secondHomeTeamOdds) {
              const opportunity = calculateOpportunity(firstHomeTeamOdds, secondAwayTeamOdds, betAmount,
                showOnlyProfitable, homeTeam, awayTeam, firstBookMaker.title, secondBookMaker.title);

              if (opportunity) {
                arbedMatchData.opportunities.push(opportunity);
              }

            }
          }
        }
      }

    }

    if (arbedMatchData.opportunities.length > 0) {


      arbedMatchData.opportunities = arbedMatchData.opportunities.sort((opp1, opp2) => {
        return opp1.profit - opp2.profit;
      }).reverse()

      arbedData.push(arbedMatchData);
    }
  }


  return arbedData.sort((match1, match2) => {
    return match1.opportunities[0].profit - match2.opportunities[0].profit
  }).reverse()
}


export const calculateOpportunity = (firstHomeTeamOdds, secondAwayTeamOdds, betAmount, showOnlyProfitable, homeTeam, awayTeam, firstBookMakerTitle, secondBookMakerTitle) => {
  //WE HAVE 4 ODDS
  const homeTeamWinPercentage1 = (1 / firstHomeTeamOdds);
  const awayTeamWinPercentage1 = (1 / secondAwayTeamOdds);
  const percent1 = homeTeamWinPercentage1 + awayTeamWinPercentage1;
  const profit1 = (betAmount / percent1) - betAmount;

  const stakeHomeTeam = (betAmount * homeTeamWinPercentage1) / percent1;
  const stakeAwayTeam = (betAmount * awayTeamWinPercentage1) / percent1;

  const winHomeTeam1 = stakeHomeTeam * firstHomeTeamOdds;
  const returnHomeTeam1 = winHomeTeam1 - stakeHomeTeam;
  const profitHomeTeam1 = returnHomeTeam1 - stakeAwayTeam;

  const winAwayTeam1 = stakeAwayTeam * secondAwayTeamOdds;
  const returnAwayTeam1 = winAwayTeam1 - stakeAwayTeam;
  const profitAwayTeam1 = returnAwayTeam1 - stakeHomeTeam;

  if ((showOnlyProfitable && percent1 < 1) || !showOnlyProfitable) {
    return {
      title: firstBookMakerTitle + " vs " + secondBookMakerTitle,
      percent: toPercentString(percent1),
      profit: toMoneyString(profit1),
      profitValue: profit1,
      bets: [{
        team: homeTeam,
        odds: firstHomeTeamOdds,
        winPercentage: toPercentString(homeTeamWinPercentage1),
        stake: toMoneyString(stakeHomeTeam),
        win: toMoneyString(winHomeTeam1),
        return: toMoneyString(returnHomeTeam1),
        profit: toMoneyString(profitHomeTeam1),
        betCompany: firstBookMakerTitle
      },
        {
          team: awayTeam,
          odds: secondAwayTeamOdds,
          winPercentage: toPercentString(awayTeamWinPercentage1),
          stake: toMoneyString(stakeAwayTeam),
          win: toMoneyString(winAwayTeam1),
          return: toMoneyString(returnAwayTeam1),
          profit: toMoneyString(profitAwayTeam1),
          betCompany: secondBookMakerTitle
        }
      ]
    };
  }

  return null;
}