 
import React, { useState } from 'react'
const quotesArray = [
        "Remember why you started",
        "'You didn't gain all your weight in one day; you wont lose it in one day. Be patient with yourself'- Jenna Wolfe",
        "Stop saying tomorrow",
        "Excuses don't get results",
        "When you lose all excuses, you'll find results",
        "A goal without a plan, is just a wish",
        "'Eliminate the mindset of can't — because you can do anything'- Tony Horton",
        "'If you have discipline, drive, and determination… nothing is impossible'- Dana Linn Bailey",
        "'Most people give up right before the big break comes — don’t let that person be you'- Michael Boyle",
        "'If it doesn't challenge you, it doesn't change you'- Jenna Wolfe",
        "'Exercise should be regarded as a tribute to the heart'- Gene Tunney",
]

const Quotes = () => {
    const [date, setDate] = useState(null)
    const [dailyQuote, setDailyQuote] = useState('')
    let currentDate = new Date().toJSON().slice(0, 10);

    if ((date = null) || (date != currentDate)){
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