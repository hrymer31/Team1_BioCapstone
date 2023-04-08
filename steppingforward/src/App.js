import logo from './logo.svg';
import './Css/App.css';
import { Route, Routes } from "react-router-dom"
import Resources from './Pages/Resources'
import PatientDetails from './Pages/PatientDetails';
import EmailReminderPage from './Pages/EmailReminderPage';
import DataAdmin from './Pages/DataAdmin';
import WellstarLogin from './Pages/WellstarLogin';
import SignUp from './Pages/SignUp'
import Goals from './Pages/Goals'
import Dashboard from './Pages/Dashboard'


import Navbar from './Pages/Navbar';


function App() {
  return (
    <>
     <Navbar />
      <div className="container">
     
        <Routes>
      
          <Route path='/'/>
         
          <Route exact path='/home'  element={<Dashboard />} />
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/details'   element={<PatientDetails />}/>
          <Route path='/goals'   element={<Goals />}/>
          <Route path='/reminders' element={<EmailReminderPage />} />
          <Route path='/admin'     element={<DataAdmin/>}/>
          <Route path='/wellstar'  element={<WellstarLogin/>}/>
          <Route path='/signup'    element={<SignUp />} />
        </Routes>
    
      </div>
    </>
  );
}

export default App;
