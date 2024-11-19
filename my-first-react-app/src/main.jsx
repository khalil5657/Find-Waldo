import { StrictMode } from 'react'
import  ReactDOM  from 'react-dom/client'
import App from './App.jsx'
import Appi from './test.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LeaderBoard from "./test.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App  />,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard />,
  },
  
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
// createRoot(document.getElementById('root')).render(
//     <App />
// )
