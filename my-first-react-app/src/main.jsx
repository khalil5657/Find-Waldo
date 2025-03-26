import { StrictMode } from 'react'
import  ReactDOM, { createRoot }  from 'react-dom/client'
import App from './App.jsx'
import Appi from './test.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LeaderBoard from "./test.jsx"
import Mario from './mario.jsx'
import Game from './game.jsx'
import Board from './leaderboard.jsx'
import Wally from './wally.jsx'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App  />,
//   },
//   {
//     path: "/mario",
//     element: <Mario />,
//   },
//   {
//     path: "/game",
//     element: <Game />,
//   },
//   {
//     path: "/wally",
//     element: <Wally />,
//   },
//   {
//     path: "/board",
//     element: <Board />,
//   },
  
// ])
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <RouterProvider router={router} />
// )

createRoot(document.getElementById('root')).render(
    <App />
)
