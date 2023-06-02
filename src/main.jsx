import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import './index.css'
import Dashboard from "./main/Home.jsx";
import Calculator from "./main/Calculator.jsx";
import Sport from "./main/Sport.jsx";
import LandingPage from "./main/LandingPage.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import './App.css';
import Simulator from "./main/Simulator.jsx";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Switch>
          <Route component={LandingPage} exact path="/"/>

          <Route component={Dashboard} exact path="/dashboard"/>

          <Route component={Calculator} exact path="/calculator"/>

          <Route component={Sport} exact path="/sport/:sportId"/>

          <Route component={Simulator} exact path="/simulator"/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
