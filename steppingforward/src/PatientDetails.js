import React, { useState } from 'react'
import './PatientDetails.css'
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField,
    InputAdornment,
    FormHelperText,
    OutlinedInput,
    Button
 } from '@mui/material'
import Quotes from './InspirationalQuotes';

const ageArray = [];

for (var i = 19; i < 46; i++) {
    ageArray[i - 19] = i;
}
const sexArray = ["Female","Male"]

const raceArray = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White"
]

const PatientDetails = () => {
    const [age, setAge] = useState(null)
    const [sex, setSex] = useState(null)
    const [race, setRace] = useState(null)
    const [height, setHeight] = useState(null)

    const [weightlb, setWeightlb] = useState(null)
    const [bodyFatPerc, setBodyFatPerc] = useState(null)
    const [targetWeightLossPerc, setTargetWeightLossPerc] = useState(null)

    const [weightkg, setWeightkg] = useState(null)
    const [currentFatMass, setCurrentFatMass] = useState(null)
    const [currentFatFreeMass, setCurrentFatFreeMass] = useState(null)
    const [targetWeightLosskg, setTargetWeightLosskg] = useState(null)
    const [targetBodyWeightkg, setTargetBodyWeightkg] = useState(null)
    const [newCurrentFatMass, setNewCurrentFatMass] = useState(null)
    const [targetBodyFatPerc, setTargetBodyfatPerc] =  useState(null)
    const [stepsPerDay, setStepsPerDay] = useState(null)
    const [results, setResults] = useState(null)

    const calculate = () => {
        setWeightkg(
            weightlb * .45467
        )
        setCurrentFatMass(
            weightkg * bodyFatPerc
        )
        setCurrentFatFreeMass(
            weightkg - currentFatMass
        )
        setTargetWeightLosskg(
            weightkg * targetWeightLossPerc
        )
        setTargetBodyWeightkg(
            weightkg - targetWeightLosskg
        )
        setNewCurrentFatMass(
            currentFatMass - targetWeightLosskg
        )
        setTargetBodyfatPerc(
            newCurrentFatMass / 95.1 
        )

        if(sex === 'Male'){
            const results = (39377.34)/(Math.pow(targetBodyFatPerc,1.3405))
            setResults(results)
        } else if (sex ==='Female'){
            const results = (261425.4) / (Math.pow(targetBodyFatPerc, 1.8797))
            setResults(results)
        }
    };
    return (
        <div className='PatientDetails'>
            <FormControl fullWidth>
                <div className='inputSection'>
                    <InputLabel id="demo-simple-select-label-age">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-age"
                        id="demo-simple-select-age"
                        defaultValue=""
                        value={age}
                        label="Age"
                        onChange={(e)=> setAge(e.target.value)}
                    >
                        {ageArray.map(ageOption =>{
                            return (
                                <MenuItem value={ageOption}>
                                    {ageOption}
                                </MenuItem>
                            )  
                        })}
                    </Select>
                </div>
                <div className='inputSection'>
                    <InputLabel id="demo-simple-select-label-sex">Sex</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-sex"
                        id="demo-simple-select-sex"
                        defaultValue=""
                        value={sex}
                        label="Sex"
                        onChange={(e) => setSex(e.target.value)}
                    >
                        {sexArray.map(sexOption => {
                            return (
                                <MenuItem value={sexOption}>
                                    {sexOption}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </div>
                <div className='inputSection'>
                    <InputLabel id="demo-simple-select-label-race">Race</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-race"
                        id="demo-simple-select"
                        defaultValue=""
                        value={race}
                        label="Race"
                        onChange={(e) => setRace(e.target.value)}
                    >
                        {raceArray.map(raceOption => {
                            return (
                                <MenuItem value={raceOption}>
                                    {raceOption}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </div>
                <div className='inputSection'>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'height',
                        }}
                        onChange={(e) => setWeightlb(e.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Height</FormHelperText>
                </div>
                <p> Enter all calculations below to the nearest tenths place (e.g. 250.5, 22.0)</p>
                <div className='inputSection'>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        onChange={(e) => setWeightlb(e.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                </div>
                <div className='inputSection'>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        onChange={(e) => setBodyFatPerc(e.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Body Fat %</FormHelperText>
                </div>
                <div className='inputSection'>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        onChange={(e) => setTargetWeightLossPerc(e.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Target Weight Loss %</FormHelperText>
                </div>    
                <Button
                    onClick={calculate}
                >
                    Get Results!
                </Button>
            </FormControl>     
            <div>
                Prescribed daily step count: {Math.trunc(results)}
            </div>                                        
        </div>
    )
}

export default PatientDetails;

    /*
    <div className='inputSection'>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleAgeChange}
                    >
                        {ageArray.map((age) =>
                            <MenuItem
                                selected={false}
                            >{age}</MenuItem>
                        )}
                    </Select>
                </div>
                */