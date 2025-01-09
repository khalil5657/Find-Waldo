import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Wally(){
    
    const [tableX, setTableX]= useState('')
    const [tableY, setTableY] = useState("")
    const [clickedX, setClickedX] = useState('')
    const [clickedY, setClickedY] = useState("")
    const [correctList, setCorrectList] = useState([])
    const [wallyClass, setWallyClass] = useState("normal")
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
        Waldo:[
            <h1>Waldo</h1>,
            <img src="/waldo.png"/>
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
        
            if (clickedX>=824&&clickedX<=846&&clickedY>=394&&clickedY<=437){
                console.log("won")
                newOne = tableList
                delete newOne[name]
                setTableList(newOne)
                answer("correct")
                setWallyClass("answered")

            }else{
                console.log("lost")
                answer("uncorrect")

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
            const raw = await fetch("http://localhost:8000/record", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
            { username:username, 
                time:seconds, game:"wally" }
            )
    })
    return navigate("/board", {state:{game:"wally"}})
    }
    return <div className="content">
        <nav>
            <Link to="/">Waldo Hunt</Link>
            <div style={{width:'120px'}}>Time: {time}</div>
            <div className='navItems'>
                <div className={wallyClass} style={{flex:'1', display:'grid', gridTemplateColumns:'30px 1fr', cursor:'pointer', padding:'8px'}}>
                  <img src="/waldo.png"/>
                  <div>Waldo</div>
                </div>
            </div>
        </nav>
        <div className="game" >
            <img src="/wally.jpg" alt="" onClick={(e)=>checkIt(e)} style={{width:'100%'}}/>
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

export default Wally