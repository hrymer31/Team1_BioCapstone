import React from 'react'
import Quotes from '../InspirationalQuotes';
import result from './PatientDetails';
import '../Css/dashboard.css'
import { Box } from '@mui/system';
import Link from '@mui/material/Link'
import Navbar from './Navbar';
import {
  FormControl,
  Button
} from '@mui/material'

const Dashboard = () => {
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
        <h5 className='dashTitle'>Your Results:</h5>

          <div className='dashSections'>
            <Box className="dashboardBox steps">

              <p> Current Step Count:   </p>
            </Box>

            <Box className="dashboardBox steps">

              <p> Your Current Weight:  </p>
            </Box>
            <Box className="dashboardBox weight">

              <p> Prescribed Steps: </p>
            </Box>
            <Button
            //onClick={update}
            >
              Add Steps
            </Button>

        
          <Button
          //onClick={handleClick}
          >
            Update Weight
          </Button>
          </div>
        </FormControl>
      
      </Box>
    
    </>
  );
}



export default Dashboard;
