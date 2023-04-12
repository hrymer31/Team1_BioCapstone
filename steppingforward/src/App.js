import logo from './logo.svg';
import './Css/App.css';
import './Css/contactForm.css';
import { Route, Routes } from "react-router-dom"
import Resources from './Pages/Resources'
import PatientDetails from './Pages/PatientDetails';
import contactForm, { ContactUs } from './Pages/contactForm';
import DataAdmin from './Pages/DataAdmin';
import WellstarLogin from './Pages/WellstarLogin';
import SignUp from './Pages/SignUp'
import Goals from './Pages/Goals'
import Dashboard from './Pages/Dashboard'
import ageCheck from './Pages/ageCheck'
import Disqualify from './Pages/disqualify.js';
import Login from './Pages/Login'



import Navbar from './Pages/Navbar';


function App() {
  return (
    <>
     <Navbar />
  
  
        
          <Routes> 
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/details" element={<PatientDetails />}></Route>
          <Route path='/goals'   element={<Goals />}/>
          <Route path='/contactForm' element={<contactForm />} />
          <Route path='/admin'     element={<DataAdmin/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/signup'    element={<SignUp />} />
          <Route path='/contactForm' element={<ContactUs />} />
          <Route path='/ageCheck' element={<ageCheck/>} />
          <Route path='/disqualify' element={<Disqualify/>} />
          </Routes>
       
  
    </>
  );
}

export default App;
