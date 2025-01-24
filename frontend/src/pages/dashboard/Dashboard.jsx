import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import EmployesAdd from './Employes/EmployesAdd'; // Page pour ajouter un employé
import EmployesEdit from './Employes/EmployesEdit'; // Page pour modifier un employé
import EmployesPlanning from './Employes/EmployesPlanning'; // Page pour assigner un planning
import DevisRecu from './Devis/DevisRecu';
import ContactsRecu from './Contacts/ContactsRecu';
import AdminAccounts from './Admins/AdminAccounts'; // Page pour gérer les admins
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          {/* Routes pour les employés */}
          <Route path="employes/add" element={<EmployesAdd />} /> {/* Ajouter un employé */}
          <Route path="employes/edit" element={<EmployesEdit />} /> {/* Modifier un employé */}
          <Route path="employes/planning" element={<EmployesPlanning />} /> {/* Assigner un planning */}

          {/* Autres routes */}
          <Route path="devis" element={<DevisRecu />} />
          <Route path="contacts" element={<ContactsRecu />} />
          <Route path="admins" element={<AdminAccounts />} /> {/* Gérer les admins */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
