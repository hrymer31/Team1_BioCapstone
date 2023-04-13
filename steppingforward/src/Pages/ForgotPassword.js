import React from 'react'


import { useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { FormControl, Container, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const { forgotPassword, isVerified, newPassword} = UserAuth();
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")

    //navigates user to home screen
    const [goToHome, setgoToHome] = React.useState(false);
    if (goToHome) {
        navigate('/home')
    };

    //navigates user to login screen
    const [goToLogin, setgoToLogin] = React.useState(false);
    if (goToLogin) {
        navigate('/login')
    };

    //this calls forgot password function from authcontext
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setError("")
        if (username === "") {
            alert("Username can't be empty");
        } else if (email === "") {
            alert("Email can't be empty");
        }
        try {
            forgotPassword(email,username)
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }
   
    const handleNewPassword = (e) => {
        e.preventDefault();
        setError("")
        try {
            newPassword(email, username, password)
           
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    }
    
    return(
        <div className="forgotpassword">
           
            <Container className="form" style={{ width: 600, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div id='formHeader'>
                    <h1>Forgot Password</h1>
                    <p>Please fill in this form to change your password.</p>
                </div>
                {!isVerified &&
                    <FormControl id="formcontrol" style={{marginTop: 10}}>
                        <div id='emailuser' style={{ marginBottom: 10}}>
                            <TextField
                                id="outlined-password-input email"
                                label="Email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: 230, marginRight: 20 }}
                            />
                            <TextField
                                id="outlined-password-input Username"
                                label="Username"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                style={{  }}
                            />
                        </div>
                        
                        <div>
                            <Button
                                variant='outlined'
                                size='large'
                                type='submit'
                                style={{ width: 225, marginRight: 20}}
                                startIcon={<DoneIcon />}
                                className='submit'
                                onClick={handleForgotPassword}
                                sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant='outlined'
                                size='large'
                                style={{ width: 225 }}
                                startIcon={<ClearIcon />}
                                className='cancel'
                                onClick={() => { setgoToHome(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </FormControl> 
                }
                { isVerified && 
                    <FormControl id="formcontrol" style={{ marginTop: 10 }}>
                        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                            <TextField
                                id="outlined-password-input password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                style={{ marginBottom: 10 }}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <TextField
                                id="outlined-password-input password"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                style={{ marginBottom: 10 }}
                                onChange={e => setPasswordAgain(e.target.value)}
                            />
                            
                        </div>
                        <div style={{display: 'flex',justifyContent: 'center'}}>
                            <Button
                                variant='outlined'
                                size='large'
                                type='submit'
                                style={{ width: 225, marginRight: 20 }}
                                startIcon={<DoneIcon />}
                                className='submit'
                                onClick={handleNewPassword}
                                sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant='outlined'
                                size='large'
                                style={{ width: 225 }}
                                startIcon={<ClearIcon />}
                                className='cancel'
                                onClick={() => { setgoToHome(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </FormControl>
                }

                
            </Container>
        </div>
       
    );
}

export default ForgotPassword;