import React,{useState, useEffect} from 'react'
import Card from './Card'




function Game({options, userName}) {
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
        for (let i = 0; i < options / 2; i++) {
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
