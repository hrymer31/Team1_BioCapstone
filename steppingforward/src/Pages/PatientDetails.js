import React, { useState } from 'react'
import '../Css/PatientDetails.css'
import { 
    FormControl, 
    Button
 } from '@mui/material'
import Quotes from '../InspirationalQuotes';
import { Box } from '@mui/system';

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
    const [age, setAge] = useState()
    const [sex, setSex] = useState()
    const [race, setRace] = useState()
    const [height, setHeight] = useState()

    const [weightlb, setWeightlb] = useState()
    const [bodyFatPerc, setBodyFatPerc] = useState()
    const [targetWeightLossPerc, setTargetWeightLossPerc] = useState()

    const [ageError, setAgeError] = useState(false)
    const [sexError, setSexError] = useState(false)
    const [raceError, setRaceError] = useState(false)
    const [heightError, setHeightError] = useState(false)
    const [weightError, setWeightError] = useState(false)
    const [bodyFatError, setBodyFatError] = useState(false)
    const [targetWeightError, setTargetWeightError] = useState(false)
 
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
        if(age === undefined){
            setAgeError(true)
        }
        if(sex === undefined){
            setSexError(true)
        }
        if(race === undefined){
            setRaceError(true)
        }
        if(height === undefined) {
            setHeightError(true)
        }
        if (weightlb === undefined) {
            setWeightError(true)
        }
        if (bodyFatPerc === undefined) {
            setBodyFatError(true)
        }
        if (targetWeightLossPerc === undefined) {
            setTargetWeightError(true)
        }
        if(
            (age !== undefined) && 
            (sex !== undefined) && 
            (race !== undefined) &&
            (height !== undefined) && 
            (weightlb !== undefined) && 
            (bodyFatPerc !== undefined) &&
            (targetWeightLossPerc !== null)
        ){
            calculate()
        }
    }
    const calculate = () => {
            setWeightkg(
                (weightlb / 2.20462)
            )
            setCurrentFatMass(
                (weightkg * bodyFatPerc)
            )
            setCurrentFatFreeMass(
                (weightkg - currentFatMass)
            )
            setTargetWeightLosskg(
                (weightkg * targetWeightLossPerc)
            )
            setTargetBodyWeightkg(
                (weightkg - targetWeightLosskg)
            )
            setNewFatMass(
                (currentFatMass - targetWeightLosskg)
            )
            setTargetBodyfatPerc(
                ((newFatMass / targetBodyWeightkg) * 100)
            )            
            if (sex === 'Male') {
                const results = ((39377.3357744) / (Math.pow(targetBodyFatPerc, 1.304048257)))
                setResults(results)
            } else if (sex === 'Female') {
                const results = ((261425.44) / (Math.pow(targetBodyFatPerc, 1.87969924)))
                setResults(results)
            }  
            setAgeError(false)
            setSexError(false)
            setRaceError(false)
            setHeightError(false)
            setWeightError(false)
            setBodyFatError(false)
            setTargetWeightError(false)   
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
                                <option value=""></option>
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
                                <option value=""></option>
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
                                <option value=""></option>
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
                        {
                            (heightError) && <div style={{ color: 'red' }} className='error'>You must select a valid height</div>
                        }
                        <p> Enter all calculations below to the nearest tenths place (e.g. 250.5, 22.0)</p>
                        <div className='inputSection'>
                            <label htmlFor='weight'>Weight(lb)</label>
                            <input id='weight' type='number' placeholder='lb' onChange={(e) => setWeightlb(e.target.value)} /> 
                        </div>
                        {
                            (weightError) && <div style={{ color: 'red' }} className='error'>You must select a valid weight</div>
                        }
                        <div className='inputSection'>
                            <label form='bodyFatPerc'>Body Fat %</label>
                            <input id='bodyFatPerc' type='number' placeholder='%' onChange={(e) => setBodyFatPerc((e.target.value) / 100)} />
                        </div>
                        {
                            (bodyFatError) && <div style={{ color: 'red' }} className='error'>You must select a valid body fat %</div>
                        }
                        <div className='inputSection'>
                            <label form='targetWeightLossPerc'>Target Weight Loss %</label>
                            <input id='targetWeightLossPerc' type='number' placeholder='%' onChange={(e) => setTargetWeightLossPerc((e.target.value) / 100)} />
                        </div>
                        {
                            (targetWeightError) && <div style={{ color: 'red' }} className='error'>You must select a valid target weight %</div>
                        }
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
