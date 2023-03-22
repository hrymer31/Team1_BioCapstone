import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button';
  




function App() {


  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = ["Drink 40ozs of water", "Eat breakfast", "Leave 5 minutes earlier for work", "Complete daily steps", "Go to bed by 11", "Buy one new fruit at Publix", ];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="app">
  

      <div className="checkList">
        <div className="title">Your Daily Goals:</div>
        <div className="list-container">
        
  

          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
             
       
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Goals Completed Today: ${checkedItems}`}
      </div>
    </div>

 


  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
