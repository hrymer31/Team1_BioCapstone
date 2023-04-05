import React from 'react'
import '../Css/Resources.css'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Link from '@mui/material/Link'
import { Box } from '@mui/system';

 const Resources = () => {
    return (
        <div className='Resources'> 
            <h5 className='title'>Resources</h5>
            <div className='sections'>
                <Box className="resourceBox step">
                    <div className='steps'>
                        <DirectionsWalkIcon className='resourcesIcon'></DirectionsWalkIcon>
                        <Link 
                            href='https://blog.myfitnesspal.com/ways-to-add-1000-more-steps-to-your-day/'
                        >15 Ways to Add 1,000 More Steps</Link>
                        <Link 
                            href='https://www.piedmont.org/living-better/30-easy-ways-get-more-steps-each-day'
                        >30 easy ways to get more steps each day </Link>
                        <Link 
                            href='https://www.eatthis.com/fun-ways-to-lose-weight/'
                        >35 fun activies that dont feel like exercise</Link>
                    </div>
                </Box>
                <Box className="resourceBox water">
                    <div className='water'>
                        <LocalDrinkIcon className='resourcesIcon'></LocalDrinkIcon>
                        <Link 
                            href='https://hub.jhu.edu/at-work/2020/01/15/focus-on-wellness-drinking-more-water/#:~:text=Science%20suggests%20that%20water%20can,to%20results%20on%20the%20scale.'
                        >How drinking more water can help you lose more weight</Link>
                        <Link 
                            href='https://www.waterlogic.com/en-gb/resources/blog/ten-ways-make-drinking-water-interesting/'
                        >10 ways to make drinking water more interesting</Link>
                        <Link 
                            href='https://www.health.harvard.edu/staying-healthy/how-much-water-should-you-drink'
                        >How much water should you drink a day?</Link>
                    </div>
                </Box>
                <Box className="resourceBox food">
                    <div className='food'>
                        <RestaurantIcon className='resourcesIcon'></RestaurantIcon>
                        <Link 
                            href='https://gatheringdreams.com/easy-healthy-meal-prep-ideas-30-minutes/'
                        >25+ Simple Meal Prep Ideas for Weight Loss</Link>
                        <Link 
                            href='https://www.healthline.com/nutrition/how-to-meal-prep'
                        >How to Meal Prep</Link>
                        <Link 
                            href='https://www.cdc.gov/nccdphp/dnpao/features/healthy-eating-tips/index.html'
                        >Tips for eating healthier</Link>
                    </div>
                </Box>    
            </div>
        </div>
    )
 }
 export default Resources;
 
 
    