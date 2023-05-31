import * as React from 'react';
import {useEffect} from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";
import moment from "moment";
import {getSportOdds} from "../resource/api.js";
import {getHeadToHeadMatchData} from "./functions.js";
import data from "../data.json";
import {useState} from "react";
import BetTable from "./BetTable.jsx";
import Card from '@mui/material/Card';
import {CardActions, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const SportCard = ({sportId, betAmount, showOnlyProfitable}) => {

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
      <div style={{flex: 1}}>
        <Card sx={{minWidth: 275, backgroundColor: matchedData.length > 0 ? '#d5e8cd' : '#ffb7b7'}}>
          <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
              {sportId}
            </Typography>
            {matchedData.length > 0 &&
              <Typography variant="h5" component="div">
                {matchedData[0].sport}
              </Typography>
            }
            {matchedData.length > 0 &&
              <Typography variant="body2">
              Earliest match start time: <p><bold>{moment(matchedData.sort((match1, match2) => {
                if(moment(match1.startTime).isBefore(match2.startTime)){
                  return 1;
                }
                return -1
              }).reverse()[0].startTime).tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a')}</bold></p>
            </Typography>
            }
            <Typography variant="body2">
              Matches: {matchedData.length}
            </Typography>
            <Typography variant="body2">
              Opportunities: {getNumberOfOppurtunities()}
            </Typography>
            <Typography variant="body2">
              Top 5: {getTop5Opps().join(', ')}
            </Typography>
            <CardActions>
              <Link to={`/sport/${sportId}`}>Open</Link>
            </CardActions>
          </CardContent>
        </Card>

      </div>
    )
  }
  return null;
}

export default SportCard;