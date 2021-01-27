import React,{useState, useEffect, useMemo} from 'react'
import Card from './Card'
import WhoseTurnModal from './WhoseTurnModal'

let indexes = 1;
let points = 0

function Game({options, socket, userList}) {
    const [game, setGame] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [itsAMatch, setItsAMatch] = useState(false);
    const [playerIndex, setPlayerIndex] = useState(0)

    const user = useMemo(() => {
        const turnArr = userList.filter(e => e.turn === true)
        if(turnArr.length > 0){
            return turnArr[0]
        }
    },[userList]);

    useEffect(() => {
        socket.emit('newGame', options);
        socket.on('newGame', (shuffledGame) => {
            setGame(shuffledGame)
        });
        setShowModal(true)
    }, []);

    useEffect(() => {
        if(flippedCount === 2 && userList.length > 1 && !itsAMatch) {
            let indexOfUser = indexes++;
            if(indexOfUser >= userList.length - 1){
                indexes = 0
            }
            socket.emit('nextPlayer', indexOfUser);
            setShowModal(true)
        }
    },[flippedCount, itsAMatch]);



    if (flippedIndexes.length === 2) {
        const match = game[flippedIndexes[0]].pictureId === game[flippedIndexes[1]].pictureId;

        if (match) {
            const newGame = [...game];
            newGame[flippedIndexes[0]].flipped = true;
            newGame[flippedIndexes[1]].flipped = true;
            newGame[flippedIndexes[0]].user = user;
            newGame[flippedIndexes[1]].user = user;
            setGame(newGame);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(false);
            setFlippedIndexes(newIndexes);
            console.log(game)
            setItsAMatch(true)

        } else {
            const newIndexes = [...flippedIndexes];
            newIndexes.push(true);
            setFlippedIndexes(newIndexes)
        }
    }


    if (game.length === 0) return <div>loading...</div>;
    else {
        return (
            <div>
                {userList.length > 1 &&
                    <div className="usersWrapper">
                        {userList.map(user => {
                            return (
                                <div
                                    className={user.turn ? 'userTurn user' : 'user'}
                                    style={{borderLeft: `10px solid ${user.color}`}}
                                >
                                    {user.name}: {user.points}
                                </div>
                            )
                        })}
                    </div>
                }
                <div id="cards">
                    {game.map((card, index) => (
                        <div className="card" key={index}>
                            <Card
                                id={index}
                                picture={card.picture}
                                user={card.user}
                                game={game}
                                flippedCount={flippedCount}
                                setFlippedCount={setFlippedCount}
                                flippedIndexes={flippedIndexes}
                                setFlippedIndexes={setFlippedIndexes}
                                socket={socket}
                            />
                        </div>
                    ))}
                </div>
                {showModal &&
                <WhoseTurnModal userList={userList} setShowModal={setShowModal} color={user.color}>
                    <div className="modalText">
                        It's
                        <div style={{
                            fontSize: '40px',
                            color: `${user.color}`
                        }}>
                            {user.name}
                        </div>
                        Turn
                    </div>
                </WhoseTurnModal>
                }
                {showMatchModal &&
                <WhoseTurnModal userList={userList} setShowModal={setShowMatchModal} >
                    <div className="modalText">
                        It's a Match Congrats
                        {/*<div className="modalName">*/}
                            {/*{name}*/}
                        {/*</div>*/}
                    </div>
                </WhoseTurnModal>
                }
            </div>
        )
}
}

export default Game;
