import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import '../Css/DataAdmin.css';
import 'react-datepicker/dist/react-datepicker.css';

function DataAdmin (){
    const [startDate, setStartDate] = useState(null);
    const [endDate,   setEndDate]   = useState(null);

    function handleExcelExport() {
        alert('Export Successful');
        window.location.reload();
      }

    return (
        <div className='DataAdmin'>
            <div className='title'>
            <h1>Data Admin</h1>
            </div>

            <div className='startDate'>
            <h3>Select Start Date</h3>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            
            <div className='endDate'>
            <h3>Select End Date</h3>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            </div>
            
            <div className='exportExcel'>
            <button onClick={handleExcelExport}>Export to Excel</button>
            </div>
        </div>
    );
}

export default DataAdmin;