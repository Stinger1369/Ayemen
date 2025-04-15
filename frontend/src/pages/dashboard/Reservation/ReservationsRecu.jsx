import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations, updateReservation, deleteReservation } from '../../../store/slice/reservationsSlice';
import './ReservationsRecu.css';

const ReservationsRecu = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector((state) => state.reservations);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    status: '',
    notes: '',
  });

  useEffect(() => {
    console.log('Fetching all reservations...');
    dispatch(getAllReservations()).then((result) => {
      console.log('Reservations fetch result:', result);
      console.log('Current reservations state:', reservations);
    });
  }, [dispatch]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const startEditing = (reservation) => {
    setEditingReservationId(reservation._id);
    setEditFormData({
      status: reservation.status,
      notes: reservation.notes || '',
    });
  };

  const handleUpdate = (id) => {
    dispatch(updateReservation({ id, updateData: editFormData })).then(() => {
      setEditingReservationId(null);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      dispatch(deleteReservation(id));
    }
  };

  return (
    <div className="reservations-recu">
      <h1>Réservations Reçues</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">Erreur : {error}</p>}
      {reservations.length === 0 && !loading && !error && <p>Aucune réservation trouvée.</p>}
      {reservations.length > 0 && (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Horaire</th>
              <th>Adresse</th>
              <th>Statut</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                {editingReservationId === reservation._id ? (
                  <>
                    <td>
                      {reservation.clientInfo?.firstName} {reservation.clientInfo?.lastName} (
                      {reservation.clientInfo?.email})
                    </td>
                    <td>{reservation.clientInfo?.phoneNumber}</td>
                    <td>{reservation.serviceType}</td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.timeSlot}</td>
                    <td>{reservation.address}</td>
                    <td>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </td>
                    <td>
                      <textarea
                        name="notes"
                        value={editFormData.notes}
                        onChange={handleEditChange}
                        placeholder="Ajouter des notes"
                      />
                    </td>
                    <td>
                      <button onClick={() => handleUpdate(reservation._id)}>Enregistrer</button>
                      <button onClick={() => setEditingReservationId(null)}>Annuler</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {reservation.clientInfo?.firstName} {reservation.clientInfo?.lastName} (
                      {reservation.clientInfo?.email})
                    </td>
                    <td>{reservation.clientInfo?.phoneNumber}</td>
                    <td>{reservation.serviceType}</td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.timeSlot}</td>
                    <td>{reservation.address}</td>
                    <td>{reservation.status}</td>
                    <td>{reservation.notes || 'Aucune'}</td>
                    <td>
                      <button onClick={() => startEditing(reservation)}>Modifier</button>
                      <button onClick={() => handleDelete(reservation._id)}>Supprimer</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsRecu;