import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import LoginIcon from "@mui/icons-material/Login";
import ClearIcon from "@mui/icons-material/Clear";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HomeHeader from './HomeHeader'
import '../Css/Auth.css'

const Login = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, user, isLoggedIn, userData, isDisabled } = UserAuth();
  const [goToForgotPassword, setgoToForgotPassword] = useState(false);
  const [goToHome, setgoToHome] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(true);


  useEffect(() => {

    if (goToForgotPassword) {
      setgoToHome(false)
      navigate('/forgotpassword')
    }

    if (goToHome) {
      setgoToForgotPassword(false)
      navigate('/home')
    }
  }, [goToForgotPassword, goToHome])


  const handleSignIn = (e) => {
    e.preventDefault();
    if (username === "") {
      alert("Username can't be empty");
    } else if (password === "") {
      alert("Password can't be empty");
    }
    try {
      signIn(username, password)
      handleNavigation()
    } catch (error) {
      console.log(error)
    }

  }

  function handleNavigation() {
    if (isLoggedIn) {
      navigate('/home')
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

        <h5 className='authTitle'>Login</h5>

        {!isDisabled && (
          <FormControl sx={{ display: 'flex' }}>

            <div className="authForm">

              <div className="authInputSection">

                <label htmlFor="Username">Username:</label>
                <input
                  id="outlined-password-input Username"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />

              </div>

              <div className="authInputSection">

                <label htmlFor="Password">Password:</label>
                <input
                  id="outlined-password-input password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

            </div>

            <Box textAlign={'center'} marginTop={5}>

              <Button
                variant="outlined"
                type="submit"
                startIcon={<LoginIcon />}
                onClick={(e) => handleSignIn(e)}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                Login
              </Button>

            </Box>

            <Box textAlign={'center'}>

              <Button
                variant="outlined"
                startIcon={
                  <QuestionMarkIcon fontSize="14px" sx={{ marginLeft: -2 }} />
                }
                onClick={() => {
                  setgoToForgotPassword(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 229, 83,0.2)" } }}
              >
                Forgot Password
              </Button>

            </Box>

            <Box textAlign={'center'}>

              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setgoToHome(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        )}



        {isDisabled && (
          <FormControl sx={{ display: 'flex' }}>

            <div className="authForm">

              <div className="authInputSection">

                <label htmlFor = "Disabled">Disabled</label>
                <input
                  disabled
                  id="outlined-disabled Username"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />

              </div>

              <div className="authInputSection">

                <label htmlFor="DisabledPassword">Disabled:</label>
                <input
                  disabled
                  id="outlined-disabled password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

             
            </div>

            <Box textAlign={'center'} marginTop={5}>

            <Button
                disabled
                variant="outlined"
                type="submit"
                startIcon={<LoginIcon />}
                sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
              >
                Login
              </Button>

            </Box>

            <Box textAlign={'center'}>

              <Button
                variant="outlined"
                startIcon={<QuestionMarkIcon fontSize="14px" sx={{ marginLeft: -2 }} />}
                onClick={() => {
                  setgoToForgotPassword(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 229, 83,0.2)" } }}
              >
                Forgot Password
              </Button>

            </Box>

            <Box textAlign={'center'}>

              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setgoToHome(true);
                }}
                sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
              >
                Cancel
              </Button>

          </Box>

          </FormControl>
        )}
      </Box>
    </div>

  );
};


export default Login;