import * as React from 'react';
import {useEffect, useState} from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";
import moment from "moment";
import {getSportOdds} from "../resource/api.js";
import {getHeadToHeadMatchData} from "./functions.js";
import BetTable from "./BetTable.jsx";
import Card from '@mui/material/Card';
import {CardActions, CardContent, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import Header from "./Header.jsx";
import CalculatorModal from "./CalculatorModal.jsx";

const Sport = ({}) => {

  let {sportId} = useParams();

  const [betAmount, setBetAmount] = useLocalStorage('betAmount', 200);
  const [showOnlyProfitable, setShowOnlyProfitable] = useLocalStorage('showOnlyProfitable', true);

  const [data, setData] = useLocalStorage(sportId + moment().format('L'), null);
  const [matchedData, setMatchedData] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const res = await getSportOdds(sportId);
      console.log('bruh bruh', res)
      if (res) {
        setData(res.data);
      }
    }

    if (!data) {
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }

  }, [])

  console.log(data);
  console.log('matchedData', matchedData);

  useEffect(() => {
    setMatchedData(getHeadToHeadMatchData(data, betAmount, showOnlyProfitable))
  }, [betAmount, showOnlyProfitable]);

  useEffect(() => {
    setMatchedData(getHeadToHeadMatchData(data, betAmount, showOnlyProfitable))
  }, []);

  const getNumberOfOppurtunities = () => {
    let opps = 0;
    for (const match of matchedData) {
      opps += match.opportunities.length;
    }

    return opps;
  }

  const getTop5Opps = () => {
    const top5 = []
    for (const match of matchedData) {
      for (const opportunity of match.opportunities) {
        if (top5.length < 5) {
          top5.push(opportunity.profit)
        } else {

        }

        top5.sort().reverse();
      }
    }

    return top5;
  }

  if (!showOnlyProfitable || matchedData.length > 0) {
    return (
      <>
        <Header />
        <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>

          {matchedData.map((match) => {
            return (
              <div style={{flex: 1, padding: '16px'}}>
                <div>
                  <h4>{match.sport}</h4>
                  <p>{match.matchTitle}</p>
                  <p>{moment(match.startTime).tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>

                <div>
                  <h6>Opportunities</h6>

                  {match.opportunities.map((opportunity) => {
                    return (
                      <Card sx={{minWidth: 275, margin: '16px'}}>
                        <div>
                          <p>
                            <bold>{opportunity.title}</bold>
                          </p>
                          <p>Profit: {opportunity.profit}</p>
                          <p>Percent: {opportunity.percent}</p>
                        </div>

                        <div>
                          <p>
                            <bold>Bets</bold>
                          </p>
                          <BetTable rows={opportunity.bets}/>
                          <CalculatorModal opp={opportunity} matchStartTime={match.startTime}/>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </>

    )
  }
  return null;
}

export default Sport;