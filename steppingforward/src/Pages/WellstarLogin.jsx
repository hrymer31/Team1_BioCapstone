import React, {useState} from 'react';
import logo from '../images/wellstar-logo.png';
import '../Css/WellstarLogin.css';

function WellstarLogin (){
    const [username,   setUsername] = useState(null);
    const [password,   setPassword] = useState(null);
    
    function handleLogin() {
        alert('Login Successful');
        window.location.reload();
    }

    return (
        <div className='WellstarLogin'>
            <div className='title'>
            <h1>Wellstar Login</h1>
            </div>

            <div className='WellstarLogo'>
            <img src={logo} alt="Logo" />
            </div>

            <div className='username'>
            <label>
            Username
            <input type="text" onChange={username => setUsername(username)} />
            </label>
            </div>

            <div className='password'>
            <label>
            Password
            <input type="text" onChange={password => setPassword(password)} />
            </label>
            </div>

            <div className='signIn'>
            <button onClick={handleLogin}>Sign in</button>
            </div>

        </div>
    );
}

export default WellstarLogin;