import React, {useEffect, useState} from 'react'
import checkMark from '../assets/checkmark.png'



function Lobby({userList, playerIsReady, everyoneIsReady, goToGame}) {
    const [showPlayButton, setShowPlayButton]= useState(false)

    useEffect(() => {
        if(userList.length > 0){
            const everyoneIsReady = userList.every(e => {
                return e.ready
            });
            setShowPlayButton(everyoneIsReady)
        }
    },[userList]);

    return (
        <>
            <div>
                {userList.map((e,i) => {
                    return (
                        <div className="playerNameWrapper">
                            <div className="playerName">
                                <div>{e.name}</div>
                                <div onClick={playerIsReady}>
                                    {!!e.ready ? <img src={checkMark} alt="checkmark" height={30} width={30}/>  : <div className="ready">ready?</div>}
                                </div>
                            </div>

                        </div>
                    )
                })}
                {showPlayButton &&
                <div className="button" onClick={goToGame}>Lets Play</div>
                }
            </div>
        </>
    );
}

export default Lobby;
