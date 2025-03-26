import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './test'
import {createBrowserRouter, Outlet, RouterProvider, useNavigate} from "react-router-dom"
import Home from "./Home"
import Mario from './mario'
import Game from './game'
import Wally from './wally'
import Board from './leaderboard'
// function App() {

//   return <div className="content">
//               <Home />
//         </div>
    
// }



function RootLayout() {
  const [cookie, setCookie] = useState(true)

  return <div>
          {cookie==true&&<div className='openMessage'><h3>!! This Game only works on Pc !!</h3><button onClick={()=>setCookie(false)}>X</button></div>}
          <Outlet/>
      </div>
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
  {
    path: "/mario",
    element: <Mario />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/wally",
    element: <Wally />,
  },
  {
    path: "/board",
    element: <Board />,
  },
    ] 
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
