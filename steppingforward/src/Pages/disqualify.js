import * as React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '../Css/agePages.css'

 const Disqualify = () => {

    const [email, setEmail] = useState(null)
    const [age, setAge] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        //Store information in database
    }

    return (
        <div className = "disqualify">

            <Typography variant = "h3" gutterBottom>Thank you for your interest!</Typography>
            <Typography variant = "h6">We're sorry, but your age does not qualify for this study.</Typography>
            <Typography variant = "h6">If further research extends into your age range,</Typography>
            <Typography variant = "h6">would you like us to contact you to participate?</Typography>
            <Typography variant = "h6" marginTop={5}>If so, please enter your information below:</Typography>

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

        </div>
    )
}
export default Disqualify;