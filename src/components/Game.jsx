import React,{useState, useEffect} from 'react'
import Card from './Card'
import WhoseTurnModal from './WhoseTurnModal'

let indexes = 1;


function Game({options, socket, userList}) {
    const [game, setGame] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        socket.current.emit('newGame', options);
        socket.current.on('newGame', (shuffledGame) => {
            setGame(shuffledGame)
        })
    }, []);

    if (flippedIndexes.length === 2) {
        const match = game[flippedIndexes[0]].pictureId === game[flippedIndexes[1]].pictureId;

        if (match) {
            const newGame = [...game];
            newGame[flippedIndexes[0]].flipped = true;
            newGame[flippedIndexes[1]].flipped = true;
            setGame(newGame);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(false);
            setFlippedIndexes(newIndexes)
        } else {
            const newIndexes = [...flippedIndexes];
            newIndexes.push(true);
            setFlippedIndexes(newIndexes)
        }
    }

    useEffect(() => {

        if(flippedCount === 2 && userList.length > 1) {
            let newIndex = indexes++;
            if(newIndex >= userList.length - 1){
                indexes = 0
            }
            socket.current.emit('nextPlayer', newIndex)
            setShowModal(true)
        }
    },[flippedCount]);

    if (game.length === 0) return <div>loading...</div>;
    else {
        return (
            <div>
                {userList.length > 1 &&
                    <div className="usersWrapper">
                        {userList.map(user => {
                            return (
                                <div className={user.turn ? 'userTurn' : 'user'}>{user.name}</div>
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
                    <WhoseTurnModal userList={userList} setShowModal={() => setShowModal(false)}/>
                }
            </div>
        )
}
}

export default Game;
