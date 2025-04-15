import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import './EmployeeInterface.css';

const EmployeeInterface = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gestion de la déconnexion
  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    navigate('/'); // Redirige vers la page d'accueil après déconnexion
  };

  if (!currentUser || currentUser.role !== 'employee') {
    navigate('/connexion'); // Redirige vers la connexion si l'utilisateur n'est pas un employé
    return null;
  }

  return (
    <div className="employee-interface">
      <h1>Bienvenue, {currentUser.firstName} {currentUser.lastName}</h1>
      <p>Email : {currentUser.email}</p>
      <p>Téléphone : {currentUser.phoneNumber}</p>
      <p>Adresse : {currentUser.address}</p>

      <div className="tasks-section">
        <h2>Vos tâches du jour</h2>
        {/* Liste des tâches (à implémenter plus tard) */}
        <p>Aucune tâche assignée pour le moment.</p>
      </div>

      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default EmployeeInterface;
