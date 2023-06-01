import * as React from 'react';

const BetTable = ({rows}) => {

  return (
    <div style={{ color: "black", width: '100%', textAlign: 'left' }}>
      <table>
        <thead>
        <tr>
          <th>Bet company</th>
          <th>Team name</th>
          <th>Odds</th>
          <th>Stake</th>
          <th>Win</th>
          <th>Return</th>
          <th>Profit</th>
          <th>Draw</th>
          <th>Draw return</th>
          <th>Draw profit</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row) => {
          return (
            <tr>
              <td>{row.betCompany}</td>
              <td>{row.team}</td>
              <td>{row.odds}</td>
              <td>{row.stake}</td>
              <td>{row.win}</td>
              <td>{row.return}</td>
              <td>{row.profit}</td>
              <td>{row.drawHR}</td>
              <td>{row.drawReturnHR}</td>
              <td>{row.profitDrawHR}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default BetTable;