import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import './index.css'
import Home from "./main/Home.jsx";
import Calculator from "./main/Calculator.jsx";
import Sport from "./main/Sport.jsx";
import LandingPage from "./main/LandingPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Switch>
        <Route component={LandingPage} exact path="/" />

        <Route component={Home} exact path="/home" />

        <Route component={Calculator} exact path="/calculator" />

        <Route component={Sport} exact path="/sport/:sportId" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
)
