import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Particulier.css';

const Particulier = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Nettoyage de maison',
      price: '50€/h',
      description: 'Service complet pour un intérieur impeccable.',
      query: 'house cleaning',
      image: null,
    },
    {
      id: 2,
      title: 'Nettoyage de vitres',
      price: '30€/h',
      description: 'Des vitres étincelantes en un rien de temps.',
      query: 'window cleaning',
      image: null,
    },
    {
      id: 3,
      title: 'Entretien de jardin',
      price: '40€/h',
      description: 'Prenez soin de votre jardin avec nos experts.',
      query: 'garden maintenance',
      image: null,
    },
    {
      id: 4,
      title: 'Nettoyage de canapé 2 places',
      price: '70€',
      description: 'Rendez votre canapé comme neuf avec nos produits spécialisés.',
      query: 'sofa cleaning',
      image: null,
    },
    {
      id: 5,
      title: 'Nettoyage de canapé 3 places ou plus',
      price: '90€',
      description: 'Un nettoyage en profondeur pour vos grands canapés.',
      query: 'large sofa cleaning',
      image: null,
    },
    {
      id: 6,
      title: 'Nettoyage de voiture',
      price: '60€',
      description: 'Intérieur et extérieur pour une voiture propre et fraîche.',
      query: 'car cleaning',
      image: null,
    },
    {
      id: 7,
      title: 'Nettoyage de locaux',
      price: '80€/h',
      description: 'Services professionnels pour vos bureaux ou commerces.',
      query: 'office cleaning',
      image: null,
    },
    {
      id: 8,
      title: 'Nettoyage des murs',
      price: '35€/h',
      description: 'Redonnez de l’éclat à vos murs avec un nettoyage minutieux.',
      query: 'wall cleaning',
      image: null,
    },
    {
      id: 9,
      title: 'Nettoyage du sol',
      price: '45€/h',
      description: 'Sols brillants et impeccables, tous types de surfaces.',
      query: 'floor cleaning',
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
    <div className="particulier-container">
      <h1>Nos services pour particuliers</h1>
      <p>Découvrez nos services adaptés à vos besoins.</p>

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

export default Particulier;