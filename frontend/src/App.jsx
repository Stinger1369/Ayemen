import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Connexion from './pages/connexion/Connexion';
import Particulier from './pages/part/Particulier';
import Professionnel from './pages/pro/Professionnel';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeInterface from './pages/employee/EmployeeInterface'; // Importer la nouvelle interface
import Home from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/particulier" element={<Particulier />} />
        <Route path="/professionnel" element={<Professionnel />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeeInterface />} /> {/* Nouvelle route */}
      </Routes>
    </Router>
  );
};

export default App;
