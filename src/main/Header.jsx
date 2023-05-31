import {useState} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

function Header() {

  return (
    <div style={{padding: '16px', borderBottom: '1px solid', width: '100%', marginBottom: '16px'}}>
      <h2>Shotgun Bros Pty Ltd</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link to="/">Home</Link>
        <Link to="/calculator">Calculator</Link>
      </div>
    </div>
  )
}

export default Header