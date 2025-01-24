import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../../store/userSlice';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Pour l'interaction
import frLocale from '@fullcalendar/core/locales/fr'; // Langue française
import './EmployesPlanning.css';

const EmployesPlanning = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.user.users.filter((user) => user.role === 'employee'));
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Ouvrir le modal pour ajouter ou modifier un événement
  const openModal = (info = null) => {
    if (!selectedEmployee) {
      alert('Veuillez sélectionner un employé.');
      return;
    }
    setSelectedEvent(info);
    setNewEvent({
      title: info?.event?.title || '',
      start: info?.startStr || '',
      end: info?.endStr || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({ title: '', start: '', end: '' });
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.event.id
            ? { ...event, title: newEvent.title, start: newEvent.start, end: newEvent.end }
            : event
        )
      );
    } else {
      setEvents([...events, { id: Date.now().toString(), ...newEvent }]);
    }
    closeModal();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEmployeeSelect = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(employee);
    setEvents(employee?.planning || []);
  };

  // Confirmer le planning
  const handleConfirmPlanning = async () => {
    if (!selectedEmployee) {
      alert('Veuillez sélectionner un employé.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: selectedEmployee._id,
          tasks: events,
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la confirmation du planning.');
      alert('Planning confirmé avec succès.');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Planning des Employés</h1>

      <div className="employee-selection">
        <label htmlFor="employee">Sélectionnez un employé : </label>
        <select id="employee" onChange={(e) => handleEmployeeSelect(e.target.value)}>
          <option value="">-- Choisir un employé --</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={frLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        select={(info) => openModal(info)}
        eventClick={(info) => openModal(info)}
      />

      <button onClick={handleConfirmPlanning} className="confirm-button">
        Confirmer le Planning
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedEvent ? 'Modifier l’événement' : 'Ajouter un événement'}</h3>
            <input
              type="text"
              placeholder="Titre de l’événement"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="datetime-local"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />
            <input
              type="datetime-local"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleSaveEvent}>
                {selectedEvent ? 'Modifier' : 'Ajouter'}
              </button>
              <button onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployesPlanning;
