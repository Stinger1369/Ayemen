import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCompass, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import RGPDConsent from '../RGPDConsent/RGPDConsent';
import './Footer.css';

const Footer = () => {
  const { t, ready } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>
            <FontAwesomeIcon icon={faCompass} className="footer-icon" />
            {ready ? t('footer.navigation.title') : 'Navigation'}
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/">{ready ? t('footer.navigation.home') : 'Accueil'}</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/particulier">{ready ? t('footer.navigation.individuals') : 'Particuliers'}</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/professionnel">{ready ? t('footer.navigation.professionals') : 'Professionnels'}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
            {ready ? t('footer.about.title') : 'À propos'}
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/qui-sommes-nous">{ready ? t('footer.about.who_we_are') : 'Qui sommes-nous ?'}</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/contact">{ready ? t('footer.about.contact_us') : 'Contactez-nous'}</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faCircle} className="footer-bullet" />
              <Link to="/politique-confidentialite">{ready ? t('footer.rgpd.privacy_policy') : 'Politique de confidentialité'}</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>
            <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
            {ready ? t('footer.follow_us.title') : 'Suivez-nous'}
          </h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon facebook-icon" />
              {ready ? t('footer.follow_us.facebook') : 'Facebook'}
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon twitter-icon" />
              {ready ? t('footer.follow_us.twitter') : 'Twitter'}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon instagram-icon" />
              {ready ? t('footer.follow_us.instagram') : 'Instagram'}
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{ready ? t('footer.bottom.copyright') : '© 2024 Yasli. Tous droits réservés.'}</p>
      </div>

      {/* Intégration de la bannière RGPD */}
      <RGPDConsent />
    </footer>
  );
};

export default Footer;