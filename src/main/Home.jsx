import {useState} from "react";
import {Button, TextField} from "@mui/material";
import sports from "../static/sports.json";
import SportCard from "./SportCard.jsx";
import Header from "./Header.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";

function Home() {

  const [betAmount, setBetAmount] = useLocalStorage('betAmount', 200);
  const [showOnlyProfitable, setShowOnlyProfitable] = useLocalStorage('showOnlyProfitable', true);

  return (
    <>
      <Header />
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
      <Button variant="text" onClick={() => setShowOnlyProfitable((prevState) => !prevState)}>{showOnlyProfitable ? 'Show all' : 'Show only profitable'}</Button>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>

        {sports.map((sport, index) => {
          return (
            <SportCard waitTime={index / 10} sportId={sport.key} betAmount={betAmount} showOnlyProfitable={showOnlyProfitable}/>
          )
        })}

      </div>
    </>
  )
}

export default Home