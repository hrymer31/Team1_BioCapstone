import React, { useState } from 'react';
import './App.css';

function EmailReminderPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [timezone, setTimezone] = useState('UTC');

  function handleToggleEnabled() {
    setIsEnabled(!isEnabled);
  }

  function handleReminderTextChange(event) {
    setReminderText(event.target.value);
  }

  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }

  function handleTimezoneChange(event) {
    setTimezone(event.target.value);
  }

  function handleSaveChanges() {
    alert('Changes saved successfully!');
    window.location.reload();
  }

  return (
    
    <div>
      <h1>Email Reminders</h1>
      <label>
        <input type="checkbox" checked={isEnabled} onChange={handleToggleEnabled}  />
        Enable email reminders
      </label>
      <br />
      <label>
        Reminder text:
        <input type="text" value={reminderText} onChange={handleReminderTextChange} />
      </label>
      <br />
      <label>
        Email frequency:
        <select value={frequency} onChange={handleFrequencyChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <br />
      <label>
        Timezone:
        <select value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="CST">CST</option>
          <option value="PST">PST</option>
        </select>
      </label>
      <br />
      <button onClick={handleSaveChanges}>Save Changes</button>
      
    </div>
  );
}

export default EmailReminderPage;
