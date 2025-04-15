import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = ({ onMenuToggle }) => {
  const { i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'ar', name: 'العربية', flag: 'sa' },
  ];

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  const changeLanguage = (lng) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
    if (onMenuToggle) onMenuToggle();
  };

  return (
    <div className="language-selector">
      <button className="language-toggle" onClick={toggleLangMenu}>
        <span className={`flag flag-${i18n.language}`}></span>
        <span className="language-label">{i18n.language.toUpperCase()}</span>
      </button>
      <ul className={`language-menu ${isLangMenuOpen ? 'open' : ''}`}>
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className="language-option"
              onClick={() => changeLanguage(lang.code)}
              title={lang.name}
            >
              <span className={`flag flag-${lang.flag}`}></span>
              <span>{lang.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;