import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/slice/userSlice';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Meteo from '../Meteo/Meteo';
import './Navbar.css';

const Navbar = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <h1>{t('navbar.logo')}</h1>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <NavLink
            to="/particulier"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('navbar.particulier')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/professionnel"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('navbar.professionnel')}
          </NavLink>
        </li>
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navbar.dashboard')}
                </NavLink>
              </li>
            )}
            <li>
              <button className="navbar-logout" onClick={handleLogout}>
                {t('navbar.deconnexion')}
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/connexion"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.connexion')}
            </NavLink>
          </li>
        )}
        <li>
          <Meteo />
        </li>
        <li>
          <LanguageSelector onMenuToggle={() => setIsMenuOpen(false)} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;