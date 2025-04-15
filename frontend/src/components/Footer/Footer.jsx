import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/particulier">Particuliers</Link></li>
            <li><Link to="/professionnel">Professionnels</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>À propos</h3>
          <ul>
            <li><Link to="/qui-sommes-nous">Qui sommes-nous ?</Link></li>
            <li><Link to="/contact">Contactez-nous</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Yasli. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;