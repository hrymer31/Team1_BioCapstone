import React, { useState, useEffect } from "react"
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { FormControl, Button, Typography, withTheme } from '@mui/material'
import Box from '@mui/material/Box';
import { UserAuth } from "./AuthContext"
import { db } from '../firebase'
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import '../Css/Profile.css'

const Profile = () => {
  const { user } = UserAuth();
  const username = ""    // <-- Values must be replaced with data pulled from database
  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate()

  const enableEditing = () => {
    navigate("/edit")
  }

  useEffect(() => {
    fetch('/api/patients/' + user.uid, { //getting user details
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(
      response => response.clone().json()
    ).then(
      data => {
        setUserInfo(data[0])
      }
    )
  }, [user])
  
  return (

    <div classname="Profile">

      <Navbar />

      <Box marginTop={10} marginBottom={10}
        className='profileBox'
        justifyContent={"center"}
        sx={{
          backgroundColor: 'white',
          width: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 650,
          overflow: 'auto',
          borderRadius: 2
        }}>

        <div className="profileDisplay">
          <h5 className='profileTitle'>Profile</h5>
          <FormControl sx={{ display: "flex" }}>
            <div className="profileForm">
              <div className="profileInputSection">
                <label>Name: {userInfo.name}</label>
              </div>
              <div className="profileInputSection">
                <label>Username: {username}</label>
              </div>
              <div className="profileInputSection">
                <label>Email: {userInfo.email}</label>
              </div>
              <div className="profileInputSection">
                <label>Password: ******</label>
              </div>
              <div className="profileInputSection">
                <label>Age: {userInfo.age}</label>
              </div>
              <div className="profileInputSection">
                <label>Sex: {userInfo.sex}</label>
              </div>
              <div className="profileInputSection">
                <label>Race: {userInfo.race}</label>
              </div>
            </div>
            <Box textAlign={'center'} padding={1}>
              <Button className = "profilebtn" variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
            </Box>
            <Box textAlign={'center'} padding={1}>
              <Button className = "profilebtn" variant="outlined" onClick={enableEditing}>Edit profile</Button>
            </Box>
          </FormControl>
        </div>
      </Box>
    </div>
  )
};

export default Profile;