import React , {useEffect, useState} from "react";
//import PasswordChecklist from "react-password-checklist"
import Select from 'react-select';
import { UserAuth } from './AuthContext'
import { useNavigate } from "react-router-dom";
import { FormControl, Container, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import 'simplebar-react/dist/simplebar.min.css';

const SignUp = () => {
    const style = {
        width: 500,
    }
    
  const navigate = useNavigate();

  const [goToHome, setgoToHome] = useState(false);
   if (goToHome) {
      navigate('/home')
  }; 

  const [name, setName] = useState("")
  const [UserId, setUserId] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")

  const { createUser } = UserAuth();

    const userInfo = {
        Name: name,
        userId: UserId,
        email: Email,
     
    }

    const handleSumbit = async (e) => {
      e.preventDefault()
      setError("")
      try {
          await createUser(Email, Password, userInfo);
          navigate('/home')
      } catch (e) {
          setError(e.message)
          console.log(e.message)
      }
  }

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <Container className="form" style={{width: 800}}>
      <div id='formHeader'>
      </div>
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
                        
                    </div>
                    
                    
                    <div id="buttons" style={{ marginTop: -10 }} >
                            <Button
                                variant='outlined'
                                size='large'
                                type='submit'
                                style={{width: 225, marginRight: 10}}
                                startIcon={<DoneIcon />}
                                className='submit'
                                onClick={() => { setgoToHome(true) }}
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
                                onClick={() => { setgoToHome(true) }}
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

