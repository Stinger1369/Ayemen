import React from 'react';
import Testimonials from '../../components/Testimonials/Testimonials';
import './TestimonialsPage.css';

const TestimonialsPage = () => {
  return (
    <div className="testimonials-page-container">
      <h1>Tous les avis de nos clients</h1>
      <p>Découvrez ce que nos clients pensent de nos services.</p>
      <Testimonials showPagination={true} reviewsPerPage={10} />
    </div>
  );
};

export default TestimonialsPage;