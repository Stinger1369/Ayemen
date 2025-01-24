import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        {/* Employés avec sous-menus */}
        <li>
          <span>Employés</span>
          <ul className="sidebar-submenu">
            <li>
              <NavLink
                to="/dashboard/employes/add"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Ajouter un employé
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/employes/edit"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Modifier un employé
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/employes/planning"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Assigner un planning
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Autres menus */}
        <li>
          <NavLink
            to="/dashboard/devis"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Devis reçus
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/contacts"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Contacts reçus
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admins"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Gérer les comptes admins
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
