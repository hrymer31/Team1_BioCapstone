import React, { useState, useEffect } from 'react'
import '../Css/PatientDetails.css'
import Navbar from './Navbar';

import { UserAuth } from "./AuthContext";
import { 
    FormControl, 
    Button
 } from '@mui/material'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [age, setAge] = useState()
    const [sex, setSex] = useState()
    const [race, setRace] = useState()
    const [neckCircumference, setNeckCircumference] = useState()
    const [waistCircumference, setWaistCircumference] = useState()

    const [ageError, setAgeError] = useState(false)
    const [sexError, setSexError] = useState(false)
    const [raceError, setRaceError] = useState(false)
    const [neckError, setNeckError] = useState(false)
    const [waistError, setWaistError] = useState(false)
    const [heightError, setHeightError] = useState(false)
    const [weightError, setWeightError] = useState(false)
    const [bodyFatError, setBodyFatError] = useState(false)
    const [targetWeightError, setTargetWeightError] = useState(false)

    const [result, setResult] = useState(null)
    const { user } = UserAuth();

    //uid, will use to access current users data base
    const [uid, setUid] = useState(user.uid)

    const [userDetails, setUserDetails] = useState({
        uid: uid,
        age: 0,
        sex: '',
        race: '',
        neckCircumference: 0,
        waistCircumference: 0,
        height: 0,
        weightlb: 0,
        bodyFatPerc: 0,
        targetWeightLossPerc: 0,
        weightkg: 0,
        currentFatMass: 0,
        currentFatFreeMass: 0,
        targetWeightLosskg: 0,
        targetBodyWeightkg: 0,
        newFatMass: 0,
        targetBodyFatPerc: 0,
        stepsPerDay: 0,
        totalStepTarget: 0,
        currentWeight: 0
    })
    function handleAgeChange(e) { userDetails.age = Number(e.target.value); setAge(Number(e.target.value));}
    function handleSexChange(e) { userDetails.sex = e.target.value; setSex(e.target.value);}
    function handleRaceChange(e) { userDetails.race = e.target.value; setRace(e.target.value); }
    function handleNeckChange(e) { userDetails.neckCircumference = Number(e.target.value); setNeckCircumference(e.target.value)}
    function handleWaistChange(e) { userDetails.waistCircumference = Number(e.target.value); setWaistCircumference(e.target.value)}
    function handleHeightChange(e) { userDetails.height = Number(e.target.value);}
    function handleWeightChange(e) { userDetails.weightlb = Number(e.target.value); userDetails.currentWeight = Number(e.target.value) }
    function handleBodyFatChange(e) { userDetails.bodyFatPerc = Number(e.target.value);}
    function handleTargetWeightChange(e) { userDetails.targetWeightLossPerc = Number(e.target.value);}

    const validate = () => {
        if(userDetails.age === 0){ setAgeError(true) }
        if(userDetails.sex === ''){ setSexError(true) }
        if(userDetails.race === '') { setRaceError(true) }
        if(userDetails.height === 0){ setHeightError(true) }
        if(userDetails.weightlb === 0){ setWeightError(true) }
        if(userDetails.bodyFatPerc === 0){ setBodyFatError(true) }
        if(userDetails.targetWeightLossPerc === 0){ setTargetWeightError(true) }
        if(
            (userDetails.age !== 0) && 
            (userDetails.sex !== '') && 
            (userDetails.race !== '') && 
            (userDetails.height !== 0) && 
            (userDetails.weightlb !== 0) && 
            (userDetails.bodyFatPerc !== 0) &&
            (userDetails.targetWeightLossPerc !== 0)
        ){
             calculate()
        }
    }
    const calculate = () => {
        (userDetails.weightkg = (userDetails.weightlb / 2.20462).toFixed(1) );
        (userDetails.currentFatMass = (userDetails.weightkg * (userDetails.bodyFatPerc/100)).toFixed(2));
        (userDetails.currentFatFreeMass = (userDetails.weightkg - userDetails.currentFatMass)).toFixed(0) ;
        (userDetails.targetWeightLosskg = (userDetails.weightkg * (userDetails.targetWeightLossPerc/100)).toFixed(1));
        (userDetails.targetBodyWeightkg = (userDetails.weightkg - userDetails.targetWeightLosskg).toFixed(1));
        (userDetails.newFatMass = (userDetails.currentFatMass - userDetails.targetWeightLosskg).toFixed(1));
        (userDetails.targetBodyFatPerc = ((userDetails.newFatMass / userDetails.targetBodyWeightkg)*100).toFixed(1));

        if (sex === 'Male') {
           userDetails.stepsPerDay = ((39377.34) / (Math.pow(userDetails.targetBodyFatPerc, 1.3405)).toFixed(1))
         
        } else if (sex === 'Female') {
            userDetails.stepsPerDay = ((261425.4) / (Math.pow(userDetails.targetBodyFatPerc, 1.8797)).toFixed(1))
          
        }
        userDetails.totalStepTarget = (userDetails.stepsPerDay * userDetails.currentFatMass)
        setResult(userDetails.totalStepTarget)

        setAgeError(false)
        setSexError(false)
        setNeckError(false)
        setWaistError(false)
        setHeightError(false)
        setWeightError(false)
        setBodyFatError(false)
        setTargetWeightError(false)   

        fetch("api/patients/addDetails", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userDetails)
        }).then((response) => {
            console.log(response.statusText)
        }) 

        navigate('/home')
    };

    return (
       
        <div className='PatientDetails'>
            <Navbar />
            <Box marginTop={10} marginBottom={10}
                className='detailsBox'
                sx={{
                    backgroundColor: 'white', 
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minHeight: 950,
                    height: 'auto',
                    overflow: 'auto',
                    borderRadius: 2
                }}>
                    <h5 className='detailsTitle'>Calculate Steps</h5>
                <FormControl 
                    fullWidth 
                    sx={{
                        display: 'flex'
                    }}
                >
                    <p> Enter details to get daily step count:</p>
                    <div className='detailsForm'>
                        <div className='detailsInputSection'>
                            <label htmlFor="age">Age</label>
                            <select id="age" value={age} onChange={(e) => handleAgeChange(e)}>
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
                            (ageError) && <div style={{color: 'red'}} className='detailsError'>You must select a valid option</div>   
                        }    
                        <div className='detailsInputSection'>
                            <label htmlFor="sex">Sex</label>
                            <select id='sex' value={sex} onChange={(e) => handleSexChange(e)}>
                                <option value=""></option>
                                {sexArray.map(sexOption => {
                                    return (
                                        <option value={sexOption}>{sexOption}</option>
                                    )
                                })}
                            </select>      
                        </div>
                        {
                            (sexError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid option</div>
                        }
                        <div className='detailsInputSection'>
                            <label htmlFor="race">Race</label>
                            <select id='race' value={race} onChange={(e) => handleRaceChange(e)}>
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
                            (raceError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid option</div>
                        }
                        <div className='detailsInputSection'>
                            <label htmlFor='neck'>Neck Circumference(cm)</label>
                            <input id='neck' type='number' placeholder='cm' onChange={(e) => handleNeckChange(e)} />
                            <label style={{'fontSize': 12, 'color': 'red'}}> *optional</label>
                        </div>
                        <div className='detailsInputSection'>
                            <label htmlFor='waist'>Waist Circumference(cm)</label>
                            <input id='waist' type='number' placeholder='cm' onChange={(e) => handleWaistChange(e)} />
                            <label style={{ 'fontSize': 12, 'color': 'red' }}> *optional</label>
                        </div>
                       <p> Enter all calculations below to the nearest tenths place (e.g. 250.5, 22.0)</p>
                        <div className='detailsInputSection'>
                            <label htmlFor='height'>Height(in)</label>
                            <input id='height' type='number' placeholder='in' onChange={(e) => handleHeightChange(e)} /> 
                        </div>
                        {
                            (heightError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid height</div>
                        }
                       
                        <div className='detailsInputSection'>
                            <label htmlFor='weight'>Weight(lb)</label>
                            <input id='weight' type='number' placeholder='lb' onChange={(e) => handleWeightChange(e)} /> 
                        </div>
                        {
                            (weightError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid weight</div>
                        }
                       
                        <div className='detailsInputSection'>
                            <label form='bodyFatPerc'>Body Fat %</label>
                            <input id='bodyFatPerc' type='number' placeholder='%' onChange={(e) => handleBodyFatChange(e)} />
                        </div>
                        {
                            (bodyFatError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid body fat %</div>
                        }

                        <p>For Target Weight Loss, please choose a number between 5% through 10% </p>
                        <div className='detailsInputSection'>
                            <label form='targetWeightLossPerc'>Target Weight Loss %</label>
                            <input id='targetWeightLossPerc' type='number' placeholder='%' onChange={(e) => handleTargetWeightChange(e)} />
                        </div>
                        {
                            (targetWeightError) && <div style={{ color: 'red' }} className='detailsError'>You must select a valid target weight %</div>
                        }
                    </div>

                    <Box textAlign={'center'} marginTop={5}>
                    <Button
                        variant = "outlined"
                        onClick={validate}
                    >
                        Get Results!
                    </Button>
                    </Box>
                </FormControl>    
                {
                    (result !== null) && 
                    <div className='result'>
                        Prescribed daily step count: {Math.trunc(result)}
                    </div>  
                }
            
            </Box>
                                  
        </div>
    )
}

export default PatientDetails;

