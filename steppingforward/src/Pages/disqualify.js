import * as React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import { FormControl, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../Css/agePages.css'
import HomeHeader from './HomeHeader';

 const Disqualify = () => {

    const [email, setEmail] = useState(null)
    const [age, setAge] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        //Store information in database
    }

    return (
        <div className = "pages">

            <HomeHeader/>

            <Box
                marginTop={10}
                className='box'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 500,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                    <div className = "formDisplay">

            <Typography variant = "h5" align = "center" gutterBottom>Thank you for your interest!</Typography>
            <Typography variant = "p">We're sorry, but your age does not qualify for this study.</Typography>
            <Typography variant = "p">If further research extends into your age range,</Typography>
            <Typography variant = "p">would you like us to contact you to participate?</Typography>
            <Typography variant = "p" marginTop={3}>If so, please enter your information below:</Typography>

            <FormControl sx={{ display: 'flex' }} align="center">

        <div className = "disqualifyForm">

            <div className = "formText">
                <Typography variant = "p">Please enter your email:</Typography>
            </div>
            <div className = "formField">
                <TextField
                size = "small"
                variant = "outlined"
                type = "email"
                value = {email}
                required
                onChange = {(e) => setEmail(e.target.value)}
                />
            </div>

        </div>

        <div className = "disqualifyForm">

            <div className = "formText">
                <Typography variant = "p">Please enter your age:</Typography>
            </div>
            <div className = "formField">
                <TextField
                size = "small"
                variant = "outlined"
                type = "number"
                value = {age}
                required
                onChange = {(e) => setAge(e.target.value)}
                />
            </div>

        </div>

        <button
        className = "btn"
        type = "submit"
        onSubmit = {handleSubmit}
        >
            Submit
        </button>
        </FormControl>
        </div>
        
        </Box>
                
        </div>
    )
}
export default Disqualify;