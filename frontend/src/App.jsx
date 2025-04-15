import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Connexion from './pages/connexion/Connexion';
import Particulier from './pages/part/Particulier';
import Professionnel from './pages/pro/Professionnel';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeInterface from './pages/employee/EmployeeInterface';
import Home from './pages/home/Home';
import ReservationForm from './pages/dashboard/Reservation/ReservationForm';
import Confirmation from './pages/confirmation/Confirmation';
import QuiSommesNous from './pages/qui-sommes-nous/QuiSommesNous';
import Contact from './pages/Contact/Contact';
import './App.css';


const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/particulier" element={<Particulier />} />
              <Route path="/professionnel" element={<Professionnel />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/employee" element={<EmployeeInterface />} />
              <Route path="/reservation" element={<ReservationForm />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default App;