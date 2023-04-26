import React, { useState, useEffect } from "react"
import { FormControl, Button, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import { UserAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ClearIcon from "@mui/icons-material/Clear";
import Navbar from "./Navbar";
import '../Css/Profile.css'
import { updateEmail } from "firebase/auth";



const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    return passwordRegex.test(password);
};

const EditProfile = () => {
    const { user, auth, updatePassword } = UserAuth();
    const [userInfo, setUserInfo] = useState({})
    const [name, setName] = useState("");           //Initial state should be the value previously stored in the database
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const cancelEditing = () => {

        navigate("/profile")

    }

    const saveChanges = async (e) => {
        console.log(name + '' + email)
        let updatedProfile = {
            uid: user.uid,
            newName: '',
            newEmail: ''
        }
        //email and password requires recent sign in
        if (password !== "") { //this updates password in firebase
            try {
                await updatePassword(auth.currentUser, password)
            } catch (error) {
                console.log(error)
            }
        }

        if (email !== "") { //this updates password in firebase and sets email variable for azure
            try {
                await updateEmail(auth.currentUser, email)
                updatedProfile.newEmail = email; //updates email in object
            } catch (error) {
                console.log(error)
            }
        } else { updatedProfile.newEmail = userInfo.email } //if email field is empty keeps email the same

        if (name !== "") { //if name field is not empty update object
            updatedProfile.newName = name;
        } else { updatedProfile.newName = userInfo.name } // if its empty keep it the same

        fetch("/api/patients/updateProfile", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedProfile)
        }).then((response) => {
            console.log(response.statusText)
        })
        e.preventDefault();

        //Update profile information in the database, then redirect back to profile info page
        navigate("/profile")
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
        <div className="Profile">

            <Navbar />

            <Box marginTop={10} marginBottom={10}
                className='profileBox'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 650,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <div className="ProfileDisplay">

                <h5 className='profileTitle'>Edit Profile</h5>

                    <FormControl fullWidth sx={{ display: 'flex' }}>

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
                                <input id="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <h5>Password Requirements:</h5>
                            <p style={{ color: !validatePassword(password) ? "red" : "green" }} align = "center">
                                    Password must be at least 6 characters long and contain at least one uppercase letter
                                </p>

                        </div>

                        <Box textAlign={'center'} padding={1}>

                        <Button className = "profilebtn" variant = "outlined" onClick={cancelEditing}>Go Back</Button>

                        </Box>

                        <Box textAlign={'center'} padding={1}>

                        <Button className = "profilebtn" variant = "outlined" onClick={saveChanges}>Save</Button>

                        </Box>

                    </FormControl>

                </div>

            </Box>

        </div>

    )


}

export default EditProfile;
