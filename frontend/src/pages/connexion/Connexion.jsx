import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../store/slice/userSlice';
import './Connexion.css';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const result = await dispatch(signin({ email, password })).unwrap();
    console.log('Utilisateur connecté :', result);

    // Redirection selon le rôle
    if (result.user.role === 'admin') {
      navigate('/dashboard');
    } else if (result.user.role === 'employee') {
      navigate('/home');
    } else {
      setError('Rôle utilisateur non reconnu.');
    }
  } catch (err) {
    setError(err || 'Erreur lors de la connexion.');
  }
};



  return (
    <div className="connexion-container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} className="connexion-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">Se connecter</button>
      </form>
    </div>
  );
};

export default Connexion;
