import React, { useState } from 'react';

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [frequency, setFrequency] = useState('daily');


  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }
  
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission here
  }

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <br />
      <label>
    Target Body Fat%:
        <select value={frequency} onChange={handleFrequencyChange}>
          <option value="daily">5</option>
          <option value="weekly">6</option>
          <option value="monthly">7</option>
          <option value="daily">8</option>
          <option value="weekly">9</option>
          <option value="monthly">10</option>
       
        </select>
      </label>
      <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RegistrationForm;

