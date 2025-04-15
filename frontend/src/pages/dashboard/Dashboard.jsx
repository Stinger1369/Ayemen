import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import EmployesAdd from './Employes/EmployesAdd';
import EmployesEdit from './Employes/EmployesEdit';
import EmployesPlanning from './Employes/EmployesPlanning';
import DevisRecu from './Devis/DevisRecu';
import ContactsRecu from './Contacts/ContactsRecu';
import AdminAccounts from './Admins/AdminAccounts';
import ReservationsRecu from './Reservation/ReservationsRecu';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="employes/add" element={<EmployesAdd />} />
          <Route path="employes/edit" element={<EmployesEdit />} />
          <Route path="employes/planning" element={<EmployesPlanning />} />
          <Route path="devis" element={<DevisRecu />} />
          <Route path="contacts" element={<ContactsRecu />} />
          <Route path="admins" element={<AdminAccounts />} />
          <Route path="reservations" element={<ReservationsRecu />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;