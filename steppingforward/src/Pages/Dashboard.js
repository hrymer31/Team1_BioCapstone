import React from 'react'
import Quotes from '../InspirationalQuotes';
import result from './PatientDetails';
import '../Css/dashboard.css'
import { Box } from '@mui/system';
import Link from '@mui/material/Link'
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <div className="Dashboard" id="outer-container">

        <Quotes />

        <div className='sections'>
          <Box className="dashboardBox steps">
           
            <p> Daily Step Count </p>
            </Box>
            <Box className="dashboardBox weight">
            
            <p> Current Weight </p>
            </Box>
        </div>
      </div>


    </>
  );
}



export default Dashboard;
