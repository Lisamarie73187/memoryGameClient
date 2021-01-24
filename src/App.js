import React, {useState, useEffect, useRef} from 'react'
import './App.css';
import SignIn from "./components/SignIn";
import Game from './components/Game';
import io from "socket.io-client/build/index";


function App() {
    const [userName, setUserName] = useState('');
    const [userList, setUserList] = useState([]);
    const [everyoneReady, setEveryoneReady] = useState(false);
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
            const test = userList.every(e => e.ready === true)
            setEveryoneReady(test)
        }
    },[userList]);


    const join = (name) => {
        setUserName(name);
        socket.current.emit('join', name)
    };

    const playerIsReady = () => {
        socket.current.emit('ready', true)
    };

    console.log(everyoneReady)

  return (
    <div className="App">
        <h1>Memory Game</h1>
        {!userName && (
            <SignIn getUserName={join} />
        )}
        {userName &&

        <div>
            {userList.map((e,i) => {
                return (
                    <div>
                        {e.name}
                        <div onClick={playerIsReady}>{!!e.ready ? 'ready' : 'ready?'}</div>
                    </div>
                )
            })}
        </div>
        }
        {everyoneReady &&
        <div>Lets Play</div>
        }
        {/*<Game*/}
            {/*options={options}*/}
            {/*userName={userName}*/}
        {/*/>*/}
    </div>
  );
}

export default App;
