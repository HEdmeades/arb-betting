import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {Button, TextField} from "@mui/material";
import Header from "./Header.jsx";



const GameGraph = () => {
  const [winnings, setWinnings] = useState([]);
  const [turns, setTurns] = useState(100);
  const [chanceOfDraw, setChanceOfDraw] = useState(0.3);
  const [lossForDraw, setLossForDraw] = useState(50);
  const [profitForWin, setProfitForWin] = useState(30);

  useEffect(() => {
    const generatedWinnings = simulateGame(turns);
    setWinnings(generatedWinnings);
  }, []);

  const simulateGame = (turns) => {
    const generatedWinnings = [0];
    for (let i = 0; i < turns; i++) {
      const randomNum = Math.random();
      if (randomNum <= 1 - chanceOfDraw) {
        generatedWinnings.push(generatedWinnings[i] + profitForWin);
      } else {
        generatedWinnings.push(generatedWinnings[i] - lossForDraw);
      }
    }
    return generatedWinnings;
  };

  const data = {
    labels: Array.from({ length: winnings.length }, (_, i) => i),
    datasets: [
      {
        label: 'Winnings',
        data: winnings,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Turns',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Winnings ($)',
        },
      },
    },
  };

  return (
    <>
      <Header />
    <div style={{width: '50vw'}}>
      <div>
        <TextField
          required
          id={'turns'}
          label={`Bets:`}
          defaultValue={turns}
          onChange={(event) => {
            setTurns(Number(event.target.value))
          }}
        />

        <TextField
          required
          id={'percentForDraw'}
          label={`Chance of draw:`}
          defaultValue={chanceOfDraw}
          onChange={(event) => {
            setChanceOfDraw(Number(event.target.value))
          }}
        />

        <TextField
          required
          id={'lossForDraw'}
          label={`Loss of draw:`}
          defaultValue={lossForDraw}
          onChange={(event) => {
            setLossForDraw(event.target.value)
          }}
        />

        <TextField
          required
          id={'profitForWin'}
          label={`Profit for win:`}
          defaultValue={profitForWin}
          onChange={(event) => {
            setProfitForWin(Number(event.target.value))
          }}
        />
      </div>
      <Button variant="text" onClick={() => setWinnings(simulateGame(turns))}>Re-simulate</Button>
      <h2>Winnings over {turns} Turns</h2>
      <Line data={data} options={options} />
    </div>
    </>
  );
};

export default GameGraph;