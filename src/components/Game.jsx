import React,{useState, useEffect} from 'react'
import Card from './Card'

function Game(props) {
    const [game, setGame] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0);
    const [flippedIndexes, setFlippedIndexes] = useState([]);

    const colors = [
        '#ecdb54',
        '#e34132',
        '#6ca0dc',
        '#944743',
        '#dbb2d1',
        '#ec9787',
        '#00a68c',
        '#645394',
        '#6c4f3d',
        '#ebe1df',
        '#bc6ca7',
        '#bfd833',
    ];

    useEffect(() => {
        const newGame = [];
        for (let i = 0; i < props.options / 2; i++) {
            const firstOption = {
                id: 2 * i,
                colorId: i,
                color: colors[i],
                flipped: false,
            };
            const secondOption = {
                id: 2 * i + 1,
                colorId: i,
                color: colors[i],
                flipped: false,
            };

            newGame.push(firstOption);
            newGame.push(secondOption);
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5);
        setGame(shuffledGame)
    }, []);

    useEffect(() => {
        // Loads when the game variable changes
    }, [game]);

    if (flippedIndexes.length === 2) {
        // Runs if two cards have been flipped
    }

    if (game.length === 0) return <div>loading...</div>
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
