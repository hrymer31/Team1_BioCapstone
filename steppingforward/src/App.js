import logo from './logo.svg';
import './Css/App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Resources from './Pages/Resources'
import PatientDetails from './Pages/PatientDetails';
import EmailReminderPage from './Pages/EmailReminderPage';
import DataAdmin from './Pages/DataAdmin';
import WellstarLogin from './Pages/WellstarLogin';
import SignUp from './Pages/SignUp'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/details'   element={<PatientDetails />}/>
          <Route path='/reminders' element={<EmailReminderPage />} />
          <Route path='/admin'     element={<DataAdmin/>}/>
          <Route path='/wellstar'  element={<WellstarLogin/>}/>
          <Route path='/signup'    element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
