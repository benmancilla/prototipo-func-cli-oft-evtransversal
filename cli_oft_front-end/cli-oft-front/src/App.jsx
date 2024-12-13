import { useState } from 'react';
import './App.css';
import './assets/styles/login.css';
import './assets/styles/exams.css';
import './assets/styles/patients.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import PrivateRoute from './components/private-route';
import Dashboard from './components/dashboard';
import Exams from './components/exams';
import Patients from './components/patients';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <h2>Prototipo funcionalidades</h2>
        <Routes>

          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/exams" element={<Exams />} /> 
            <Route path='/patients' element={<Patients />}/>
          
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
