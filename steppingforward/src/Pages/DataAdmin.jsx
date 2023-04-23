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
    const [y,         setYValue]    = useState(null);
    const [x,         setXValue]    = useState(null);
    const [R,         setRValue]    = useState(null);
    const [patientCollection, setPatientCollection] = useState([{}])
    const dataParams ={
        dateS: startDate,
        dateE: endDate 
    }

    function exportExcel(excelData,fileName){
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet(excelData);
        //add data to workbook
        utils.book_append_sheet(workbook,worksheet, fileName)
        //save file
        writeFile(workbook, fileName +".xlsx"); 
    }

    async function handleExcelExport() {
        if(startDate === undefined || endDate === undefined){
            console.log('start or end date is null')
        } else {
            //fetches data from database between selected dates
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
            //this gets date for export file name
            const today = new Date().toISOString()
            let formattedToday = moment(today).format('MM-YY')
            //begins export
           exportExcel(patientCollection,"PatientExport " + formattedToday);          
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