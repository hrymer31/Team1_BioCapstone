import React, { useState, useEffect } from 'react'
import Quotes from '../InspirationalQuotes';
import result from './PatientDetails';
import '../Css/dashboard.css'
import { Box } from '@mui/system';
import Link from '@mui/material/Link'
import Navbar from './Navbar';
import {
  FormControl,
  Button,
  TextField,
  Modal,
  Typography
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

  const [updateWeight, setUpdateWeight] = useState()
  const handleWeightOpen = () => setUpdateWeightOpen(true)
  const handleWeightClose = () => setUpdateWeightOpen(false)
  const [updateWeightOpen, setUpdateWeightOpen] = useState(false)
  
  const [updateSteps, setUpdateSteps] = useState()
  const [updateStepsOpen, setUpdateStepsOpen] = useState(false)
  const handleStepsOpen = () => setUpdateStepsOpen(true)
  const handleStepsClose = () => setUpdateStepsOpen(false)

  useEffect(() => {
    fetch('/api/patients/' + user.uid, {
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

  }, [user, userDetails])
  
  function handleWeightChange(){
    setUserDetails({ ...userDetails }, userDetails.currentWeight = Number(updateWeight))
    fetch("api/patients/addDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails)
    }).then((response) => {
      alert(response.statusText)
    }) 
  }
  function handleDate(e){ //this function is for adding step count
/*     console.log(e.$d)
    let formattedDate = moment(e.$d).format('MM/DD/YYYY')
    console.log(formattedDate)
    const date = new Date()
    let currentDay = String(date.getDate()).padStart(2, '0')
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0")
    let currentYear = String(date.getFullYear())
    let today = currentMonth + '/' + currentDay + '/' + currentYear
    console.log(today) */
  }
  return (
    <>
      <Navbar />
      <div className='quote'> <Quotes /> </div>
      <Box
        className="dashboard"
        sx={{
          backgroundColor: 'white',
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 400,
          overflow: 'auto',
          borderRadius: 2
        }}>
        <FormControl
          fullWidth
          sx={{
            display: 'flex'
          }}
        >
          <h1>Your Results: {results}</h1>

          <div className='sections'>
            <Box className="dashboardBox steps">

              <p> Current Step Count:   </p>
            </Box>

            <Box className="dashboardBox steps">

              <p> Your Current Weight:  <span>{currentWeight}lbs</span></p>
            </Box>
            <Box className="dashboardBox weight">

              <p> Prescribed Steps: </p>
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
            />
            <Button
              onClick={handleStepsOpen}
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
