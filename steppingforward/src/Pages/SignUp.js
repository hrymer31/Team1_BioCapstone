import React , {useEffect, useState} from "react";
import Select from 'react-select';
import { UserAuth } from './AuthContext'
import { useNavigate } from "react-router-dom";
import { FormControl, Container, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import 'simplebar-react/dist/simplebar.min.css';

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

    const [name, setName] = useState("")
    const [UserId, setUserId] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [alreadySignedUp, setAlreadySignedUp] = useState(false);


    const { createUser } = UserAuth();

    const userInfo = {
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
    <div className="SignUp">
        <h1>Sign Up</h1>
        <Container className="form" style={{width: 800}}>
            <div id='formHeader'></div>
            <FormControl id="formcontrol" onSubmit={handleSumbit}>
                <div id="personalInfo">
                    <TextField
                        id="outlined-password-input Name"
                        label="Name"
                        type="text"
                        style={{ marginRight: 10,}}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-password-input Email"
                        label="Email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div>
                <div id="passwords">
                    <TextField
                        id="outlined-password-input password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        style={{marginRight: 10}}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        id="outlined-password-input password"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        style={{ marginRight: 10 }}
                        onChange={e => setPasswordAgain(e.target.value)}
                    />
                    <div id="password-requirements">
                        <h4>Password Requirements:</h4>
                        <ul>
                            <li style={{ textDecoration: passwordStrength >= 1 ? 'line-through' : 'none' }}>At least one uppercase letter</li>
                            <li style={{ textDecoration: passwordStrength >= 2 ? 'line-through' : 'none' }}>Must be at least 6 characters</li>

                        </ul>
                    </div>
                </div>
                    
                    
                    <div id="buttons" style={{ marginTop: -10 }} >
                            <Button
                                variant='outlined'
                                size='large'
                                type='submit'
                                style={{width: 225, marginRight: 10}}
                                startIcon={<DoneIcon />}
                                className='submit'
                                onClick={() => { setgoToLogin(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(161, 252, 134,0.2)' } }}
                            >
                                Sumbit Request
                            </Button>
                            <Button
                                variant='outlined'
                                size='large'
                                style={{ width: 225, hover: {backgroundColor: 'red'} }} 
                                startIcon={<ClearIcon />}
                                className='cancel'
                                onClick={() => { setgoToLogin(true) }}
                                sx={{ ':hover': { bgcolor: 'rgb(252, 83, 83,0.2)' } }}
                            >
                                Cancel
                            </Button>
                    </div>
                </FormControl>
            </Container>
            
            
          
        </div>
    );
}

export default SignUp;

