import React from 'react'
import './Resources.css'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Link from '@mui/material/Link'

 const Resources = () => {
    return (
        <div className='Resources'> 
            <span className='title'>Resources</span>
            <div className='sections'>
                <div className='steps'>
                    <DirectionsWalkIcon className='resourcesIcon'></DirectionsWalkIcon>
                    <Link href='#'>8 ways to sneak in steps!</Link>
                    <Link href='#'>30 easy ways to get more steps each day </Link>
                    <Link href='#'>35 fun activies that dont feel like exercise</Link>
                </div>
                <div className='water'>
                    <LocalDrinkIcon className='resourcesIcon'></LocalDrinkIcon>
                    <Link href='#'>How drinking more water can help you lose more weight</Link>
                    <Link href='#'>10 ways to make drinking water more interesting</Link>
                    <Link href='#'>How much water should you drink a day?</Link>
                </div>
                <div className='food'>
                    <RestaurantIcon className='resourcesIcon'></RestaurantIcon>
                    <Link href='#'>20+ Simple Meal Prep Ideas for Weight Loss</Link>
                    <Link href='#'>How to Meal Prep</Link>
                    <Link href='#'>Tips for eating healthier</Link>
                </div>
            </div>
        </div>
    )
 }
 export default Resources;
 
 
    