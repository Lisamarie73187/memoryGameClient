import React, {useState} from 'react'
import './App.css';
import SignIn from "./components/SignIn";
import Game from './components/Game'

function App() {
    const [userName, setUserName] = useState('');
    const [highScore, setHighScore] = useState(0)

    const options = 26;



    const getUserName = (name) => {
        setUserName(name)
    };
  return (
    <div className="App">
        <h1>Memory Game</h1>
        {!userName ? (
            <SignIn getUserName={getUserName}/>
        ) : (
            <Game
                options={options}
                highScore={highScore}
                setHighScore={setHighScore}
            />
        )
        }
    </div>
  );
}

export default App;
