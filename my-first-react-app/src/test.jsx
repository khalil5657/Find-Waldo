import { useEffect, useRef, useState } from "react"

function Timer(props){
    const [seconds, setSeconds] = useState(0)

    let timerId = useRef()

    useEffect(()=>{
        if (props.running){
            timerId.current = setInterval(() => {
            setSeconds(pre => pre +1)
        }, 1000);
        }
        
        return () => clearInterval(timerId.current)
    }, [props.running])
  
    let time = seconds
    if (seconds > 60){
        time = `${Math.floor(seconds/60)}:${seconds%60}`
    }
    if (seconds > 3600){
        setSeconds(0)
    }
    
    return <div>
                {time}
                
            </div>
}

function LeaderBoard(){
    const [allData, setAllData] = useState('')
    useEffect(()=>{
        fetch("http://localhost:8000/board", {
            method:'GET',
            headers:{"Content-Type": "application/json"}
        }).then((res)=>res.json()).then((data)=>setAllData(data.data))
    }, [])
    function listIt(post){
        let min = Math.floor(post.time/60000)
        let sec = Math.floor(post.time/1000)%60
        let tenthOfSec = post.time%1000
        return <div>
                {post.username} time done at: {min}:{sec}:{tenthOfSec}
                <span style={{fontSize:'12px', color:'gray'}}> {post.createdAt.split("T")[0]}</span>
            </div>
    }
    if (!allData){
        return <h1>Loading...</h1>
    }
    return <div>
    {allData.map((post)=>listIt(post))}
    
    </div>
}


export default LeaderBoard