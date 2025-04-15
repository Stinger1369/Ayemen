import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faBullseye, faShieldAlt, faLeaf, faHandsHelping, faUsers, faStar, faBroom } from '@fortawesome/free-solid-svg-icons';
import './QuiSommesNous.css';

const QuiSommesNous = () => {
  const { t, ready } = useTranslation();

  // Données fictives pour les membres de l'équipe
  const teamMembers = [
    {
      name: ready ? t('qui_sommes_nous.team.members.0.name') : 'Marie Dupont',
      role: ready ? t('qui_sommes_nous.team.members.0.role') : 'Fondatrice',
      description: ready ? t('qui_sommes_nous.team.members.0.description') : 'Marie a fondé Yasli avec une vision claire : offrir des services de nettoyage de qualité supérieure à Marseille.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: ready ? t('qui_sommes_nous.team.members.1.name') : 'Pierre Martin',
      role: ready ? t('qui_sommes_nous.team.members.1.role') : 'Responsable des opérations',
      description: ready ? t('qui_sommes_nous.team.members.1.description') : 'Pierre supervise les opérations quotidiennes pour garantir un service impeccable à chaque client.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: ready ? t('qui_sommes_nous.team.members.2.name') : 'Sophie Lambert',
      role: ready ? t('qui_sommes_nous.team.members.2.role') : 'Responsable qualité',
      description: ready ? t('qui_sommes_nous.team.members.2.description') : 'Sophie s’assure que chaque prestation répond aux normes de qualité les plus élevées.',
      image: 'https://images.unsplash.com/photo-1517841903200-7b8553d38a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="qui-sommes-nous">
      {/* Section Introduction avec image de fond */}
      <section className="intro-section">
        <div className="intro-overlay">
          <div className="intro-content">
            <div className="intro-icon-wrapper">
              <FontAwesomeIcon icon={faBroom} className="section-icon broom-icon" />
            </div>
            <h1>
              {ready ? t('qui_sommes_nous.title') : 'Qui sommes-nous ?'}
            </h1>
            <p>{ready ? t('qui_sommes_nous.intro_description') : 'Découvrez l’histoire, la mission et les valeurs de Yasli, votre partenaire de confiance pour des services de nettoyage à Marseille.'}</p>
          </div>
        </div>
      </section>

      {/* Section Notre histoire */}
      <section className="history-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faHistory} className="section-icon history-icon" />
          <h2>{ready ? t('qui_sommes_nous.history.title') : 'Notre histoire'}</h2>
        </div>
        <p>{ready ? t('qui_sommes_nous.history.description') : 'Fondée en 2014 à Marseille, Yasli est née d’une passion pour la propreté et le bien-être. Notre fondatrice, Marie Dupont, a voulu créer une entreprise qui allie qualité, professionnalisme et respect de l’environnement. Aujourd’hui, nous sommes fiers de servir des centaines de clients, particuliers et professionnels, dans toute la région.'}</p>
      </section>

      {/* Section Notre mission */}
      <section className="mission-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faBullseye} className="section-icon mission-icon" />
          <h2>{ready ? t('qui_sommes_nous.mission.title') : 'Notre mission'}</h2>
        </div>
        <p>{ready ? t('qui_sommes_nous.mission.description') : 'Chez Yasli, notre mission est de transformer chaque espace en un lieu propre, sain et accueillant. Nous nous engageons à offrir des services de nettoyage exceptionnels tout en utilisant des produits écologiques pour préserver votre santé et celle de la planète.'}</p>
        <div className="mission-image">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Clean environment" />
        </div>
      </section>

      {/* Section Nos valeurs */}
      <section className="values-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faShieldAlt} className="section-icon values-icon" />
          <h2>{ready ? t('qui_sommes_nous.values.title') : 'Nos valeurs'}</h2>
        </div>
        <div className="values-grid">
          <div className="value-item quality">
            <FontAwesomeIcon icon={faStar} className="value-icon quality-icon" />
            <h3>{ready ? t('qui_sommes_nous.values.quality') : 'Qualité'}</h3>
            <p>{ready ? t('qui_sommes_nous.values.quality_desc') : 'Nous nous efforçons d’offrir un service irréprochable à chaque intervention.'}</p>
          </div>
          <div className="value-item ecology">
            <FontAwesomeIcon icon={faLeaf} className="value-icon ecology-icon" />
            <h3>{ready ? t('qui_sommes_nous.values.ecology') : 'Écologie'}</h3>
            <p>{ready ? t('qui_sommes_nous.values.ecology_desc') : 'Nous utilisons des produits respectueux de l’environnement pour un nettoyage durable.'}</p>
          </div>
          <div className="value-item trust">
            <FontAwesomeIcon icon={faHandsHelping} className="value-icon trust-icon" />
            <h3>{ready ? t('qui_sommes_nous.values.trust') : 'Confiance'}</h3>
            <p>{ready ? t('qui_sommes_nous.values.trust_desc') : 'Nous construisons des relations de confiance avec nos clients grâce à notre transparence.'}</p>
          </div>
        </div>
      </section>

      {/* Section Notre équipe */}
      <section className="team-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faUsers} className="section-icon team-icon" />
          <h2>{ready ? t('qui_sommes_nous.team.title') : 'Notre équipe'}</h2>
        </div>
        <p>{ready ? t('qui_sommes_nous.team.description') : 'Rencontrez les membres clés de notre équipe qui travaillent ensemble pour garantir votre satisfaction.'}</p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image-wrapper">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="shine-effect"></div>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Appel à l’action */}
      <section className="cta-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faStar} className="section-icon star-icon" />
          <h2>{ready ? t('qui_sommes_nous.cta.title') : 'Prêt à nous faire confiance ?'}</h2>
        </div>
        <p>{ready ? t('qui_sommes_nous.cta.description') : 'Contactez-nous dès aujourd’hui pour découvrir nos services ou réserver une prestation.'}</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button contact-button">
            {ready ? t('qui_sommes_nous.cta.contact') : 'Nous contacter'}
          </Link>
          <Link to="/reservation" className="cta-button reservation-button">
            {ready ? t('qui_sommes_nous.cta.book') : 'Réserver maintenant'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuiSommesNous;