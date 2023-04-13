import React, {useState } from "react"
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import Button from "@mui/material/Button";
import { FormControl, Container, TextField } from "@mui/material";
import { useAuth } from "./AuthContext"
import {db} from '../firebase'
import { Link, } from "react-router-dom"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ClearIcon from "@mui/icons-material/Clear";

const Profile = () => {
    const [name, setName] = useState(''); 
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    updateDoc(doc(db, "users"), {     
        name: name,
        username: username, 
        email: email,
        password: password
      }).then(() => { 
       
        console.log('data updated');  
  
      }).catch((error) => {
           
            console.log(error);
      });


      //CREATE RETURN with buttons for handling submission
      return(
        <div className="profile">
      
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
          <h1>Update Account</h1>
        </div>
       
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
              type="update"
              style={{ width: 225, marginBottom: 10 }}
             
              className="update"
              onClick={updateDoc}
              sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225 }}
              startIcon={<ClearIcon />}
              className="cancel"
              onClick={() => {
                updateDoc(true);
              }}
              sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
            >
              Cancel
            </Button>
          </FormControl>
     
      
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
              className="submit"
              sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 225, marginBottom: 10 }}
              startIcon={
                <QuestionMarkIcon fontSize="14px" sx={{ marginLeft: -2 }} />
              }
              
              sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }}
            >
              Cancel
            </Button>
          </FormControl>
        
      </Container>
    </div>
      )




};
export default Profile;
