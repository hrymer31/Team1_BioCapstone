import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import moment from 'moment-timezone';
import { faArrowRightFromBracket,faUser,faWeightScale,faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Icons = () => {
    return (
        <div className="icon-button-container">
        <div>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x"/>
          <button>Log Out</button>
        </div>
        <div>
          <FontAwesomeIcon icon={faWeightScale} size="2x"/>
          <button>Update Weight</button>
        </div>
        <div>
          <FontAwesomeIcon icon={faShoePrints} size="2x"/>
          <button>Update Steps</button>
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} size="2x"/>
          <button>My account</button>
        </div>
      </div>
      
    );
  };

export const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fuy3hz8', 'template_6hm8uge', form.current, 'EAlgO9m60ZlBwxMQ_')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
     
    <form ref={form} onSubmit={sendEmail}>
      <label>Name:</label>
      <input type="text" name="user_name" />
      <label>Email Address:</label>
      <input type="email" name="user_email" />
      <label>Timezone:</label>
      <select name="timezone">
        {moment.tz.names().map(timezone => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
      <label>
        <input type="checkbox" name="email_reminders" value="true" />
        Enable email reminders
      </label>
      <label>Email frequency:</label>
      <select name="email_frequency" onChange={(e) => { document.getElementById('emailFrequency').value = e.target.value; }}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input type="hidden" id="emailFrequency" name="email_frequency" value="daily" />
      <label>Remind me to:</label>
      <textarea name="message" />
     
      <input type="submit" value="Send" />
 
      <Icons />
    </form>
  );
};
