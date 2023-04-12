import React from 'react'
import '../Css/Resources.css'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Link from '@mui/material/Link'
import { Box } from '@mui/system';
import Navbar from './Pages/Navbar';

 const Resources = () => {
    return (
        <div className='Resources'> 
        <Navbar />
            <h5 className='title'>Resources</h5>
            <div className='sections'>
                <Box className="resourceBox step">
                    <div className='steps'>
                        <DirectionsWalkIcon className='resourcesIcon'></DirectionsWalkIcon>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://blog.myfitnesspal.com/ways-to-add-1000-more-steps-to-your-day/'
                        >15 Ways to Add 1,000 More Steps</Link>
                        <Link
                            className='link' 
                            target={'_blank'}
                            href='https://www.piedmont.org/living-better/30-easy-ways-get-more-steps-each-day'
                        >30 easy ways to get more steps each day </Link>
                        <Link
                            className='link'
                            target={'_blank'} 
                            href='https://www.eatthis.com/fun-ways-to-lose-weight/'
                        >35 fun activies that dont feel like exercise</Link>
                    </div>
                </Box>
                <Box className="resourceBox water">
                    <div className='water'>
                        <LocalDrinkIcon className='resourcesIcon'></LocalDrinkIcon>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://hub.jhu.edu/at-work/2020/01/15/focus-on-wellness-drinking-more-water/#:~:text=Science%20suggests%20that%20water%20can,to%20results%20on%20the%20scale.'
                        >How drinking more water can help you lose more weight</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://www.waterlogic.com/en-gb/resources/blog/ten-ways-make-drinking-water-interesting/'
                        >10 ways to make drinking water more interesting</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://www.health.harvard.edu/staying-healthy/how-much-water-should-you-drink'
                        >How much water should you drink a day?</Link>
                    </div>
                </Box>
                <Box className="resourceBox food">
                    <div className='food'>
                        <RestaurantIcon className='resourcesIcon'></RestaurantIcon>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://gatheringdreams.com/easy-healthy-meal-prep-ideas-30-minutes/'
                        >25+ Simple Meal Prep Ideas for Weight Loss</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://www.healthline.com/nutrition/how-to-meal-prep'
                        >How to Meal Prep</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href='https://www.cdc.gov/nccdphp/dnpao/features/healthy-eating-tips/index.html'
                        >Tips for eating healthier</Link>
                    </div>
                </Box>    
                <Box className="resourceBox article">
                    <div className='article'>
                        <NewspaperIcon className='resourcesIcon'></NewspaperIcon>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href="https://bmjopen.bmj.com/content/7/3/e011843.long"
                        >Association between physical activity and body fat percentage...</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-015-1381-6"
                        >The association between daily steps and health...</Link>
                        <Link 
                            className='link'
                            target={'_blank'}
                            href="https://journals.lww.com/acsm-msse/Fulltext/2004/05000/Relationship_between_Accumulated_Walking_and_Body.26.aspx"
                        >Relationship between Accumulated Walking and Body Composition in Middle-Aged Women</Link>
                    </div>
                </Box>
            </div>
        </div>
    )
 }
 export default Resources;
 
 
    