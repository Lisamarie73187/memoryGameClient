import React,{useState} from 'react'



function SignIn(props) {
    const [userName, setUserName] = useState('');

    const submitUserName = () => {
        props.getUserName(userName)
    };

    return (
        <div className="signIn">
            <div className="textOne">Hello Welcome,</div>
            <div className="textOne">What is your name?</div>
                <input
                    placeholder='enter your name'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                />
               <div className="button" onClick={submitUserName}>
                    I'm Ready
               </div>
        </div>
    );
}

export default SignIn;
