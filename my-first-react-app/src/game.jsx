import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Game(){

    const [tableX, setTableX]= useState('')
    const [tableY, setTableY] = useState("")
    const [clickedX, setClickedX] = useState('')
    const [clickedY, setClickedY] = useState("")
    const [correctList, setCorrectList] = useState([])
    const [brianClass, setBrianClass] = useState("normal")
    const [spikeClass, setSpikeClass] = useState("normal")
    const [ashClass, setAshClass] = useState("normal")
    const [correct, setCorrect] = useState(false)
    const [uncorrect, setUncorrect] = useState(false)
    const [running, setRunning] = useState(true)
    const [win, setWin] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    let timerId = useRef()

    useEffect(()=>{
        if (running){
            timerId.current = setInterval(() => {
            setSeconds(pre => pre +100)
        }, 100);
        }
        
        return () => clearInterval(timerId.current)
    }, [running])

    const [tableList, setTableList] = useState({
        brian:[
            <h1>Brian</h1>,
            <img src="./public/brian.png"/>
        ],
        spike:[
            <h1>Spike</h1>,
            <img src="./public/spike.png"/>
        ],
        ash: [
            <h1>Ash</h1>,
            <img src="./public/ash.png"/>
        ]
    })
    const [showTable, setSHowTable] = useState(false)
    let lista = []
    
    for (let key in tableList){
        // console.log(tableList[key])
        lista.push(<div key={key} onClick={()=>checkChoice(key)} className="choices"><div>{tableList[key][1]}{key}</div></div>)
    }

    function checkIt(e){
        if (showTable==true){
            setSHowTable(false)
            return
        }
        console.log(e.pageX, e.pageY)
        setClickedX(e.pageX)
        setClickedY(e.pageY)
        let x = e.pageX + 50
        let y = e.pageY - 50
        if (e.pageX >1170){
            x = e.pageX - 100
        }
        if (e.pageY < 155){
            y = e.pageY + 50
        }
        if (e.pageY > 3740){
            y = e.pageY - 100
        }
        setTableX(x)
        setTableY(y)
        setSHowTable(true)
    }
    function answer(a){
        if (a=="correct"){
            setCorrect(true)
            setTimeout(() => {
                setCorrect(false)
            }, 3000);
        }else{
            setUncorrect(true)
            setTimeout(() => {
                setUncorrect(false)
            }, 3000);
        }
        
    }
    function checkChoice(name){
        let newOne = ''
        if (name=="brian"){
            if (clickedX>=272&&clickedX<=300&&clickedY>=1395&&clickedY<=1411){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setBrianClass("answered")
            }else if (clickedX>=275&&clickedX<=290&&clickedY>=1412&&clickedY<=1418){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setBrianClass("answered")

            }else if (clickedX>=272&&clickedX<=295&&clickedY>=1419&&clickedY<=1433){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setBrianClass("answered")
            }else{
                console.log("lost")
                                answer("uncorrect")

            }
        }else if (name == "spike"){
            if (clickedX>=612&&clickedX<=12280&&clickedY>=1879&&clickedY<=1926){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setSpikeClass("answered")

            }else if (clickedX>=1199&&clickedX<=1226&&clickedY>=1927&&clickedY<=1952){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setSpikeClass("answered")

            }else if (clickedX>=1176&&clickedX<=1199&&clickedY>=1953&&clickedY<=2001){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setSpikeClass("answered")

            }else if (clickedX>=1213&&clickedX<=1253&&clickedY>=1953&&clickedY<=2001){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setSpikeClass("answered")

            }else{
                console.log("lost")
                answer("uncorrect")

            }
        }else{
            if (clickedX>=34&&clickedX<=60&&clickedY>=2690&&clickedY<=2742){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setAshClass("answered")

            }else if (clickedX>=61&&clickedX<=80&&clickedY>=2704&&clickedY<=2750){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setAshClass("answered")

            }else{
                console.log("lost")
                answer("uncorrect")
            }
        }
        setSHowTable(false)
        console.log(newOne)
        if (Object.keys(newOne).length === 0 && newOne.constructor === Object){
            setRunning(false)
            // alert("you won the game")
            setWin(true)
            
        }
    }
    let time = seconds
    if (seconds >= 1000){
    time = `${Math.floor(seconds/1000)}:${seconds%1000}`
    }
    if (seconds >= 60000){
        time = `${Math.floor(seconds/60000)}:${Math.floor(seconds/1000)%60}:${seconds%1000}`
    }
    function handleUsername(value){
        setUsername(value)
    }
    async function submitIt(){
            const raw = await fetch("https://find-waldo-backend.onrender.com/record", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
            { username:username, 
                time:seconds, game:"game" }
            )
            
    })
                return navigate("/board", {state:{game:"game"}})
    }
    return <div className="content">
        <nav>
            <Link to="/">Waldo Hunt</Link>
            <div style={{width:'120px'}}>Time: {time}</div>
            <div className='navItems'>
                <div className={brianClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}}>
                  {/* <img src={fireMario} alt="" style={{width:'100%', height:'100%'}}/> */}
                  <img src="./public/brian.png"/>
                  <div>Brian</div>
                </div>
                <div className={spikeClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr',cursor:'pointer', padding:'8px'}}>
                  {/* <img src={ghost} alt="" style={{width:'100%', height:'100%'}}/> */}
                  <img src="./public/spike.png"/>
                  <div>Spike</div>
                </div>
                <div className={ashClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}}>
                  <img src="./public/ash.png"/>
                  <div>Ash</div>
                </div>
            </div>
        </nav>
        <div className="game" >
            <img src="/game.jpg" alt="" onClick={(e)=>checkIt(e)}/>
            {showTable==true&&<div className="thetable" style={{left:tableX, top:tableY}}>{lista}</div>}
            {showTable==true&&<div className="area" style={{backgroundColor:"black",opacity:"0.6",position:"absolute", border:'1px dotted white', left:clickedX-25, top:clickedY-25, height:"50px", width:"50px"}}></div>}
            {correct==true&&<div className="message correct">That was correct!!</div>}
            {uncorrect==true&&<div className="message uncorrect">That was Uncorrect!!</div>}
            {win == true&&
              <div className='win'>
              You got it in {time} <br />
              Submit Your score to The leaderBoard <br />
              <label htmlFor="">Username:</label>
              <input type="text"  onChange={(e)=>handleUsername(e.target.value)}/>
              <button onClick={submitIt}>Submit</button>
              </div>}
        </div>
        <footer>
            Powered By Khalil 
          </footer>
    </div>
}

export default Game