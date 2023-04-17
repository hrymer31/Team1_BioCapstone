import * as React from 'react'
import { useState } from 'react'
import { FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../Css/agePages.css'
import Navbar from './Navbar';
  
const options = ["Yes", "No"]

export const AgeCheck = () => {

    const [choice, setChoice] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        //Navigation goes here
        
        //If yes was selected --> proceed with making account
        //If no was selected --> navigate to disqualification page
    }

    return (
      
        <Navbar />
      
        <div className = "ageCheck">
            
            <Typography variant = "h3" gutterBottom>Before we begin...</Typography>

            <Typography variant = "h6" gutterBottom>Are you between the ages of 19 and 40?</Typography>

            <FormControl className = "selectBox" margin = "normal">

                <InputLabel id="demo-simple-select-age-range">Select</InputLabel>
                    <Select
                    labelId="demo-simple-select-age-range"
                    id="demo-simple-select-age-range"
                    defaultValue=""
                    value={choice}
                    label="Choice"
                    onChange={(e) => setChoice(e.target.value)}
                    >
                        {options.map(ageRange => {
                            return (
                                <MenuItem value={ageRange}>
                                    {ageRange}
                                </MenuItem>
                            )
                        })}
                    </Select>
            </FormControl>
            <button 
            className = "btn"
            type = "submit"
            onSubmit={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}
