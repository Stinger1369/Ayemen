import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './RGPDConsent.css';

const RGPDConsent = () => {
  const { t, ready } = useTranslation();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    functionnel: false,
    statistiques: false,
    marketing: false,
  });
  const [cookiePreferences, setCookiePreferences] = useState({
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà donné son consentement
    const consentGiven = localStorage.getItem('rgpdConsent');
    if (!consentGiven) {
      setShowConsentModal(true);
    } else {
      // Récupère les préférences sauvegardées
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setCookiePreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      statistics: true,
      marketing: true,
    };
    localStorage.setItem('rgpdConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowConsentModal(false);
  };

  const handleRejectAll = () => {
    const preferences = {
      statistics: false,
      marketing: false,
    };
    localStorage.setItem('rgpdConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowConsentModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('rgpdConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowConsentModal(false);
  };

  const togglePreference = (type) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!showConsentModal) {
    return null;
  }

  return (
    <div className="rgpd-modal-overlay">
      <div className="rgpd-modal">
        <div className="rgpd-modal-content">
          <div className="rgpd-header">
            <h3>{ready ? t('rgpd.title') : 'Gérer le consentement aux cookies'}</h3>
            <button onClick={handleRejectAll} className="rgpd-close-button">✕</button>
          </div>
          <p>
            {ready ? t('rgpd.description') : 'Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer.'}
          </p>

          <div className="rgpd-preferences">
            {/* Fonctionnel */}
            <div className="preference-item">
              <div className="preference-header" onClick={() => toggleSection('functionnel')}>
                <span>{ready ? t('rgpd.preferences.functionnel.title') : 'Fonctionnel'}</span>
                <div className="header-right">
                  <span className="always-active">{ready ? t('rgpd.preferences.functionnel.always_active') : 'Toujours activé'}</span>
                  <FontAwesomeIcon
                    icon={expandedSections.functionnel ? faChevronUp : faChevronDown}
                    className="toggle-icon"
                  />
                </div>
              </div>
              {expandedSections.functionnel && (
                <p className="preference-description">
                  {ready ? t('rgpd.preferences.functionnel.description') : 'Le stockage ou l’accès technique est strictement nécessaire dans la finalité d’intérêt légitime de permettre l’utilisation d’un service spécifique explicitement demandé par l’abonné ou l’internaute, ou dans le seul but d’effectuer la transmission d’une communication sur un réseau de communications électroniques.'}
                </p>
              )}
            </div>

            {/* Statistiques */}
            <div className="preference-item">
              <div className="preference-header" onClick={() => toggleSection('statistiques')}>
                <span>{ready ? t('rgpd.preferences.statistiques.title') : 'Statistiques'}</span>
                <div className="header-right">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.statistics}
                      onChange={() => togglePreference('statistics')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <FontAwesomeIcon
                    icon={expandedSections.statistiques ? faChevronUp : faChevronDown}
                    className="toggle-icon"
                  />
                </div>
              </div>
              {expandedSections.statistiques && (
                <p className="preference-description">
                  {ready ? t('rgpd.preferences.statistiques.description') : 'Le stockage ou l’accès technique qui est utilisé exclusivement à des fins statistiques.'}
                </p>
              )}
            </div>

            {/* Marketing */}
            <div className="preference-item">
              <div className="preference-header" onClick={() => toggleSection('marketing')}>
                <span>{ready ? t('rgpd.preferences.marketing.title') : 'Marketing'}</span>
                <div className="header-right">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => togglePreference('marketing')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <FontAwesomeIcon
                    icon={expandedSections.marketing ? faChevronUp : faChevronDown}
                    className="toggle-icon"
                  />
                </div>
              </div>
              {expandedSections.marketing && (
                <p className="preference-description">
                  {ready ? t('rgpd.preferences.marketing.description') : 'Le stockage ou l’accès technique est nécessaire pour créer des profils d’internautes afin d’envoyer des publicités, ou pour suivre l’internaute sur un site web ou sur plusieurs sites web ayant des finalités marketing similaires.'}
                </p>
              )}
            </div>
          </div>

          <div className="rgpd-buttons">
            <button onClick={handleAcceptAll} className="rgpd-button accept-button">
              {ready ? t('rgpd.accept') : 'Accepter'}
            </button>
            <button onClick={handleRejectAll} className="rgpd-button reject-button">
              {ready ? t('rgpd.reject') : 'Refuser'}
            </button>
            <button onClick={handleSavePreferences} className="rgpd-button preferences-button">
              {ready ? t('rgpd.show_preferences') : 'Enregistrer les préférences'}
            </button>
          </div>

          <div className="rgpd-footer">
            <Link to="/politique-confidentialite">{ready ? t('rgpd.privacy_policy') : 'Vie Privée'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RGPDConsent;