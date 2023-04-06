import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import '../Css/DataAdmin.css';
import 'react-datepicker/dist/react-datepicker.css';

function DataAdmin (){
    const [startDate, setStartDate] = useState(null);
    const [endDate,   setEndDate]   = useState(null);
    const [y,         setYValue]    = useState(null);
    const [x,         setXValue]    = useState(null);
    const [R,         setRValue]    = useState(null);

    function handleExcelExport() {
        alert('Export Successful');
        window.location.reload();
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

            <div className='ageRange'>
            <h3>Age range equation</h3>
            </div>

            <div className='ageRangeY'>
            <label>
            y=
            <input type="text" value={y} onChange={handleYTextChange} />
            </label>
            </div>

            <div className='ageRangeX'>
            <label>
            x-exponent 
            <input type="text" value={x} onChange={handleXTextChange} />
            </label>
            </div>

            <div className='ageRangeR'>
            <label>
            R=
            <input type="text" value={R} onChange={handleRTextChange} />
            </label>
            </div>

            <div className='submitEquation'>
            <button onClick={handleEquationSubmit}>Submit to Database</button>
            </div>
        </div>
    );
}

export default DataAdmin;