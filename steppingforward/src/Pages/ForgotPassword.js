import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { FormControl } from "@mui/material";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import HomeHeader from './HomeHeader';
import '../Css/Auth.css'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const { forgotPassword, isVerified, newPassword } = UserAuth();
    const [password, setPassword] = React.useState("")
    const [passwordAgain, setPasswordAgain] = React.useState("")

    //navigates user to home screen
    const [goToHome, setgoToHome] = React.useState(false);
    if (goToHome) {
        navigate('/')
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
            forgotPassword(email, username)
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

    return (
        <div className="Auth">

            <HomeHeader />

            <Box marginTop={10} marginBottom={10}
                className='authBox'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 500,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <h5 className='authTitle'>Forgot Password</h5>
                <p>Please fill out this form to change your password:</p>

                {!isVerified &&
                    <FormControl sx={{ display: 'flex' }}>

                        <div className="authForm">

                            <div className="authInputSection">
                                <label htmlFor="Email">Email:</label>
                                <input
                                    id="outlined-password-input email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="authInputSection">
                                <label htmlFor="Username">Username:</label>
                                <input
                                    id="outlined-password-input Username"
                                    type="text"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>

                            <Box textAlign={'center'} marginTop={5}>

                                <Button
                                    variant='outlined'
                                    type='submit'
                                    startIcon={<DoneIcon />}
                                    onClick={handleForgotPassword}
                                    sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                                >
                                    Submit
                                </Button>

                            </Box>

                            <Box textAlign={'center'}>

                                <Button
                                    variant='outlined'
                                    startIcon={<ClearIcon />}
                                    onClick={() => { setgoToHome(true) }}
                                    sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                                >
                                    Cancel
                                </Button>

                            </Box>

                        </div>
                    </FormControl>
                }

                {isVerified &&
                    <FormControl sx={{ display: 'flex' }}>
                        <div className="authForm">
                            <div className = "authInputSection">
                            <label htmlFor = "Password">Password:</label>
                            <input
                                id="outlined-password-input password"
                                type="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            </div>
                            <div className = "authInputSection">
                            <input htmlFor = "Confirm password">Confirm password:</input>
                            <input
                                id="outlined-password-input password"
                                type="password"
                                autoComplete="current-password"
                                onChange={e => setPasswordAgain(e.target.value)}
                            />
                            </div>

                        </div>
                        
                        <Box textAlign={'center'} marginTop={5}>

                            <Button
                                variant='outlined'
                                type='submit'
                                startIcon={<DoneIcon />}
                                onClick={handleNewPassword}
                                sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                            >
                                Submit
                            </Button>

                        </Box>

                        <Box textAlign={'center'}>
                            
                            <Button
                                variant='outlined'
                                startIcon={<ClearIcon />}
                                onClick={() => { setgoToHome(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                            >
                                Cancel
                            </Button>

                        </Box>
                    </FormControl>
                }
            </Box>
        </div>

    );
}

export default ForgotPassword;
