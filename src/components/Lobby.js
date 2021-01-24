import React from 'react'
import checkMark from '../assets/checkmark.png'



function Lobby({userList, playerIsReady, everyoneIsReady, goToGame}) {

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
            </div>
            {everyoneIsReady &&
                <div className="button" onClick={goToGame}>Lets Play</div>
            }
        </>
    );
}

export default Lobby;
