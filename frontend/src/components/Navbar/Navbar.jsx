import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/userSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    navigate('/'); // Redirige vers la page Home après déconnexion
  };

  const handleLogoClick = () => {
    navigate('/'); // Redirige vers la page Home lorsque le logo est cliqué
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <h1>Yasli</h1>
      </div>
      <div className="navbar-links">
        <NavLink to="/particulier" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Particulier
        </NavLink>
        <NavLink to="/professionnel" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Professionnel
        </NavLink>
        {/* Lien Dashboard visible uniquement pour les admins */}
       {currentUser ? (
  <>
    {currentUser.role === 'admin' && (
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
        Dashboard
      </NavLink>
    )}
    <button onClick={handleLogout}>Déconnexion</button>
  </>
) : (
  <NavLink to="/connexion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
    Connexion
  </NavLink>
)}

      </div>
    </nav>
  );
};

export default Navbar;
