import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { FormControl, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import ClearIcon from "@mui/icons-material/Clear";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";



const Login = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
 
  const { signIn, user, isLoggedIn, userData, isDisabled } = UserAuth();
  const [goToForgotPassword, setgoToForgotPassword] = useState(false);
  const [goToHome, setgoToHome] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(true);


    useEffect(()=>{
        
        if(goToForgotPassword){
            setgoToHome(false)
            navigate('/forgotpassword')
        }
       
        if(goToHome){
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
      if (user) {
          if (goToDashboard) {
              let role = window.localStorage.getItem('userRole')
              if (role === "Administrator") {
                  navigate('/admindashboard')
                
             
              }
              else
              navigate('/home')
          };
      }
  }

    

  return (
    <div className="login">
      
      <Container
        className="form"
        style={{
          width: 400,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div id="formHeader">
          <h1>Login</h1>
        </div>
        {!isDisabled && (
          <FormControl id="formcontrol">
            <TextField
              id="outlined-password-input Username"
              label="Username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: 10, marginTop: 20 }}
            />
            <TextField
              id="outlined-password-input password"
              label="Password"
              type="password"
              autoComplete="current-password"
              style={{ marginBottom: 60 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outlined"
              size="large"
              type="submit"
              style={{ width: 225, marginBottom: 10 }}
              startIcon={<LoginIcon />}
              className="submit"
              onClick={handleSignIn}
              sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225, marginBottom: 10 }}
              startIcon={
                <QuestionMarkIcon fontSize="14px" sx={{ marginLeft: -2 }} />
              }
              className="forgot"
              onClick={() => {
                setgoToForgotPassword(true);
              }}
              sx={{ ":hover": { bgcolor: "rgb(252, 229, 83,0.2)" } }}
            >
              Forgot Password
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225 }}
              startIcon={<ClearIcon />}
              className="cancel"
              onClick={() => {
                setgoToHome(true);
              }}
              sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
            >
              Cancel
            </Button>
          </FormControl>
        )}
        {isDisabled && (
          <FormControl id="formcontrol">
            <TextField
              disabled
              id="outlined-disabled Username"
              label="Disabled"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: 10, marginTop: 20 }}
            />
            <TextField
              disabled
              id="outlined-disabled password"
              label="Disabled"
              type="password"
              autoComplete="current-password"
              style={{ marginBottom: 60 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled
              variant="outlined"
              size="large"
              type="submit"
              style={{ width: 225, marginBottom: 10 }}
              startIcon={<LoginIcon />}
              className="submit"
              sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225, marginBottom: 10 }}
              startIcon={
                <QuestionMarkIcon fontSize="14px" sx={{ marginLeft: -2 }} />
              }
              className="forgot"
              onClick={() => {
                setgoToForgotPassword(true);
              }}
              sx={{ ":hover": { bgcolor: "rgb(252, 229, 83,0.2)" } }}
            >
              Forgot Password
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225 }}
              startIcon={<ClearIcon />}
              className="cancel"
              onClick={() => {
                setgoToHome(true);
              }}
              sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
            >
              Cancel
            </Button>
          </FormControl>
        )}
      </Container>
    </div>

  );
};


export default Login;