import React , {useEffect, useState} from 'react'
import Quotes from '../InspirationalQuotes';
import result from './PatientDetails';
import '../Css/dashboard.css'
import { Box } from '@mui/system';
import Link from '@mui/material/Link'
import Navbar from './Navbar';
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Modal
} from '@mui/material'
import { UserAuth } from "./AuthContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 300
};

const Dashboard = () => {
  const { user } = UserAuth();
  const [userDetails, setUserDetails] = useState({})
  const [results, setResults] = useState()
  const [currentWeight, setCurrentWeight] = useState()
  const [currentStepCount, setCurrentStepCount] = useState()
  const [stepDate, setStepDate] = useState()
  const [todayDate, setTodayDate] = useState()

  const [updateWeight, setUpdateWeight] = useState()
  const handleWeightOpen = () => setUpdateWeightOpen(true)
  const handleWeightClose = () => setUpdateWeightOpen(false)
  const [updateWeightOpen, setUpdateWeightOpen] = useState(false)
  
  const [updateSteps, setUpdateSteps] = useState()
  const [updateStepsOpen, setUpdateStepsOpen] = useState(false)
  const handleStepsOpen = () => setUpdateStepsOpen(true)
  const handleStepsClose = () => setUpdateStepsOpen(false)

  const todaysSteps = { //used to get users steps for the day
    date: todayDate,
    uid: user.uid
  }
  const addUserSteps = { //used to set steps
    uid: user.uid,
    date: (stepDate),
    stepCount: 0,
  }

  function getDate(){ //gets and formats todays date
    const date = new Date().toISOString().slice(0, 10);
    setTodayDate(date) 
  }

  function getPatientDetails(){
    fetch('/api/patients/' + user.uid, { //getting user details
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(
      response => response.clone().json()
    ).then(
      data => {
        setUserDetails(data[0])
        setResults(data[0].totalStepTarget)
        setCurrentWeight(data[0].currentWeight)
      }
    )
  }
  
  function getPatientSteps(){
    fetch('/api/patients/getSteps/' + JSON.stringify(todaysSteps), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(
      response => response.clone().json()
    ).then(
      data => {
        //console.log(data)
        if(data.length === 0){
          setCurrentStepCount(0)
        } else {
          setCurrentStepCount(data[0].stepCount)
        }
      }
    )
  }

  useEffect(() => {
    getPatientDetails()
    getDate(todaysSteps)
    getPatientSteps()
  }, [user, userDetails])
  
  function handleWeightChange(){ //updates current weight
    setUserDetails({ ...userDetails }, userDetails.currentWeight = Number(updateWeight))
    fetch("api/patients/addDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails)
    }).then((response) => {
      console.log(response.statusText)
    }) 
    handleWeightClose()
  }

  function handleDate(e){ //formats date and sets value
    let formattedDate = moment(e.$d).format('YYYY-MM-DD')
    setStepDate(formattedDate) 
  }

  function handleStepUpdate(){ //this adds and updates step count
    addUserSteps.stepCount = Number(updateSteps) + currentStepCount
    addUserSteps.accessCode = userDetails.accessCode
    if(currentStepCount === 0){ //if there is no step count today 
      setCurrentStepCount(addUserSteps.stepCount)
      fetch("api/patients/addSteps", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(addUserSteps)
      }).then((response) => {
        console.log(response.statusText)
      })
    } else { //if there is already step count for today
      setCurrentStepCount(addUserSteps.stepCount)
      fetch("api/patients/updateSteps", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(addUserSteps)
      }).then((response) => {
        console.log(response.statusText)
      })
    }
    handleStepsClose()
  }
  return (
    <>
      <Navbar />
      <div className='quote'> <Quotes /> </div>
      <Box
        className="dashboard"
        sx={{
          backgroundColor: 'white',
          width: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 350,
          overflow: 'auto',
          borderRadius: 2
        }}>
        <FormControl
          fullWidth
          sx={{
            display: 'flex'
          }}
        >
          <h5 className='dashTitle'>Your Results: </h5>
          <div className='dashSections'>
            <Box className="dashboardBox steps">
              <p> Current Step Count:{currentStepCount}</p>
            </Box>
            <Box className="dashboardBox steps">
              <p> Your Current Weight:  <span>{currentWeight}lbs</span></p>
            </Box>
            <Box className="dashboardBox weight">
              <p> Prescribed Steps: {results}</p>
            </Box>
            <Button
              onClick={handleStepsOpen}
            >
              Add Steps
            </Button>
            <Button
              onClick={handleWeightOpen}
            >
              Update Weight
            </Button>
          </div>
        </FormControl>
        <Modal
          open={updateWeightOpen}
          onClose={handleWeightClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="Modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Weight
            </Typography>
            <TextField
              id="standard-number weight"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard" 
              onChange={e => setUpdateWeight(Number(e.target.value))} 
            />
            <Button
              onClick={handleWeightChange}
            >
              Enter
            </Button>
          </Box>
        </Modal>
        <Modal
          open={updateStepsOpen}
          onClose={handleStepsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="Modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Steps
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={e => handleDate(e)}/>
            </LocalizationProvider>
            <TextField
              id="standard-number"
              label="Enter Steps"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => setUpdateSteps(e.target.value)}
            />
            <Button
              onClick={handleStepUpdate}
            >
              Enter
            </Button>
          </Box>
        </Modal>
      </Box>
    
    </>
  );
}
export default Dashboard;
