import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Resources from './Resources'
import PatientDetails from './PatientDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/details' element={<PatientDetails />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
