import React from 'react';
import './Particulier.css';

const Particulier = () => {
  const services = [
    { id: 1, title: 'Nettoyage de maison', price: '50€/h', description: 'Service complet pour un intérieur impeccable.' },
    { id: 2, title: 'Nettoyage de vitres', price: '30€/h', description: 'Des vitres étincelantes en un rien de temps.' },
    { id: 3, title: 'Entretien de jardin', price: '40€/h', description: 'Prenez soin de votre jardin avec nos experts.' },
    { id: 4, title: 'Nettoyage de canapé 2 places', price: '70€', description: 'Rendez votre canapé comme neuf avec nos produits spécialisés.' },
    { id: 5, title: 'Nettoyage de canapé 3 places ou plus', price: '90€', description: 'Un nettoyage en profondeur pour vos grands canapés.' },
    { id: 6, title: 'Nettoyage de voiture', price: '60€', description: 'Intérieur et extérieur pour une voiture propre et fraîche.' },
    { id: 7, title: 'Nettoyage de locaux', price: '80€/h', description: 'Services professionnels pour vos bureaux ou commerces.' },
  ];

  return (
    <div className="particulier-container">
      {/* Bulles animées */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <h1>Nos services pour particuliers</h1>
      <p>Découvrez nos services adaptés à vos besoins.</p>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h2>{service.title}</h2>
            <p className="service-description">{service.description}</p>
            <p className="service-price">{service.price}</p>
            <button className="service-button">Réserver</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Particulier;
