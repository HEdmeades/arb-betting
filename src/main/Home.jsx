import {useState} from "react";
import {Button} from "@mui/material";
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
      <Button variant="text" onClick={() => setShowOnlyProfitable((prevState) => !prevState)}>{showOnlyProfitable ? 'Hide' : 'Show'} only profitable</Button>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>

        {sports.map((sport) => {
          return (
            <SportCard sportId={sport.key} betAmount={betAmount} showOnlyProfitable={showOnlyProfitable}/>
          )
        })}

      </div>
    </>
  )
}

export default Home