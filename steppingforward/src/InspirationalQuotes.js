 import React, { useState, useEffect } from 'react'
 import './Css/InspirationalQuotes.css'
 
const quotesArray = [
        "Remember why you started",
        "'You didn't gain all your weight in one day; you wont lose it in one day. Be patient with yourself' - Jenna Wolfe",
        "Stop saying tomorrow",
        "Excuses don't get results",
        "When you lose all excuses, you'll find results",
        "A goal without a plan, is just a wish",
        "'Eliminate the mindset of can't — because you can do anything' - Tony Horton",
        "'If you have discipline, drive, and determination… nothing is impossible' - Dana Linn Bailey",
        "'Most people give up right before the big break comes — don’t let that person be you'- Michael Boyle",
        "'If it doesn't challenge you, it doesn't change you'- Jenna Wolfe",
        "'Exercise should be regarded as a tribute to the heart' - Gene Tunney",
        "'Take care of your body. It’s the only place you have to live.' - Jim Rohn", 
        "'Do something today that your future self will thank you for.' - Sean Patrick Flanery",
        "You did not wake up today to be mediocre.",
        "'Motivation is what gets you started. Habit is what keeps you going.' - Jim Ryun",
        "'Your body can stand almost anything. It’s your mind that you have to convince.' - Andrew Murphy",
        "'Nobody who ever gave his best regretted it' - George Halas",
        "'The secret of getting ahead is getting started.' - Mark Twain",
        "No matter how slow you go you’re still lapping everyone on the couch."
]

const Quotes = () => {
    const [date, setDate] = useState()
    const [dailyQuote, setDailyQuote] = useState('')
    let currentDate = new Date().toJSON().slice(0, 10);

    if ((date === null) || (dailyQuote === '')){
        setDate(currentDate)

        var q = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        setDailyQuote(q)
    }

    return (
        <div className='Quotes'>
            {dailyQuote}
        </div>
    )
}
export default Quotes;