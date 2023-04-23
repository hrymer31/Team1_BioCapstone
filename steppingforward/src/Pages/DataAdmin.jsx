import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import '../Css/DataAdmin.css';
import {utils, writeFile} from 'sheetjs-style';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function DataAdmin() {
    const [startDate, setStartDate] = useState(null);
    const [endDate,   setEndDate]   = useState(null);
    const [patientCollection, setPatientCollection] = useState([{}])
    const [stepCollection, setStepCollection] = useState([{}])
    const dataParams ={
        dateS: startDate,
        dateE: endDate 
    }

    function exportExcel(fileName){
        const workbook = utils.book_new(); //creates a new workbook
        const worksheet1 = utils.json_to_sheet(patientCollection); //transforms data into sheet
        const worksheet2 = utils.json_to_sheet(stepCollection)
        //add data to workbook
        utils.book_append_sheet(workbook,worksheet1, 'Details') //adds sheet to workbook
        utils.book_append_sheet(workbook,worksheet2, 'Steps')
        //save file
        writeFile(workbook, fileName +".xlsx"); //downloads workbook
    }

    async function handleExcelExport() {
        if(startDate === null || endDate === null){
            alert('start or end date is null')
        } else {
            //fetches patient details from database between selected dates
            fetch('api/patientsresults/' + JSON.stringify(dataParams), {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              }
              
            }).then(
                response => response.clone().json()
            ).then(
                data => {
                    setPatientCollection(data)
                }
            )
            //reformats dates into ISOString
            patientCollection.forEach((element) => {
                    element.date = moment(element.date).format('YYYY-MM-DD')
                }
            )
            //fetches steps from database between selected dates
            fetch('api/patients/getAllSteps/' + JSON.stringify(dataParams), {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(
                response => response.clone().json()
            ).then(
                data => {
                    console.log(data)
                    setStepCollection(data)
                }
            )
            //reformats dates into ISOString
            stepCollection.forEach((element) => {
                    element.date = moment(element.date).format('YYYY-MM-DD')
                }
            )
            //this gets date for export file name
            const today = new Date().toISOString()
            let formattedToday = moment(today).format('MM-YY')
            //begins export
           exportExcel("PatientExport " + formattedToday);          
        }
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
                    height: 500,
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
                </div>
            </Box>
        </div>

    );
}

export default DataAdmin;