import React, { useState } from 'react'
import '../Css/PatientDetails.css'
import Navbar from './Pages/Navbar';

import { 
    FormControl, 
    Button
 } from '@mui/material'
import { Box } from '@mui/system';

const ageArray = [];
for (var i = 19; i < 46; i++) {
    ageArray[i - 19] = i;
}
const sexArray = ["Female","Male"]


const PatientDetails = () => {
    const [age, setAge] = useState()
    const [sex, setSex] = useState()
  

    const [ageError, setAgeError] = useState(false)
    const [sexError, setSexError] = useState(false)

    const [heightError, setHeightError] = useState(false)
    const [weightError, setWeightError] = useState(false)
    const [bodyFatError, setBodyFatError] = useState(false)
    const [targetWeightError, setTargetWeightError] = useState(false)

    const [result, setResult] = useState(null)
    const [userDetails, setUserDetails] = useState({
        age: 0,
        sex: '',
        race: '',
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
        totalStepTarget: 0
    })
    function handleAgeChange(e) { userDetails.age = Number(e.target.value); setAge(Number(e.target.value));}
    function handleSexChange(e) { userDetails.sex = e.target.value; setSex(e.target.value);}
    
    function handleHeightChange(e) { userDetails.height = Number(e.target.value);}
    function handleWeightChange(e) { userDetails.weightlb = Number(e.target.value);}
    function handleBodyFatChange(e) { userDetails.bodyFatPerc = Number(e.target.value);}
    function handleTargetWeightChange(e) { userDetails.targetWeightLossPerc = Number(e.target.value);}

    const validate = () => {
        console.log(userDetails)
        if(userDetails.age === 0){ setAgeError(true) }
        if(userDetails.sex === ''){ setSexError(true) }
        if(userDetails.height === 0){ setHeightError(true) }
        if(userDetails.weightlb === 0){ setWeightError(true) }
        if(userDetails.bodyFatPerc === 0){ setBodyFatError(true) }
        if(userDetails.targetWeightLossPerc === 0){ setTargetWeightError(true) }
        if(
            (userDetails.age !== 0) && 
            (userDetails.sex !== '') && 
            (userDetails.height !== 0) && 
            (userDetails.weightlb !== 0) && 
            (userDetails.bodyFatPerc !== 0) &&
            (userDetails.targetWeightLossPerc !== 0)
        ){
             calculate()
        }
    }
    const calculate = () => {
        userDetails.weightkg = (userDetails.weightlb / 2.205) ;
        userDetails.currentFatMass = (userDetails.weightkg * (userDetails.bodyFatPerc/100));
        userDetails.currentFatFreeMass = (userDetails.weightkg - userDetails.currentFatMass);
        userDetails.targetWeightLosskg = (userDetails.weightkg * (userDetails.targetWeightLossPerc/100));
        userDetails.targetBodyWeightkg = (userDetails.weightkg - userDetails.targetWeightLosskg);
        userDetails.newFatMass = (userDetails.currentFatMass - userDetails.targetWeightLosskg);
        userDetails.targetBodyFatPerc = ((userDetails.newFatMass / userDetails.targetBodyWeightkg)*100);

        if (sex === 'Male') {
            userDetails.stepsPerDay = ((39377.3357744) / (Math.pow(userDetails.targetBodyFatPerc, 1.304048257)))
         
        } else if (sex === 'Female') {
            userDetails.stepsPerDay = ((261425.44) / (Math.pow(userDetails.targetBodyFatPerc, 1.87969924)))
          
        }
        
        setResult(userDetails.totalStepTarget = (userDetails.stepsPerDay * userDetails.currentFatMass))

        setAgeError(false)
        setSexError(false)
        setHeightError(false)
        setWeightError(false)
        setBodyFatError(false)
        setTargetWeightError(false)   
    };

    return (
       
        <div className='PatientDetails'>
            <Navbar />
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
                            (ageError) && <div style={{color: 'red'}} className='error'>You must select a valid age</div>   
                        }    
                        <div className='inputSection'>
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
                            (sexError) && <div style={{ color: 'red' }} className='error'>You must select a valid sex</div>
                        }
                       <p> Enter all calculations below to the nearest tenths place (e.g. 250.5, 22.0)</p>
                        <div className='inputSection'>
                            <label htmlFor='height'>Height(cm)</label>
                            <input id='height' type='number' placeholder='cm' onChange={(e) => handleHeightChange(e)} /> 
                        </div>
                        {
                            (heightError) && <div style={{ color: 'red' }} className='error'>You must select a valid height</div>
                        }
                       
                        <div className='inputSection'>
                            <label htmlFor='weight'>Weight(lb)</label>
                            <input id='weight' type='number' placeholder='lb' onChange={(e) => handleWeightChange(e)} /> 
                        </div>
                        {
                            (weightError) && <div style={{ color: 'red' }} className='error'>You must select a valid weight</div>
                        }
                       
                        <div className='inputSection'>
                            <label form='bodyFatPerc'>Body Fat %</label>
                            <input id='bodyFatPerc' type='number' placeholder='%' onChange={(e) => handleBodyFatChange(e)} />
                        </div>
                        {
                            (bodyFatError) && <div style={{ color: 'red' }} className='error'>You must select a valid body fat %</div>
                        }

                        <p>For Target Weight Loss, please choose a number between 5% through 10% </p>
                        <div className='inputSection'>
                            <label form='targetWeightLossPerc'>Target Weight Loss %</label>
                            <input id='targetWeightLossPerc' type='number' placeholder='%' onChange={(e) => handleTargetWeightChange(e)} />
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

