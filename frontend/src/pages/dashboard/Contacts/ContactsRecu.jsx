import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchContacts } from '../../../store/slice/contactSlice';
import './ContactsRecu.css';

const ContactsRecu = () => {
  const { t, ready } = useTranslation();
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">{ready ? t('contacts_received.loading') : 'Chargement des messages...'}</div>;
  }

  if (error) {
    return <div className="error">{ready ? t('contacts_received.error') : error}</div>;
  }

  return (
    <div className="contacts-received">
      <h1>{ready ? t('contacts_received.title') : 'Contacts Reçus'}</h1>
      <p>{ready ? t('contacts_received.description') : 'Consultez les messages de contact ici.'}</p>
      {contacts.length === 0 ? (
        <p>{ready ? t('contacts_received.no_contacts') : 'Aucun message de contact pour le moment.'}</p>
      ) : (
        <div className="contact-list">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <p><strong>{ready ? t('contacts_received.email') : 'Email'}:</strong> {contact.email}</p>
              <p><strong>{ready ? t('contacts_received.phoneNumber') : 'Numéro de téléphone'}:</strong> {contact.phoneNumber}</p>
              <p><strong>{ready ? t('contacts_received.message') : 'Message'}:</strong> {contact.message}</p>
              <p><strong>{ready ? t('contacts_received.status') : 'Statut'}:</strong> {contact.status}</p>
              <p><strong>{ready ? t('contacts_received.received_at') : 'Reçu le'}:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsRecu;