import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

function Board(){
    const {state}= useLocation()
    const [loading, setLoading] = useState(true)
    const [darkRow, setDarkRow] = useState(true)
    const [lista, setLista] = useState("")
    useEffect(()=>{
        (
            async ()=>{
                const rawData = await fetch("http://localhost:8000/board/"+state.game, {
                    method:"GET",
                    headers: { 'Content-Type': 'application/json' },
                })
                let data = await rawData.json()
                data = data.data
                setLista(data)
                setLoading(false)
            }
        )()
    }, [])
    if (loading){
        return <h1>Loading...</h1>
    }
    function listIt(item,index){
        
        let min = Math.floor(item.time/60000)
        let sec = Math.floor(item.time/1000)%60
        let tenthOfSec = item.time%1000
        return <div className={index%2==0?"dark":"light"}>
                <b>{item.username}</b> time done at: <b>{min}:{sec}:{tenthOfSec}</b>
                <span style={{fontSize:'12px', color:'white'}}> {item.createdAt.split("T")[0]}</span>
            </div>
    }
    return <div className="board">
            <Link to="/">Waldo Hunt</Link>
            <h1 style={{color:"white"}}>{state.game} LeaderBoard</h1>
            <div className="boardlist">
                {lista?lista.map((item, index)=>listIt(item, index)):<h1>no items</h1>}
            </div>
        </div>
}

export default Board