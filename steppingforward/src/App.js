import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Resources from './Resources'
import PatientDetails from './PatientDetails';
import EmailReminderPage from './EmailReminderPage';
import SignUp from './SignUp'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/details' element={<PatientDetails />}/>
          <Route path='/reminders' element={<EmailReminderPage />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
