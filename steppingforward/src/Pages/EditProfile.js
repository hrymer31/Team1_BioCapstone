import React, { useState } from "react"
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { FormControl, Button, Typography, withTheme } from '@mui/material'
import Box from '@mui/material/Box';
import { useAuth } from "./AuthContext"
import { db } from '../firebase'
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import '../Css/Profile.css'

const EditProfile = () => {

    const [name, setName] = useState("");           //Initial state should be the value previously stored in the database
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const age = "Age"      //Settings should not be changed; setters are not necessary, only display of saved values
    const sex = "Sex"

    const navigate = useNavigate();

    const cancelEditing = () => {

        navigate("/profile")

    }

    const saveChanges = (e) => {

        e.preventDefault();
        //Update profile information in the database, then redirect back to profile info page
        navigate("/profile")

    }

    /*updateDoc(doc(db, "users"), {     
        name: name,
        username: username, 
        email: email,
        password: password
      }).then(() => { 
       
        console.log('data updated');  
  
      }).catch((error) => {
           
            console.log(error);
      });*/

    return (
        <div className="Profile">

            <Navbar />

            <Box marginTop={10} marginBottom={10}
                className='profileBox'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 700,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                    <h5 className='profileTitle'>Edit Profile</h5>

                    <FormControl sx={{ display: 'flex' }}>

                        <div className="profileForm">

                            <div className="profileInputSection">

                                <label htmlFor="Name">Name:</label>
                                <input id="Name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />

                            </div>
                            <div className="profileInputSection">

                                <label htmlFor="Username">Username:</label>
                                <input id="Username" type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />

                            </div>
                            <div className="profileInputSection">

                                <label htmlFor="Email">Email:</label>
                                <input id="Email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />

                            </div>
                            <div className="profileInputSection">

                                <label htmlFor="Password">Password:</label>
                                <input sx = {{backgroundColor: 'white'}} id="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

                            </div>
                            <div className="profileInputSection">

                                <label htmlFor="Age">Age:</label>
                                <input id="Age" disabled defaultValue={age} />

                            </div>
                            <div className="profileInputSection">

                                <label htmlFor="Sex">Sex:</label>
                                <input id="Sex" disabled defaultValue={sex} />

                            </div>

                        </div>

                        <Button onClick={cancelEditing}>Go Back</Button>

                        <Button onClick={saveChanges}>Save</Button>

                    </FormControl>

            </Box>

        </div>

    )


}

export default EditProfile;