import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import './index.css'
import Home from "./main/Home.jsx";
import Calculator from "./main/Calculator.jsx";
import Sport from "./main/Sport.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Switch>
        <Route component={Home} exact path="/" />

        <Route component={Home} exact path="/arb-betting" />

        <Route component={Calculator} exact path="/calculator" />

        <Route component={Sport} exact path="/sport/:sportId" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
)
