import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Professionnel.css';

const Professionnel = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Nettoyage de bureaux',
      price: '100€/h',
      description: 'Un environnement de travail propre et professionnel.',
      query: 'office cleaning',
      image: null,
    },
    {
      id: 2,
      title: 'Nettoyage d’entrepôts',
      price: '120€/h',
      description: 'Entretien complet pour vos espaces de stockage.',
      query: 'warehouse cleaning',
      image: null,
    },
    {
      id: 3,
      title: 'Nettoyage de commerces',
      price: '90€/h',
      description: 'Gardez votre commerce accueillant et impeccable.',
      query: 'retail store cleaning',
      image: null,
    },
    {
      id: 4,
      title: 'Nettoyage après travaux',
      price: '150€/h',
      description: 'Éliminez poussières et débris après vos chantiers.',
      query: 'post construction cleaning',
      image: null,
    },
    {
      id: 5,
      title: 'Nettoyage de vitrines',
      price: '80€/h',
      description: 'Vitrines éclatantes pour attirer vos clients.',
      query: 'shop window cleaning',
      image: null,
    },
    {
      id: 6,
      title: 'Entretien d’espaces extérieurs',
      price: '70€/h',
      description: 'Maintenez vos espaces extérieurs propres et soignés.',
      query: 'outdoor space maintenance',
      image: null,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedServices = [...services];
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Récupère la clé depuis .env

      for (let i = 0; i < updatedServices.length; i++) {
        const service = updatedServices[i];
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
              query: service.query,
              per_page: 1,
              orientation: 'landscape',
            },
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          });

          if (response.data.results.length > 0) {
            updatedServices[i].image = response.data.results[0].urls.small; // Image optimisée (300px)
          } else {
            // Image par défaut si aucune image n’est trouvée
            updatedServices[i].image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
          }
        } catch (error) {
          console.error(`Erreur lors de la récupération de l'image pour ${service.query}:`, error);
          // Image par défaut en cas d’erreur
          updatedServices[i].image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
        }
      }

      setServices(updatedServices);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleReserve = (service) => {
    navigate('/reservation', { state: { service } });
  };

  return (
    <div className="professionnel-container">
      <h1>Nos services pour professionnels</h1>
      <p>Des solutions adaptées pour maintenir vos espaces professionnels impeccables.</p>

      {loading ? (
        <div className="loading">Chargement des images...</div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}></div>
              <div className="service-content">
                <h2>{service.title}</h2>
                <p className="service-description">{service.description}</p>
                <p className="service-price">{service.price}</p>
                <button className="service-button" onClick={() => handleReserve(service)}>
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Professionnel;