import React, {useState, useEffect, useRef} from 'react'
import './App.css';
import SignIn from "./components/SignIn";
import Game from './components/Game';
import io from "socket.io-client/build/index";
import Lobby from "./components/Lobby";

const screenStrings = {
    lobby: 'lobby',
    signIn: 'signIn',
    game: 'game'
}


function App() {
    const [userList, setUserList] = useState([]);
    const [everyoneReady, setEveryoneReady] = useState(false);
    const [screen, setScreen] = useState(screenStrings.signIn)
    const socket = useRef(null);

    const options = 26;

    useEffect(() => {
        socket.current = io.connect("http://localhost:8080", {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });
        socket.current.on('users', (users) => {
            setUserList(users)
        })
    },[]);

    useEffect(() => {
        if(userList.length > 0){
            const isEveryoneReady = userList.every(e => e.ready === true);
            setEveryoneReady(isEveryoneReady)
        }
    },[userList]);


    const join = (name) => {
        setScreen(screenStrings.lobby);
        socket.current.emit('join', name)
    };

    const playerIsReady = () => {
        socket.current.emit('ready', true)
    };

    const goToGame = () => {
        setScreen(screenStrings.game)
    }


  return (
    <div className="App">
        <div className="title">Memory Game</div>
        {screen === screenStrings.signIn &&
            <SignIn join={join} />
        }
        {screen === screenStrings.lobby &&
            <Lobby
                userList={userList}
                playerIsReady={playerIsReady}
                everyoneIsReady={everyoneReady}
                goToGame={goToGame}
            />
        }
        {screen === screenStrings.game &&
            <Game
                options={options}
            />
        }
    </div>
  );
}

export default App;
