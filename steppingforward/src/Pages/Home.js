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
                    We have a few things to note before stepping forward. 
                    First, only your steps and weight will be monitored for the next 12 months. 
                    Second, Dr. Robert Buresh created the equation to calculate the steps needed for weight loss. 
                    Lastly, happy stepping.</p>
                    </FormControl>

                    </Box>
            </div>
     

    )
}

export default Home;
