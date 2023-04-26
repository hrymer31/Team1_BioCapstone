import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import '../Css/DataAdmin.css';
import {utils, writeFile} from 'sheetjs-style';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Navbar from './Navbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function DataAdmin() {
    const [startDate, setStartDate] = useState(null);
    const [endDate,   setEndDate]   = useState(null);
    const [patientCollection, setPatientCollection] = useState([{}])
    const [stepCollection, setStepCollection] = useState([{}])
    const [disqualifiedCollection, setDisqualifiedCollection] = useState([{}])
    const [checked, setChecked] = useState(false)

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

        if(checked){
            const worksheet3 = utils.json_to_sheet(disqualifiedCollection)
            utils.book_append_sheet(workbook,worksheet3, 'Future Patients')
        }
        //save file
        writeFile(workbook, fileName +".xlsx"); //downloads workbook
    }
   
    async function handleExcelExport() {
        if(startDate === null || endDate === null){
            alert('start or end date is null')
            return
        } else {
            await Promise.all([
                //fetches patient details from database between selected dates
                fetch('api/patientsresults/' + JSON.stringify(dataParams), {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(
                    response => response.clone().json()
                ).then(
                    data => { setPatientCollection(data) }
                    //reformats dates into ISOString
                    //patientCollection.forEach((element) => {
                        //element.date = (element.date).slice(0, 10)
                   // })
                ),
                //fetches steps from database between selected dates
                fetch('api/patients/getAllSteps/' + JSON.stringify(dataParams), {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(
                    response => response.clone().json()
                ).then(
                    data => { setStepCollection(data) }
                    //reformats dates into ISOString
                    //stepCollection.forEach((element) => {
                       // element.date = (element.date).slice(0, 10)
                   // })
                ),
                //fetches disqualified patients from database
                fetch('api/allPatientsFuture', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(
                    response => response.clone().json()
                ).then(
                    data => { setDisqualifiedCollection(data) }
                )
            ])             
        }            
        //this gets date for export file name
        const today = new Date().toISOString()
        let formattedToday = moment(today).format('MM-YY')
        //begins export
        exportExcel("PatientExport " + formattedToday);   
    }

    function handleChange(){
        setChecked(current => !current)
    }
    return (
       
        <div className='Admin'>
            <Navbar />
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

                    <Box textAlign={'center'} marginTop={5} alignContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>

                        <Button variant="outlined" onClick={handleExcelExport}>Export to Excel</Button>  
                        <FormControlLabel
                            control={
                                <Checkbox checked={checked} name="disqualified" onChange={handleChange}/>
                            }
                            label="Include Sheet for Disqualified Patients Info"
                        />
                    </Box>                    
                </div>
            </Box>
        </div>

    );
}

export default DataAdmin;