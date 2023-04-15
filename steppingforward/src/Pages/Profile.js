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

  const name = "Name"
  const username = "Username"    // <-- Values must be replaced with data pulled from database
  const email = "johndoe@email.com"
  //const password = "Password" ((Password should be hidden))
  const age = "Age"
  const sex = "Sex"

  const navigate = useNavigate()

  const enableEditing = () => {

    navigate("/edit")

  }

  return (

    <div classname = "Profile">

      <Navbar/>

      <Box marginTop={10}
        className='box'
        justifyContent={"center"}
        sx={{
        backgroundColor: 'white', 
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 400,
        overflow: 'auto',
        borderRadius: 2
      }}>

        <div className = "profileDisplay">

        <Typography variant = "h5" align = "center" gutterBottom>Profile</Typography>

        <FormControl fullWidth sx = {{display: "flex"}}>

          <label>Name: {name}</label>

          <label>Username: {username}</label>

          <label>Email: {email}</label>

          <label>Password: ******</label>

          <label>Age: {age}</label>

          <label>Sex: {sex}</label>

          <Button onClick={() => navigate(-1)}>Go back</Button>

          <Button onClick = {enableEditing}>Edit profile</Button>

        </FormControl>

        </div>

      </Box>

    </div>

  )

};

export default Profile;
