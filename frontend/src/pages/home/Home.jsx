import React from 'react';
import Slider from 'react-slick'; // Import du composant Slider
import './Home.css'; // Styles pour la page et le carrousel
import 'slick-carousel/slick/slick.css'; // Styles Slick
import 'slick-carousel/slick/slick-theme.css'; // Thème Slick
import marseilleImage from '../../assets/images/marseille.jpg'; // Import de l'image

const Home = () => {
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

  const phrases = [
    'Faites confiance à Yasli pour un espace toujours propre et sain.',
    'Parce que la propreté est essentielle pour votre bien-être.',
    'Des services de nettoyage professionnels à votre écoute.',
    'Un environnement propre, une vie plus agréable.',
    'Choisissez Yasli, votre partenaire propreté de confiance.',
  ];

  return (
    <div className="home-container">
      <div className="home-image">
        <img src={marseilleImage} alt="Marseille" />
        <div className="carousel-overlay">
          <Slider {...sliderSettings}>
            {phrases.map((phrase, index) => (
              <div key={index} className="slide">
                <p>{phrase}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <h1>Bienvenue sur Yasli</h1>
      <p>Yasli vous aide à gérer vos services particuliers et professionnels avec facilité.</p>
    </div>
  );
};

export default Home;
