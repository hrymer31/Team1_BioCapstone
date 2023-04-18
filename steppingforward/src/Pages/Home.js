import React from 'react'
import HomeHeader from "./HomeHeader";
import '../Css/Home.css'
import { Box } from '@mui/system';
import { 
    FormControl, 

 } from '@mui/material'

const Home = () => {
    return (
        <div  className="Home">
           
                <HomeHeader />
                <Box 
                className='box'
                sx={{
                    backgroundColor: 'white', 
                    width: 500,
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

                <h2>Welcome to Stepping Forward</h2>
                <p>Hi, thank you so much for joining Stepping Forward. 
                    We hope this helps aid you on your weight loss journey. 
                    We have a few things to note before "stepping forward."" 
                    First, the step count, starting weight, and weight loss achieved will be occasionally monitored and recorded for up to twelve months 
                    Second, Dr. Robert Buresh created the equation to calculate the steps needed for weight loss 
                    and suggest that you only update your current weight every 2 to 3 months or after appoinment with your medical professional. 
                    Lastly, happy stepping.
                </p>
                    </FormControl>

                    </Box>
            </div>
     

    )
}

export default Home;
