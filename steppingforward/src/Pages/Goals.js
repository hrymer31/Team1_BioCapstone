import React, { useState, useRef, useEffect } from 'react';
import GoalList from './GoalHelper/GoalList'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import "../Css/Goals.css";
import Navbar from './Navbar';

const LOCAL_STORAGE_KEY = 'goalApp.goals'

function Goals() {
  const [goals, setGoals] = useState([])
  const goalNameRef = useRef()

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedGoals) setGoals(storedGoals)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals))
  }, [goals])

  function toggleGoal(id) {
    const newGoals = [...goals]
    const goal = newGoals.find(goal => goal.id === id)
    goal.complete = !goal.complete
    setGoals(newGoals)
  }

  function handleAddGoal(e) {
    const name = goalNameRef.current.value
    if (name === '') return
    setGoals(prevGoals => {
      return [...prevGoals, { id: uuidv4(), name: name, complete: false }]
    })
    goalNameRef.current.value = null
  }

  function handleClearGoals() {
    const newGoals = goals.filter(goal => !goal.complete)
    setGoals(newGoals)
  }

  return (
    <div className="Goals">
      <Navbar />
      <Box marginTop={10} marginBottom={10}
        className='goalsBox'
        sx={{
          backgroundColor: 'white',
          width: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
          minHeight: 350,
          height: 'auto',
          overflow: 'auto',
          borderRadius: 2
        }}>
        <div className="goalsTitle">Your Daily Goals:</div>

        <div className = "goalContent">

        <label htmlFor = "Goal">New goal:</label>
        <input ref={goalNameRef} type="text" />

        </div>

        <div className = "goalContent">
        <Button variant = "outlined" sx={{ ":hover": { bgcolor: "rgb(161, 252, 134,0.2)" } }} onClick={handleAddGoal}>Add Goal</Button>
        <Button variant = "outlined" sx={{ ":hover": { bgcolor: "rgb(252, 83, 83,0.2)" } }} onClick={handleClearGoals}>Clear Complete</Button>
        </div>
        <div className = "goalSubtitle">{goals.filter(goal => !goal.complete).length} Goals Left to Complete</div>

        <div className = "goalContent">
        <GoalList goals={goals} toggleGoal={toggleGoal} />
        </div>

      </Box>
    </div>
  )
}

export default Goals;
