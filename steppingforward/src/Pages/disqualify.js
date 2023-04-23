import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { FormControl, Button } from '@mui/material';
import Box from '@mui/material/Box';
import '../Css/agePages.css'
import HomeHeader from './HomeHeader';

const Disqualify = () => {
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
        
    const navigate = useNavigate();

    const disqualifyInfo = {
        newEmail: email,
        newAge: age,
    }

    //Handle Submit does not navigate back to landing page. I think the try and catch has an issue
    async function handleSubmit(){
        //Store information in database
        fetch("api/patientsFuture", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(disqualifyInfo)

        }).then((response) => {
            alert('Your information has been saved, Thank you!')
            navigate('/')
        })
    }

    return (
        <div className="agePages">

            <HomeHeader />

            <Box
                marginTop={10}
                className='ageBox'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 500,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <div className="ageFormDisplay">

                    <Typography variant="h5" align="center" gutterBottom marginTop={2}>Thank you for your interest!</Typography>
                    <Typography variant="p">We're sorry, but your age does not qualify for this study.</Typography>
                    <Typography variant="p">If further research extends into your age range,</Typography>
                    <Typography variant="p">would you like us to contact you to participate?</Typography>
                    <Typography variant="p" marginTop={3}>If so, please enter your information below:</Typography>

                    <FormControl sx={{ display: 'flex' }} align="center">

                        <div className="ageForm">

                            <div className="ageInputSection">
                                <label>Please enter your email:</label>
                                <input id="Email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="ageInputSection">
                                <label>Please enter your age:</label>
                                <input id="Age" type="number" defaultValue={age} required onChange={(e) => setAge(e.target.value)} />
                            </div>

                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>

                        </div>
                    </FormControl>
                </div>

            </Box>

        </div>
    )
}
export default Disqualify;
