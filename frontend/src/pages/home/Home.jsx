import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Slider from 'react-slick';
import Testimonials from '../../components/Testimonials/Testimonials';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { t, ready } = useTranslation();
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Phrases statiques par défaut si les traductions ne sont pas prêtes
  const defaultPhrases = [
    'Faites confiance à Yasli pour un espace toujours propre et sain.',
    'Services de nettoyage pour particuliers et professionnels à Marseille.',
    'Un environnement propre pour votre maison ou votre entreprise.',
    'Des experts en ménage et entretien à votre service.',
    'Choisissez Yasli, votre partenaire propreté de confiance.',
  ];

  // Services par défaut avec des valeurs statiques
  const defaultServices = [
    {
      id: 1,
      title: 'Nettoyage de maison',
      description: 'Un intérieur impeccable pour votre confort.',
      query: 'house cleaning',
      image: null,
      link: '/particulier',
    },
    {
      id: 2,
      title: 'Nettoyage de vitres',
      description: 'Des vitres éclatantes en un rien de temps.',
      query: 'window cleaning',
      image: null,
      link: '/particulier',
    },
    {
      id: 3,
      title: 'Entretien de jardin',
      description: 'Un jardin soigné par nos experts.',
      query: 'garden maintenance',
      image: null,
      link: '/particulier',
    },
    {
      id: 4,
      title: 'Nettoyage de bureaux',
      description: 'Un environnement de travail propre et professionnel.',
      query: 'office cleaning',
      image: null,
      link: '/professionnel',
    },
    {
      id: 5,
      title: 'Nettoyage de commerces',
      description: 'Gardez votre commerce accueillant et impeccable.',
      query: 'retail store cleaning',
      image: null,
      link: '/professionnel',
    },
    {
      id: 6,
      title: 'Nettoyage après travaux',
      description: 'Éliminez poussières et débris après vos chantiers.',
      query: 'post construction cleaning',
      image: null,
      link: '/professionnel',
    },
  ];

  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchImages = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

      // Récupérer l'image de fond pour la section hero
      try {
        const heroResponse = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'clean modern house',
            per_page: 1,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });

        if (heroResponse.data.results.length > 0) {
          setHeroImage(heroResponse.data.results[0].urls.regular);
        } else {
          setHeroImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'image hero:', error);
        setHeroImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
      }

      // Traduire les services si les traductions sont prêtes
      let updatedServices = [...defaultServices];
      if (ready) {
        updatedServices = defaultServices.map((service) => ({
          ...service,
          title: t(`home.services.${service.query.replace(' ', '_')}`),
          description: t(`home.services.${service.query.replace(' ', '_')}_desc`),
        }));
      }

      // Récupérer les images pour les services
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
            updatedServices[i].image = response.data.results[0].urls.small;
          } else {
            updatedServices[i].image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
          }
        } catch (error) {
          console.error(`Erreur lors de la récupération de l'image pour ${service.query}:`, error);
          updatedServices[i].image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
        }
      }

      setServices(updatedServices);
      setLoading(false);
    };

    fetchImages();
  }, [t, ready]); // Dépendance sur t et ready pour recharger les services si la langue change

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  // Vérifie si les traductions sont prêtes, sinon utilise les phrases par défaut
  const phrases = ready && Array.isArray(t('home.hero.phrases', { returnObjects: true }))
    ? t('home.hero.phrases', { returnObjects: true })
    : defaultPhrases;

  return (
    <div className="home-container">
      {/* Section Hero */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <Slider {...sliderSettings}>
              {phrases.map((phrase, index) => (
                <div key={index} className="slide">
                  <h1>{phrase}</h1>
                </div>
              ))}
            </Slider>
            <button className="hero-button" onClick={() => navigateTo('/reservation')}>
              {ready ? t('home.hero.book_now') : 'Réserver maintenant'}
            </button>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="about-section">
        <h2>{ready ? t('home.about.title') : 'À propos de Yasli'}</h2>
        <p>{ready ? t('home.about.description') : 'Yasli est une entreprise de nettoyage basée à Marseille, dédiée à offrir des services de qualité supérieure pour les particuliers et les professionnels. Que vous ayez besoin d’un ménage à domicile, d’un entretien de jardin, ou d’un nettoyage de bureaux, notre équipe d’experts est là pour répondre à vos besoins avec professionnalisme et efficacité.'}</p>
        <div className="about-stats">
          <div className="stat-item">
            <h3>10+</h3>
            <p>{ready ? t('home.about.stats.experience') : 'Années d’expérience'}</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>{ready ? t('home.about.stats.satisfied_clients') : 'Clients satisfaits'}</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>{ready ? t('home.about.stats.eco_friendly') : 'Engagement écologique'}</p>
          </div>
        </div>
      </section>

      {/* Section Services populaires */}
      <section className="services-section">
        <h2>{ready ? t('home.services.title') : 'Nos services populaires'}</h2>
        <p>{ready ? t('home.services.description') : 'Des solutions de nettoyage pour tous vos besoins à Marseille et ses environs.'}</p>
        {loading ? (
          <div className="loading">{ready ? t('home.services.loading') : 'Chargement des services...'}</div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <button className="service-button" onClick={() => navigateTo(service.link)}>
                    {ready ? t('home.services.learn_more') : 'En savoir plus'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section Témoignages */}
      <section className="testimonials-section">
        <Testimonials limit={3} /> {/* Affiche seulement 3 avis */}
        <div className="view-all-reviews">
          <button className="view-all-button" onClick={() => navigateTo('/testimonials')}>
            {ready ? t('home.testimonials.view_all') : 'Voir tous les avis'}
          </button>
        </div>
      </section>

      {/* Section Pourquoi choisir Yasli */}
      <section className="why-choose-section">
        <h2>{ready ? t('home.why_choose.title') : 'Pourquoi choisir Yasli ?'}</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <h3>{ready ? t('home.why_choose.qualified_team') : 'Équipe qualifiée'}</h3>
            <p>{ready ? t('home.why_choose.qualified_team_desc') : 'Nos professionnels sont formés pour offrir un service de haute qualité.'}</p>
          </div>
          <div className="why-choose-item">
            <h3>{ready ? t('home.why_choose.eco_friendly') : 'Produits écologiques'}</h3>
            <p>{ready ? t('home.why_choose.eco_friendly_desc') : 'Nous utilisons des produits respectueux de l’environnement pour un nettoyage sûr.'}</p>
          </div>
          <div className="why-choose-item">
            <h3>{ready ? t('home.why_choose.satisfaction') : 'Satisfaction garantie'}</h3>
            <p>{ready ? t('home.why_choose.satisfaction_desc') : 'Nous nous engageons à répondre à vos attentes à 100%.'}</p>
          </div>
          <div className="why-choose-item">
            <h3>{ready ? t('home.why_choose.availability') : 'Disponibilité'}</h3>
            <p>{ready ? t('home.why_choose.availability_desc') : 'Nous sommes disponibles 7j/7 pour répondre à vos besoins de nettoyage.'}</p>
          </div>
        </div>
      </section>

      {/* Section CTA final */}
      <section className="cta-section">
        <h2>{ready ? t('home.cta.title') : 'Prêt à rendre votre espace impeccable ?'}</h2>
        <p>{ready ? t('home.cta.description') : 'Contactez-nous dès aujourd’hui pour un devis gratuit ou réservez directement en ligne.'}</p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigateTo('/reservation')}>
            {ready ? t('home.cta.book_now') : 'Réserver maintenant'}
          </button>
          <button className="cta-button secondary" onClick={() => navigateTo('/contact')}>
            {ready ? t('home.cta.contact_us') : 'Nous contacter'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;