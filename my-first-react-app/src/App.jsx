import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './test'
import {useNavigate} from "react-router-dom"
function App() {
//   const [content, setContent] = useState([<img onClick={(e)=>chnage(e)} className='test' src="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fbackground%2Fsuper-mario-bros.webp?alt=media&token=4e5d2551-7f70-4dad-a59b-b6bbdf40ecda" alt="" />])
//   const [y, setY] = useState(0)
//   const [x, setX] = useState(0)
  const [state, setState] = useState(false)

//   function getCor(e){
//       // Cache the client X/Y coordinates
//       setX(e.clientX)
//       setY(e.clientY)
//       // console.log(clientX, clientY)
//   }
//   function chnage(e){
//     console.log(content)
//     // setState('block')
//     console.log(e.clientX, e.clientY)
//     if (state == true){
//       setContent([
//         ...content,
//         <div style={{backgroundColor:'black',opacity:'0.6',border:'1px dotted white', height:'50px', width: '50px', position:'absolute', zIndex:'10', top:`${e.clientY-20}px`, left:`${e.clientX-20}px`}}>
          
//         </div>
//       ])
//       setState(false)
//     }else{
//       let lista = content
//       lista.splice(lista.length-1, 1)
//       console.log(lista)
//       setContent(lista)
//       setState(true)
//     }
    
    
//     // setCount(count+1)
//   }
//   return <div>
          
//           {content.map(item => {
//           return item
// })}
//         </div>
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [tableX, setTableX] = useState(0)
    const [tableY, setTableY] = useState(0)
    const [booClass, setBooClass] = useState("choice")
    const [marioClass, setMarioClass] = useState("choice")
    const [waluijiClass, setWaluijiClass] = useState("choice")
    const [booFound, setBooFound] = useState(false)
    const [marioFound, setMarioFound] = useState(false)
    const [waluijiFound, setWaluijiFound] = useState(false)
    const [theTime, setTime] = useState(0)
    const [running, setRunning] = useState(true)
    const [win, setWin] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [username, setUsername] = useState('')
    let timerId = useRef()

    useEffect(()=>{
        if (running){
            timerId.current = setInterval(() => {
            setSeconds(pre => pre +100)
        }, 100);
        }
        
        return () => clearInterval(timerId.current)
    }, [running])
          let fireMario ="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Ffire-mario.webp?alt=media&token=e048c6ab-a7d7-43af-b380-8b3d7c55822c"
      let luiji ="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Fwaluigi.webp?alt=media&token=ea196878-f730-43c7-834c-b8a63e52330e"
      let ghost = "https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fcharacters%2Fking-boo.webp?alt=media&token=8d8f1284-a0a0-4981-8cca-ee5dfe9206ca"

    const [choices, setChoices] = useState({
        mario: 
                [
                  <img src={fireMario} alt="" style={{width:'100%', height:'40px'}}/>,
                  <div>Fire Mario</div>
                ]
              ,
        boo:   
                [
                  <img src={ghost} alt="" style={{width:'100%', height:'40px'}}/>,
                  <div>King Boo</div>
                ]
              ,
        waluiji: 
                    [
                      <img src={luiji} alt="" style={{width:'100%', height:'40px'}}/>,
                      <div>Waluiji</div>
                    ]
                })

    
  
    let currentChoices = []
    // Object.keys(choi).length;
    for(let choice in choices){      
      currentChoices[currentChoices.length] = 
      <div  className="choice" style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}} onClick={()=>checkChoice(choice)} >
        {choices[choice]}
    </div>
    }
    function stop(){
        setRunning(false)
    }
    function change(e){
      let tableX = 0
      let tableY = 0
      tableX = e.pageX + 100
      tableY = e.pageY
      console.log(e.pageX, e.pageY)
      if (e.pageX > 1200){
        tableX = e.pageX -100
      }
      if (e.pageY < 180){
        if (e.pageX < 1200 && e.pageX > 100){
          tableX = e.pageX
        }
        tableY = e.pageY + 130
      }
      if (e.pageY > 1770){
        if (e.pageX < 1200  && e.pageX > 100){
          tableX = e.pageX
        }
        tableY = e.pageY - 130
      }
      setTableX(tableX)
      setTableY(tableY)
      if (state == false){
        setX(e.pageX)
        setY(e.pageY)
        
        setState(true)
        // let newOne = {}
        // for (let item in choices){
        //   newOne[item] = choices[item]
        // }
        // console.log(newOne)
        // setChoices(newOne)
      }else{
        setState(false)
      }
      // console.log(x, y)
  }
  function removeIt(key){
    let obj = choices
    delete obj[key]
    setChoices(obj)
    setState(false)
    if (key == 'boo'){
      setBooClass("choice line")
      setBooFound(true)
    }else if (key == 'mario'){
      setMarioClass("choice line")
      setMarioFound(true)
    }else if (key == 'waluiji'){
      setWaluijiClass("choice line")
      setWaluijiFound(true)
    }
    testa("correct")
    if (Object.keys(obj).length == 0){
      stop()
      setWin(true)
    }
  }
  async function checkChoice(name){

    if (name == 'mario'){
      const rawAnswer = await fetch(`http://localhost:8000/checkanswer/mario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(
          { x:x, 
            y:y }
        )
      }
      )
      let answer = await rawAnswer.json()
      if (answer.answer == 'correct'){
        removeIt("mario")
      }else{
        testa("uncorrect")
      }
    }

    if (name == 'boo'){
      const rawAnswer = await fetch(`http://localhost:8000/checkanswer/boo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(
          { x:x, 
            y:y }
        )
      }
      )
      let answer = await rawAnswer.json()
      if (answer.answer == 'correct'){
        removeIt("boo")
      }else{
        testa("uncorrect")
      }
    }
    if (name == 'waluiji'){
      const rawAnswer = await fetch(`http://localhost:8000/checkanswer/waluiji`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(
          { x:x, 
            y:y }
        )
      }
      )
      let answer = await rawAnswer.json()
      if (answer.answer == 'correct'){
        removeIt("waluiji")
      }else{
        testa("uncorrect")
      }
    }
    // mario
    // if (name == 'mario'){
    //   if (y >= 896 && y<=992 && x >=1122 && x<= 1175){
    //     removeIt("mario")
    //   }else if (x >= 1101 && x<= 1121 && y>= 953 && y <= 976){
    //     removeIt("mario")
    //   }else if (x >= 1176 && x <=1193 && y >= 939 && y <= 966){
    //     removeIt("mario")
    //   }else{
    //     testa('uncorrect')
    //   }
    // }
    // boo
    // if (name == 'boo'){
    //   // console.log(x, y)
    //   if (y >= 1072 && y <= 1098 ){
    //     if ( x >= 393 && x <=444){
    //         removeIt('boo')
    //     }
    //   }else if (y >= 1099&&y<= 1121){
    //     if (x >=372&&x <=448){
    //         removeIt('boo')
    //     }
    //   }else if (y >= 1122 && y <= 1155){
    //     if (x >=395 && x <= 454){
    //         removeIt('boo') 
    //     }
    //   }else if (y>= 1156 && y <= 1181){
    //       if (x >= 420 && x <= 441){
    //         removeIt('boo')
    //       }
    //   }else{
    //     testa("uncorrect")
    //   }
    // }
    // waluiji
    // if (name == 'waluiji'){
    //   if (y>= 1788 && y<=1950 && x>=902&& x<=1000){
    //     removeIt("waluiji")
    //   }else{
    //     testa("uncorrect")
    //   }
    // }
    
  }
  const navigate = useNavigate()
  const [test, setTest] = useState(false)
  function testa(state){
    // console.log(state)
    setTest(state)
    setState(false)
    setTimeout(() => {
      setTest(false)
    }, 3000);
  }


  let time = seconds
  if (seconds >= 1000){
    time = `${Math.floor(seconds/1000)}:${seconds%1000}`
  }
  if (seconds >= 60000){
        time = `${Math.floor(seconds/60000)}:${Math.floor(seconds/1000)%60}:${seconds%1000}`
    }
    // if (seconds > 3600){
    //     setSeconds(0)
    // }
    async function callIt(){
      alert(username)
      if (username ==''){
        return
      }
      const raw = await fetch("http://localhost:8000/record", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
          { username:username, 
            time:seconds }
        )
        
  })
  // const data = await raw.json()
  // alert(data.message)
  return navigate("/leaderboard")
    }
  function handleUsername(value){
    setUsername(value)
  }
  return <div className='content'>
          <nav>
            <div>Pixel hunt</div>
            <div style={{width:'120px'}}>Time: {time}</div>
            <div className='navItems'>
                <div className={marioClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}}>
                  <img src={fireMario} alt="" style={{width:'100%', height:'100%'}}/>
                  <div>Fire Mario</div>
                </div>
                <div className={booClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr',cursor:'pointer', padding:'8px'}}>
                  <img src={ghost} alt="" style={{width:'100%', height:'100%'}}/>
                  <div>King Boo</div>
                </div>
                <div className={waluijiClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}}>
                  <img src={luiji} alt="" style={{width:'100%', height:'100%'}}/>
                  <div>Waluiji</div>
                </div>
            </div>
          </nav>
          <div className='game'>
            {state == false?<div>
            <img onClick={(e)=>change(e)} className='test' src="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fbackground%2Fsuper-mario-bros.webp?alt=media&token=4e5d2551-7f70-4dad-a59b-b6bbdf40ecda" alt="" /></div>
              :<div className='parent'><img onClick={(e)=>change(e)} className='test' src="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fbackground%2Fsuper-mario-bros.webp?alt=media&token=4e5d2551-7f70-4dad-a59b-b6bbdf40ecda" alt="" /><div className='area' style={{backgroundColor:'black',opacity:'0.6',border:'1px dotted white', height:'50px', width: '50px', position:'absolute', zIndex:'10', top:`${y-20}px`, left:`${x-20}px`}}>
          
            </div>
              <div style={{  position:'absolute', zIndex:'10', left:`${tableX-60}px`, top:`${tableY - 80}px`, display:'flex', flexDirection:'column', backgroundColor:'white', borderRadius:'14px'}}>
                {/* height:'160px', width:'120px' */}
                {currentChoices}
              </div>
              </div>}
              {test =='correct'&&<div className='message correct'>You Got It Right!!</div>}
              {test =='uncorrect'&&<div className='message uncorrect'>Wrong Answer, Try again!</div>}
              {win == true&&
              <div className='win'>
              You got it in {time} <br />
              Submit Your score to The leaderBoard <br />
              <label htmlFor="">Username:</label>
              <input type="text"  onChange={(e)=>handleUsername(e.target.value)}/>
              <button onClick={callIt}>Submit</button>
              </div>}
              {booFound==true&&<img src="/images.png" alt="" style={{position:'absolute', left:'409px', top:'1111px', height:'22px'}}/>}
              {marioFound == true&&<img src="/images.png" alt="" style={{position:'absolute', left:'1144px', top:'933px', height:'22px'}}/>}
              {waluijiFound == true&&<img src="/images.png" alt="" style={{position:'absolute', left:'971px', top:'1910px', height:'22px'}}/>}
          </div>
          <footer>
            Powered By Khalil 
          </footer>
        </div>
    
}


export default App
