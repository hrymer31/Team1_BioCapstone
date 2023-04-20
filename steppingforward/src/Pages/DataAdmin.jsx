import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import '../Css/DataAdmin.css';
import {utils, writeFile} from 'sheetjs-style';
import 'react-datepicker/dist/react-datepicker.css';

function DataAdmin() {
    const [startDate, setStartDate] = useState(null);
    const [endDate,   setEndDate]   = useState(null);
    const [y,         setYValue]    = useState(null);
    const [x,         setXValue]    = useState(null);
    const [R,         setRValue]    = useState(null);
    const userData = {
        patientID: '',
        currentWeight: '',
        endOfStudyWeight: '',
        targetStepCount: '',
        weeklyStepCount: '',
        date: '',
        age: '',
        sex: '',
        race: ''
      }

    function handleExcelExport(event) {
        if(event.onClick == true)
        {
        if(startDate === undefined || endDate === undefined){
            console.log('start or end date is null')
          } else {
            fetch('api/patientsresults/'+ startDate + endDate, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              }
            }).then(response => 
              response.clone().json()
          ).then((data) => {
              userData.patientID        = data[0].patientID;
              userData.currentWeight    = data[0].currentWeight;
              userData.endOfStudyWeight = data[0].endOfStudyWeight;
              userData.targetStepCount  = data[0].targetStepCount;
              userData.weeklyStepCount  = data[0].weeklyStepCount;
              userData.date             = data[0].date;
              userData.age              = data[0].age;
              userData.sex              = data[0].sex;
              userData.race             = data[0].race;
          })
        }
        //create Excel workbook and worksheet
        let workbook = utils.book_new(),
        worksheet = utils.json_to_sheet(userData);
        //add data to workbook
        utils.book_append_sheet(workbook,worksheet, "DataExport")
        //save file
        writeFile(workbook, "DataExport.xlsx");
    }
    }
    function handleYTextChange(event) {
        setYValue(event.target.value);
    }

    function handleXTextChange(event) {
        setXValue(event.target.value);
    }

    function handleRTextChange(event) {
        setRValue(event.target.value);
    }

    function handleEquationSubmit() {
        alert('Submit Successful');
        window.location.reload();
    }

    return (
        <div className='Admin'>

            <Box marginTop={10} marginBottom={10}
                className='adminBox'
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: 800,
                    overflow: 'auto',
                    borderRadius: 2
                }}>

                <h5 className='adminTitle'>Data Admin</h5>

                <div className="adminForm">
                    <p>Start Date:</p>
                    <div className='adminInputSection'>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>

                    <p>Select End Date:</p>
                    <div className='adminInputSection'>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                    </div>

                    <Box textAlign={'center'} marginTop={5}>

                        <Button variant="outlined" onClick={handleExcelExport}>Export to Excel</Button>

                    </Box>

                    <p>Age range equation:</p>

                    <div className='adminInputSection'>
                        <label htmlFor="y">y =</label>
                        <input type="text" value={y} onChange={handleYTextChange} />
                    </div>

                    <div className='adminInputSection'>
                        <label htmlFor="x">x exponent =</label>
                        <input type="text" value={x} onChange={handleXTextChange} />
                    </div>

                    <div className='adminInputSection'>
                        <label htmlFor="R">R =</label>
                        <input type="text" value={R} onChange={handleRTextChange} />
                    </div>

                    <Box textAlign={'center'} marginTop={5}>
                        <Button variant="outlined" onClick={handleEquationSubmit}>Submit to Database</Button>
                    </Box>
                </div>
            </Box>
        </div>

    );
}

export default DataAdmin;