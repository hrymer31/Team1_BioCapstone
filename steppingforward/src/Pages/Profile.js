import React, {useState } from "react"
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import {FormControl, Typography} from "@mui/material";
import { useAuth } from "./AuthContext"
import {db} from '../firebase'
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import '../Css/Profile.css'

const Profile = () => {

  const name = ""
  const username = ""    // <-- Values must be replaced with data pulled from database
  const email = ""
  //const password = "Password" ((Password should be hidden))
  const age = ""
  const sex = ""

  const navigate = useNavigate()

  const enableEditing = () => {

    navigate("/edit")

  }

  return (

    <div classname = "Profile">

      <Navbar/>

      <Box marginTop={10} marginBottom={10}
        className='profileBox'
        justifyContent={"center"}
        sx={{
        backgroundColor: 'white', 
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 675,
        overflow: 'auto',
        borderRadius: 2
      }}>

        <div className = "profileDisplay">

        <h5 className='profileTitle'>Profile</h5>

        <FormControl sx = {{display: "flex"}}>

        <div className="profileForm">

        <div className="profileInputSection">

          <label>Name: {name}</label>

        </div>

        <div className="profileInputSection">

          <label>Username: {username}</label>

        </div>

        <div className="profileInputSection">

          <label>Email: {email}</label>

        </div>

        <div className="profileInputSection">

          <label>Password: ******</label>

        </div>

        <div className="profileInputSection">

          <label>Age: {age}</label>

        </div>

        <div className="profileInputSection">

          <label>Sex: {sex}</label>

        </div>

          </div>

          
          <Button onClick={() => navigate(-1)}>Go back</Button>

          <Button onClick = {enableEditing}>Edit profile</Button>

        </FormControl>

        </div>

      </Box>

    </div>

  )

};

export default Profile;
