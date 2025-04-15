import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchReviews, createReview } from '../../store/slice/reviewsSlice';
import Slider from 'react-slick';
import './Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = ({ limit = null, showPagination = false, reviewsPerPage = 10 }) => {
  const { t, ready } = useTranslation();
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    address: '',
    role: '',
    quote: '',
    query: 'satisfied customer cleaning',
  });
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      firstName: '',
      email: '',
      address: '',
      role: '',
      quote: '',
      query: 'satisfied customer cleaning',
    });
    setImageFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('quote', formData.quote);
      formDataToSend.append('query', formData.query);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await dispatch(createReview(formDataToSend)).unwrap();
      closeModal();
      dispatch(fetchReviews());
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’avis:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('/uploads')) {
      return `http://localhost:3000${imagePath}`;
    }
    return imagePath;
  };

  // Gestion de la pagination
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = showPagination ? reviews.slice(startIndex, endIndex) : (limit ? reviews.slice(0, limit) : reviews);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Paramètres du carrousel pour la page d'accueil
  const sliderSettings = {
    dots: true,
    infinite: totalReviews > 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) {
    return <div className="loading">{ready ? t('testimonials.loading') : 'Chargement des témoignages...'}</div>;
  }

  if (error) {
    return <div className="error">{ready ? t('testimonials.error') : error}</div>;
  }

  return (
    <section className="testimonials-section">
      <h2>{ready ? t('testimonials.title') : 'Ce que nos clients disent de nous'}</h2>
      {limit ? (
        // Affichage en carrousel pour la page d'accueil
        <Slider {...sliderSettings}>
          {displayedReviews.map((testimonial) => (
            <div key={testimonial._id} className="testimonial-card">
              <img src={getImageUrl(testimonial.image)} alt={`Témoignage de ${testimonial.name}`} className="testimonial-image" />
              <div className="testimonial-content">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-author">
                  - {testimonial.firstName ? `${testimonial.firstName} ` : ''}{testimonial.name}
                  {testimonial.role ? `, ${testimonial.role}` : ''}
                  {testimonial.email ? `, ${testimonial.email}` : ''}
                  {testimonial.address ? `, ${testimonial.address}` : ''}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        // Affichage avec pagination pour la page dédiée
        <>
          <div className="testimonials-grid">
            {displayedReviews.map((testimonial) => (
              <div key={testimonial._id} className="testimonial-card">
                <img src={getImageUrl(testimonial.image)} alt={`Témoignage de ${testimonial.name}`} className="testimonial-image" />
                <div className="testimonial-content">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <p className="testimonial-author">
                    - {testimonial.firstName ? `${testimonial.firstName} ` : ''}{testimonial.name}
                    {testimonial.role ? `, ${testimonial.role}` : ''}
                    {testimonial.email ? `, ${testimonial.email}` : ''}
                    {testimonial.address ? `, ${testimonial.address}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {showPagination && totalReviews > reviewsPerPage && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                {ready ? t('testimonials.pagination.previous') : 'Précédent'}
              </button>
              <span className="pagination-info">
                {ready ? t('testimonials.pagination.page_info', { current: currentPage, total: totalPages }) : `Page ${currentPage} sur ${totalPages}`}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                {ready ? t('testimonials.pagination.next') : 'Suivant'}
              </button>
            </div>
          )}
        </>
      )}

      <div className="add-review-container">
        <button className="add-review-button" onClick={openModal}>
          {ready ? t('testimonials.add_review') : 'Ajouter un avis'}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>
              ✕
            </button>
            <h3>{ready ? t('testimonials.modal.title') : 'Ajouter un avis'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{ready ? t('testimonials.modal.name_label') : 'Nom *'}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">{ready ? t('testimonials.modal.firstName_label') : 'Prénom'}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{ready ? t('testimonials.modal.email_label') : 'Email'}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">{ready ? t('testimonials.modal.address_label') : 'Adresse'}</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">{ready ? t('testimonials.modal.role_label') : 'Rôle *'}</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{ready ? t('testimonials.modal.role_placeholder') : 'Sélectionner un rôle'}</option>
                  <option value="Particulier">{ready ? t('testimonials.modal.role_particulier') : 'Particulier'}</option>
                  <option value="Professionnel">{ready ? t('testimonials.modal.role_professionnel') : 'Professionnel'}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quote">{ready ? t('testimonials.modal.quote_label') : 'Votre avis *'}</label>
                <textarea
                  id="quote"
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">{ready ? t('testimonials.modal.image_label') : 'Votre photo (optionnel)'}</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="submit-button" disabled={submitting}>
                {submitting ? (ready ? t('testimonials.modal.submitting') : 'Envoi en cours...') : (ready ? t('testimonials.modal.submit') : 'Envoyer')}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;