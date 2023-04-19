import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormControl, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../Css/agePages.css'
import HomeHeader from './HomeHeader';

const options = ["Yes", "No"]

export const AgeCheck = () => {

    const [choice, setChoice] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (choice == "No") {
            navigate("/disqualify");
        }
        else {
            navigate("/signup");
        }

    }

    function handleChoice(e) { setChoice(e.target.value) }

    return (

        <div className="pages">

            <HomeHeader />

            <Box
                marginTop={10}
                className='box'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 250,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <div className="formDisplay">

                    <Typography variant="h5" align="center" gutterBottom>Before we begin...</Typography>

                    <Typography variant="p" gutterBottom>Are you between the ages of 19 and 40?</Typography>

                    <FormControl sx={{ display: 'flex' }} align="center">

                        <div className="form">

                            <div className="inputSection">

                                <select label="Select" id='choice' value={choice} onChange={(e) => handleChoice(e)}>
                                    <option value=""></option>
                                    {options.map(option => {
                                        return (
                                            <option value={option}>{option}</option>
                                        )
                                    })}
                                </select>

                            </div>
                        </div>

                        <Button
                            variant="outlined"
                            align="center"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>

                    </FormControl>
                </div>
            </Box>
        </div>
    )
}
