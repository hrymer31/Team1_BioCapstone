import React from 'react'
import HomeHeader from "./HomeHeader";
import '../Css/Home.css'
import { Box } from '@mui/system';
import { 
    FormControl, 
 } from '@mui/material';
import ksulogo from '../images/ksulogo.png';
import wellstarlogo from '../images/wellstar-logo.png';

const Home = () => {
    return (
        <>
        <div  className="Home">
           
                <HomeHeader />
                <Box 
                className='box'
                sx={{
                    backgroundColor: 'white', 
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 5,
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

                        <h2 style={{ 'display': 'flex', 'justifyContent': 'center' }}>Welcome to Stepping Forward</h2>
                        <p style={{'margin': 5}}>
                            Hi, thank you so much for joining Stepping Forward.
                        </p>
                        <p style={{ 'margin': 5 }}>
                            We hope this helps aid you on your weight loss journey. 
                            We have a few things to note before "stepping forward.": 
                        </p>
                        <p style={{ 'margin': 5 }}> 
                            First, the step count, starting weight, and weight loss achieved will be occasionally monitored and recorded for up to twelve months 
                        </p>
                        <p style={{ 'margin': 5 }}>
                            Second, Dr. Robert Buresh created the equation to calculate the steps needed for weight loss 
                            and suggest that you only update your current weight every 2 to 3 months or after appoinment with your medical professional. 
                        </p>
                        <p style={{ 'margin': 5 }}>
                            Lastly, happy stepping.
                        </p>
                    </FormControl>
                </Box>

                <div style={{'display': 'flex','flexDirection': 'column', 'flexWrap': 'wrap', 'alignContent': 'center'}}>
                    <div style={{'display': 'flex', 'alignItems': 'center'}}>
                        <span style={{'fontSize': 18}}>Brought To You By</span>
                        <img src={ksulogo} alt="KSU" width='300px' height='150px'/>
                    </div>
                    <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginLeft': 50, 'marginTop': -60}}>
                        <span style={{ 'fontSize': 18}}>In Partnership With</span>
                        <img src={wellstarlogo} alt="KSU" width='250px' height='150px' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
