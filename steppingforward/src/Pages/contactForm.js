import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import emailjs from 'emailjs-com';
import moment from 'moment-timezone';
import { faArrowRightFromBracket, faUser, faWeightScale, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import { UserAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

export const ContactUs = () => {
  const { user } = UserAuth();
  const form = useRef();
  const userData = {
    name: '',
    email: ''
  }

  const ContactForm = () => {
    const location = useLocation(); // get the current location object
    const email = location.state?.email;
  }


  useEffect(() => {
    if (user.uid === undefined) {
      console.log('user is null')
    } else {
      fetch('api/patients/' + user.uid, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response =>
        response.clone().json()
      ).then((data) => {
        userData.name = data[0].name;
        userData.email = data[0].email;
      })
    }
  }, [user])

  const sendEmail = (e) => {
    e.preventDefault();
  
    const formData = new FormData(form.current);
    const toEmail = formData.get('to_email');
  
    emailjs.sendForm('service_fuy3hz8', 'template_6hm8uge', form.current, 'EAlgO9m60ZlBwxMQ_', {to_email: toEmail})
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };
  

  return (
    <div className="Remind">

      <Navbar />

      <Box marginTop={10} marginBottom={10}
        className='remindBox'
        sx={{
          backgroundColor: 'white',
          width: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 475,
          overflow: 'auto',
          borderRadius: 2
        }}>

        <h5 className='remindTitle'>Email Reminders</h5>

        <form ref={form} onSubmit={sendEmail}>

          <div className = "remindForm">

            <div className = "remindInputSection">

          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="to_email"  />

          </div>

          <div className = "remindInputSection">

          <label>
            Enable email reminders
          </label>
          <input type="checkbox" name="email_reminders" value="true" />

          </div>

          <div className='remindInputSection'>

          <label>Email frequency:</label>
          <select name="email_frequency" onChange={(e) => { document.getElementById('emailFrequency').value = e.target.value; }}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          </div>

          <div className = "remindInputSection">

          <input type="hidden" id="emailFrequency" name="email_frequency" value="daily" />
          <label>Remind me to:</label>
          <select name="message">
            <option value="Remember to log your daily steps!">Remember to log your daily steps!</option>
            <option value="Don't skip entering your steps today!">Don't skip entering your steps today!</option>
            <option value="Don't neglect your progress - record your daily steps!">Don't neglect your progress - record your daily steps!</option>
          </select>

          </div>

          <Box textAlign={'center'} marginTop={5}>

          <Button variant = "outlined" type = "submit">Submit</Button>

          </Box>
          
          </div>

        </form>
      </Box>
    </div>
  );
};
