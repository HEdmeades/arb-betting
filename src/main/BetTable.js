import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'key', headerName: 'key', width: 0},
  { field: 'team', headerName: 'Team name', width: 300},
  { field: 'odds', headerName: 'Odds', width: 150},
  { field: 'stake', headerName: 'Stake', width: 150},
  { field: 'win', headerName: 'Win', width: 150},
  { field: 'return', headerName: 'Return', width: 150},
  { field: 'profit', headerName: 'Profit', width: 150},
];

const BetTable = ({rows}) => {

  return (
    <div style={{ color: "white", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.key}
      />
    </div>
  )
}

export default BetTable;