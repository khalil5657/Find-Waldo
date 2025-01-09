import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './test'
import {useNavigate} from "react-router-dom"
import Home from "./Home"
function App() {

  return <div className="content">
              <Home />
        </div>
    
}

export default App
