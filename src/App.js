import logo from './logo.svg';
import './App.css';
import data from './data.json';
import BetTable from "./main/BetTable";
import {toMoneyString, toPercentString} from "./main/functions";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import moment from "moment";


function App() {

  const [matchedData, setMatchedData] = useState([]);
  const [betAmount, setBetAmount] = useState(200);
  const [showOnlyProfitable, setShowOnlyProfitable] = useState(true);

  const getHeadToHeadMatchData = (matches) => {
    let arbedData = [];
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
                  const opportunity = {
                    title: firstBookMaker.title + " - " + secondBookMaker.title,
                    percent: toPercentString(percent1),
                    profit: toMoneyString(profit1),
                    profitValue: profit1,
                    bets: [{
                      key: homeTeam + firstBookMaker + 1,
                      team: homeTeam,
                      odds: firstHomeTeamOdds,
                      winPercentage: toPercentString(homeTeamWinPercentage1),
                      stake: toMoneyString(stakeHomeTeam),
                      win: toMoneyString(winHomeTeam1),
                      return: toMoneyString(returnHomeTeam1),
                      profit: toMoneyString(profitHomeTeam1)
                    },
                      {
                        key: awayTeam + secondBookMaker + 1,
                        team: awayTeam,
                        odds: secondAwayTeamOdds,
                        winPercentage: toPercentString(awayTeamWinPercentage1),
                        stake: toMoneyString(stakeAwayTeam),
                        win: toMoneyString(winAwayTeam1),
                        return: toMoneyString(returnAwayTeam1),
                        profit: toMoneyString(profitAwayTeam1)
                      }
                    ]
                  }

                  arbedMatchData.opportunities.push(opportunity);
                }
              }
            }
          }
        }

      }

      if(arbedMatchData.opportunities.length > 0){


        arbedMatchData.opportunities = arbedMatchData.opportunities.sort((opp1, opp2) => {
          return opp1.profit - opp2.profit;
        }).reverse()

        arbedData.push(arbedMatchData);
      }
    }


    const x = arbedData.sort((match1, match2) => {
      return match1.opportunities[0].profit - match2.opportunities[0].profit
    }).reverse()

    return setMatchedData(x);
  }

  useEffect(() => {
    getHeadToHeadMatchData(data)
  }, [betAmount, showOnlyProfitable]);

  useEffect(() => {
    getHeadToHeadMatchData(data)
  }, []);

  console.log(matchedData)

  return (
    <div className="App">

      <div className={"App-body"}>

        <Button variant="text" onClick={() => setShowOnlyProfitable((prevState) => !prevState)}>{showOnlyProfitable ? 'Hide' : 'Show'} only profitable</Button>

        {matchedData.map((match) => {
          return (
            <div>
              <div>
                <h4>{match.sport}</h4>
                <p>{match.matchTitle}</p>
              </div>

              <div>
                <h6>Opportunities</h6>

                {match.opportunities.map((opportunity) => {
                  return (
                    <div>
                      <div>
                        <p>
                          <bold>{opportunity.title}</bold>
                        </p>
                        <p>Profit: {opportunity.profit}</p>
                        <p>Percent: {opportunity.percent}</p>
                      </div>

                      <div>
                        <p><bold>Bets</bold></p>
                        <BetTable rows={opportunity.bets}/>
                      </div>


                    </div>
                  )
                })}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
