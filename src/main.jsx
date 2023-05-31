import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from "./main/Home.jsx";
import Calculator from "./main/Calculator.jsx";
import Sport from "./main/Sport.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/arb-betting",
    element: <Home />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
  {
    path: "/sport/:sportId",
    element: <Sport />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
