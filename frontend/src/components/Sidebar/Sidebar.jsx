import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faFileInvoice,
  faEnvelope,
  faUserCog,
  faCalendarCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);

  const toggleEmployeesMenu = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
        <span className="sidebar-title-text">{t('dashboard.title')}</span>
      </h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <div className="sidebar-item-header" onClick={toggleEmployeesMenu}>
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <span className="sidebar-item-text">{t('dashboard.employees')}</span>
            <FontAwesomeIcon
              icon={isEmployeesOpen ? faChevronUp : faChevronDown}
              className="sidebar-chevron"
            />
          </div>
          {isEmployeesOpen && (
            <ul className="sidebar-submenu">
              <li>
                <NavLink
                  to="/dashboard/employes/add"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  {t('dashboard.add_employee')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employes/edit"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  {t('dashboard.edit_employee')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employes/planning"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  {t('dashboard.assign_planning')}
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/devis"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faFileInvoice} className="sidebar-icon" />
            <span className="sidebar-item-text">{t('dashboard.devis')}</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/contacts"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span className="sidebar-item-text">{t('dashboard.contacts')}</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/admins"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faUserCog} className="sidebar-icon" />
            <span className="sidebar-item-text">{t('dashboard.admins')}</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/reservations"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
            <span className="sidebar-item-text">{t('dashboard.reservations')}</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;