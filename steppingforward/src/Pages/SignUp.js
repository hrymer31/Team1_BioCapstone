import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { UserAuth } from './AuthContext'
import { useNavigate } from "react-router-dom";
import { FormControl, Container, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import 'simplebar-react/dist/simplebar.min.css';
import HomeHeader from "./HomeHeader";

const SignUp = () => {
    const [passwordStrength, setPasswordStrength] = useState(0);
    const style = {
        width: 500,
    }

    const navigate = useNavigate();

    const [goToLogin, setgoToLogin] = useState(false);
    if (goToLogin) {
        navigate('/login')
    };

    const [AccessCode, setAccessCode] = ("")
    const [name, setName] = useState("")
    const [UserId, setUserId] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [alreadySignedUp, setAlreadySignedUp] = useState(false);

    const { createUser } = UserAuth();

    const userInfo = {
        accessCode: AccessCode,
        Name: name,
        email: Email,
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        setError("")
        if (passwordStrength < 2) {
            setError("Password does not meet requirements")
            return;
        }
        try {
            await createUser(Email, Password, userInfo);
            navigate('/home')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }




    useEffect(() => {
        const calculatePasswordStrength = () => {
            let strength = 0;
            if (Password.length >= 6) {
                strength += 1;
            }
            if (/[A-Z]/.test(Password)) {
                strength += 1;
            }
            setPasswordStrength(strength);
        }
        calculatePasswordStrength();
    }, [Password]);

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
                    height: 700,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <h5 className='authTitle'>Sign Up</h5>

                <FormControl onSubmit={handleSumbit} sx={{ display: 'flex' }}>

                    <div className="authForm">

                        <div className="authInputSection">
                            <label htmlFor = "Access code">Access code:</label>
                            <input
                                id="outlined-password-input Access"
                                type="text"
                                onChange={(e) => setAccessCode(e.target.value)}
                            />
                        </div>
                        <div className="authInputSection">
                            <label htmlFor = "Name">Name:</label>
                            <input
                                id="outlined-password-input Name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="authInputSection">
                            <label htmlFor = "Email">Email:</label>
                            <input
                                id="outlined-password-input Email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="authInputSection">
                            <label htmlFor = "Password">Password:</label>
                            <input
                                id="outlined-password-input password"
                                type="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="authInputSection">
                            <label htmlFor = "Confirm Password">Confirm password:</label>
                            <input
                                id="outlined-password-input password"
                                type="password"
                                autoComplete="current-password"
                                onChange={e => setPasswordAgain(e.target.value)}
                            />
                        </div>
                        <div className="authInputSection">
                            <h4>Password Requirements:</h4>
                            <ul>
                                <li style={{ textDecoration: passwordStrength >= 1 ? 'line-through' : 'none' }}>At least one uppercase letter</li>
                                <li style={{ textDecoration: passwordStrength >= 2 ? 'line-through' : 'none' }}>Must be at least 6 characters</li>

                            </ul>
                        </div>
                    </div>

                    <Box textAlign={'center'} marginTop={2}>
                        <Button
                            variant='outlined'
                            type='submit'
                            startIcon={<DoneIcon />}
                            onClick={() => { setgoToLogin(true) }}
                            sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                        >
                            Submit Request
                        </Button>
                    </Box>
                    <Box textAlign={'center'}>

                        <Button
                            variant='outlined'
                            startIcon={<ClearIcon />}
                            onClick={() => { setgoToLogin(true) }}
                            sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </div>
    );
}

export default SignUp;

