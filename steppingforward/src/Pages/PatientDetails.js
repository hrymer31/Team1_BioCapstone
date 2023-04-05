import React, { useState } from 'react'
import '../Css/PatientDetails.css'
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
import Quotes from '../InspirationalQuotes';
import { borderRadius, Box } from '@mui/system';

const ageArray = [];
ageArray[0] = ' '
for (var i = 19; i < 46; i++) {
    ageArray[i - 18] = i;
}
const sexArray = [" ","Female","Male"]

const raceArray = [
    "",
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

    const [ageError, setAgeError] = useState(false)
    const [sexError, setSexError] = useState(false)
    const [raceError, setRaceError] = useState(false)

    const [weightlb, setWeightlb] = useState(null)
    const [bodyFatPerc, setBodyFatPerc] = useState(null)
    const [targetWeightLossPerc, setTargetWeightLossPerc] = useState(null)

    const [weightkg, setWeightkg] = useState(null)
    const [currentFatMass, setCurrentFatMass] = useState(null)
    const [currentFatFreeMass, setCurrentFatFreeMass] = useState(null)
    const [targetWeightLosskg, setTargetWeightLosskg] = useState(null)
    const [targetBodyWeightkg, setTargetBodyWeightkg] = useState(null)
    const [newFatMass, setNewFatMass] = useState(null)
    const [targetBodyFatPerc, setTargetBodyfatPerc] =  useState(null)
    const [stepsPerDay, setStepsPerDay] = useState(null)
    const [results, setResults] = useState(null)

    const validate = () => {
         if (age === null || " ") {
            setAgeError(true)
        } 
        if (sex === null || " ") {
            setSexError(true)
        } 
        if (race === null || " ") {
            setRaceError(true)
        } 
        if((!ageError)&&(!sexError)&&(!raceError)){
            console.log('calculating')
            calculate()
        } 
    }
    const calculate = () => {
            setWeightkg(
                weightlb / 2.20462
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
            setNewFatMass(
                currentFatMass - targetWeightLosskg
            )
            setTargetBodyfatPerc(
                (newFatMass / 95.1) * 100
            )
            if (sex === 'Male') {
                const results = (39377.3357744) / (Math.pow(newFatMass, 1.304048257))
                setResults(results)
            } else if (sex === 'Female') {
                const results = (261425.44) / (Math.pow(targetBodyFatPerc, 1.87969924))
                setResults(results)
            }  
            setAgeError(false)
            setSexError(false)
            setRaceError(false)   
    };
    return (
        <div className='PatientDetails'>
            <Box 
                className='box'
                sx={{
                    backgroundColor: 'white', 
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 700,
                    overflow: 'auto',
                    borderRadius: 2
                }}>
                <FormControl 
                    fullWidth 
                    sx={{
                        display: 'flex'
                    }}
                >
                    <p> Enter details to get Daily Step Count</p>
                    <div className='form'>
                        <div className='inputSection'>
                            <label htmlFor="age">Age</label>
                            <select id="age" value={age} onChange={(e) => setAge(e.target.value)}>
                                {
                                    ageArray.map(ageOption => {
                                        return (
                                            <option value={ageOption}>{ageOption}</option>
                                        )
                                    })
                                }
                            </select>                              
                        </div>
                        {
                            (ageError) && <div style={{color: 'red'}} className='error'>You must select a valid age</div>   
                        }    
                        <div className='inputSection'>
                            <label htmlFor="sex">Sex</label>
                            <select id='sex' value={sex} onChange={(e) => setSex(e.target.value)}>
                                {sexArray.map(sexOption => {
                                    return (
                                        <option value={sexOption}>{sexOption}</option>
                                    )
                                })}
                            </select>      
                        </div>
                        {
                            (sexError) && <div style={{ color: 'red' }} className='error'>You must select a valid sex</div>
                        }
                        <div className='inputSection'>
                            <label htmlFor="race">Race</label>
                            <select id='race' value={race} onChange={(e) => setRace(e.target.value)}>
                                {
                                    raceArray.map(raceOption => {
                                        return (
                                            <option>{raceOption}</option>
                                        )
                                    })
                                }
                            </select>          
                        </div>
                        {
                            (raceError) && <div style={{ color: 'red' }} className='error'>You must select a valid race</div>
                        }
                        <div className='inputSection'>
                            <label htmlFor='height'>Height(cm)</label>
                            <input id='height' type='number' placeholder='cm' onChange={(e) => setHeight(e.target.value)} /> 
                        </div>
                        <p> Enter all calculations below to the nearest tenths place (e.g. 250.5, 22.0)</p>
                        <div className='inputSection'>
                            <label htmlFor='weight'>Weight(lb)</label>
                            <input id='weight' type='number' placeholder='lb' onChange={(e) => setWeightlb(e.target.value)} /> 
                        </div>
                        <div className='inputSection'>
                            <label form='bodyFatPerc'>Body Fat %</label>
                            <input id='bodyFatPerc' type='number' placeholder='%' onChange={(e) => setBodyFatPerc((e.target.value) / 100)} />
                        </div>
                        <div className='inputSection'>
                            <label form='targetWeightLossPerc'>Target Weight Loss %</label>
                            <input id='targetWeightLossPerc' type='number' placeholder='%' onChange={(e) => setTargetWeightLossPerc((e.target.value) / 100)} />
                        </div>
                    </div>
                    <Button
                        onClick={validate}
                    >
                        Get Results!
                    </Button>
                </FormControl>    
                <div className='result'>
                    Prescribed daily step count: {Math.trunc(results)}
                </div>  
            </Box>                           
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