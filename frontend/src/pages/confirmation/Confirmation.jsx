import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <h1>Confirmation</h1>
      <p>{state?.message || 'Votre demande a été enregistrée.'}</p>
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default Confirmation;