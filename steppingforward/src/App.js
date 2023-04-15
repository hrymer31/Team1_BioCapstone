import logo from './logo.svg';
import './Css/App.css';
import './Css/contactForm.css';
import { Routes, Route } from "react-router-dom";
import Resources from './Pages/Resources'
import { AuthProvider } from "./Pages/AuthContext";
import PatientDetails from './Pages/PatientDetails';
import contactForm, { ContactUs } from './Pages/contactForm';
import DataAdmin from './Pages/DataAdmin';
import SignUp from './Pages/SignUp'
import Goals from './Pages/Goals'
import Dashboard from './Pages/Dashboard'
import ageCheck from './Pages/ageCheck'
import Disqualify from './Pages/disqualify.js';
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile'
import Home from "./Pages/Home.js";

function App() {
  return (
    <>
     <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home'  element={<Dashboard />} />
            <Route path='/resources' element={<Resources/>}/>
            <Route path='/details'   element={<PatientDetails />}/>
            <Route path='/goals'   element={<Goals />}/>
            <Route path='/reminders' element={<contactForm />} />
            <Route path='/admin'     element={<DataAdmin/>}/>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/signup'    element={<SignUp />} />
            <Route path='/contactForm' element={<ContactUs />} />
            <Route path='/ageCheck' element={<ageCheck/>} />
            <Route path='/disqualify' element={<Disqualify/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path = '/edit' element = {<EditProfile/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
