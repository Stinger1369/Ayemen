import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createContact } from '../../store/slice/contactSlice';
import './Contact.css';

const Contact = () => {
  const { t, ready } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await dispatch(createContact(formData)).unwrap();
      setSuccessMessage(ready ? t('contact.success_message') : 'Votre message a été envoyé avec succès !');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage(ready ? t('contact.error_message') : 'Une erreur s’est produite. Veuillez réessayer.');
      console.error('Erreur lors de l’envoi du message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <h1>{ready ? t('contact.title') : 'Contactez-nous'}</h1>
      <p>{ready ? t('contact.description') : 'Remplissez le formulaire ci-dessous pour nous contacter.'}</p>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">{ready ? t('contact.firstName_label') : 'Prénom'}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">{ready ? t('contact.lastName_label') : 'Nom'}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{ready ? t('contact.email_label') : 'Email'}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">{ready ? t('contact.phoneNumber_label') : 'Numéro de téléphone'}</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">{ready ? t('contact.message_label') : 'Message'}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? (ready ? t('contact.submitting') : 'Envoi en cours...') : (ready ? t('contact.submit') : 'Envoyer')}
        </button>
      </form>
    </div>
  );
};

export default Contact;