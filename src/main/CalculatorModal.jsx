import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Modal, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import BetTable from "./BetTable.jsx";
import {calculateOpportunity} from "./functions.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import moment from "moment-timezone";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CalculatorModal = ({opp, matchStartTime}) => {

  const [open, setOpen] = useState(false);

  const [betAmount, setBetAmount] = useLocalStorage('betAmount', 200);
  const [showOnlyProfitable, setShowOnlyProfitable] = useLocalStorage('showOnlyProfitable', true);

  const [opportunity, setOpportunity] = useState(opp);
  const [invalidOpp, setInvalidOpp] = useState(false);

  const [firstBetOdds, setFirstBetOdds] = useState(opp.bets[0].odds);
  const [secondBetOdds, setSecondBetOdds] = useState(opp.bets[1].odds);

  useEffect(() => {
    if(!isNaN(firstBetOdds) && !isNaN(secondBetOdds) && !isNaN(betAmount)){

      const newOpp = calculateOpportunity(
        firstBetOdds,
        secondBetOdds,
        betAmount,
        false,
        opportunity.bets[0].team,
        opportunity.bets[1].team,
        opportunity.bets[0].betCompany,
        opportunity.bets[1].betCompany,
      );

      if(newOpp){
        setOpportunity(newOpp)
      }

    }
  }, [firstBetOdds, secondBetOdds, betAmount]);

  return (
    <>
      <Button variant="text" onClick={() => setOpen((prevState) => !prevState)}>Open calculator</Button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display: 'flex'}}>
            <Button variant="text" onClick={() => setOpen((prevState) => !prevState)}>Close</Button>
          </div>
          <h1>Calculator</h1>

          <div>
            <TextField
              required
              id={'betamount'}
              label={`Bet amount:`}
              defaultValue={betAmount}
              onChange={(event) => {
                setBetAmount(event.target.value)
              }}
            />
          </div>

          <div>
            <p>{opportunity.title}</p>
            <p>{moment(matchStartTime).tz('Australia/Sydney').format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p>{opportunity.percent}</p>
            <p>{opportunity.profit}</p>
          </div>

          <div>
            {opportunity.bets[0] &&
              <div style={{padding: '8px'}}>
                <TextField
                  required
                  id={opportunity.bets[0].key}
                  label={`${opportunity.bets[0].betCompany} odds:`}
                  defaultValue={firstBetOdds}
                  onChange={(event) => {
                    setFirstBetOdds(event.target.value)
                  }}
                />
              </div>
            }

            {opportunity.bets[1] &&
              <div style={{padding: '8px'}}>
                <TextField
                  required
                  id={opportunity.bets[1].key}
                  label={`${opportunity.bets[1].betCompany} odds:`}
                  defaultValue={secondBetOdds}
                  onChange={(event) => {
                    setSecondBetOdds(event.target.value)
                  }}
                />
              </div>
            }


          </div>

          <BetTable rows={opportunity.bets}/>
        </Box>

      </Modal>
    </>

  )
}

export default CalculatorModal;