import { Link } from "react-router-dom"



function Home(){
    return <div className="home">
                <div className="firstpart">
                    <h1>Welcome to waldo Hunt</h1>
                </div>
                <div className="secondpart">
                    <h4>Choose a Game</h4>
                        <div className="games">
                            <div className="aGame" >
                                <div>
                                    <img style={{width:"100%", height:"100%"}} src="https://firebasestorage.googleapis.com/v0/b/wheres-waldo-74fe1.appspot.com/o/game-2%2Fbackground%2Fsuper-mario-bros.webp?alt=media&amp;token=4e5d2551-7f70-4dad-a59b-b6bbdf40ecda" alt=""/>                                
                                </div>
                                <div>
                                    <h4>Mario</h4>
                                    <div className="buttons">
                                        <Link to="/mario" className="Link">Play</Link>
                                        <Link state={{game:"mario"}} to="/board" className="Link">Board</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="aGame">
                                <div>
                                    <img src="./public/game.jpg" style={{height:"100%", width:"100%"}}/>
                                </div>
                                <div>
                                    <h4>Games</h4>
                                    <div className="buttons">
                                        <Link to="/game" className="Link">Play</Link>
                                        <Link state={{game:"game"}} to="/board" className="Link">Board</Link>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="aGame">
                                <div>
                                    <img src="./public/wally.jpg" style={{height:"100%", width:"100%"}}/>
                                </div>
                                <div>
                                    <h4>Wally</h4>
                                    <div className="buttons">
                                      <Link to="/wally" className="Link">Wally</Link>
                                        <Link state={{game:"wally"}} to="/board" className="Link">Board</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>           
                
            </div>
}   

export default Home