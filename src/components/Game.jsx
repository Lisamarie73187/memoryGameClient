import React,{useState, useEffect} from 'react'
import Card from './Card'




function Game({options, socket}) {
    const [game, setGame] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);


    useEffect(() => {
        socket.current.emit('newGame', options);
        socket.current.on('newGame', (shuffledGame) => {
            setGame(shuffledGame)
        })
    }, []);


    if (flippedIndexes.length === 2) {
        const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

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

    if (game.length === 0) return <div>loading...</div>;
    else {
        return (
            <div id="cards">
                {game.map((card, index) => (
                    <div className="card" key={index}>
                        <Card
                            id={index}
                            color={card.color}
                            game={game}
                            flippedCount={flippedCount}
                            setFlippedCount={setFlippedCount}
                            flippedIndexes={flippedIndexes}
                            setFlippedIndexes={setFlippedIndexes}
                        />
                    </div>
                ))}
            </div>
        )
}
}

export default Game;
