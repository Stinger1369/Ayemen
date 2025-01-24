import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, getAllUsers, updateUser } from '../../../store/userSlice';
import './Employes.css';

const Employes = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) =>
    state.user.users.filter((user) => user.role === 'employee')
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    phoneNumber: '',
    address: '',
  });

  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleAddEmployee = () => {
    dispatch(signup({ ...formData, role: 'employee' }));
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: '',
      phoneNumber: '',
      address: '',
    });
  };

  const startEditingEmployee = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: '', // Vide pour la sécurité
      birthday: employee.birthday,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
    });
  };

  const handleUpdateEmployee = () => {
    dispatch(updateUser({ id: editingEmployeeId, updateData: editFormData }));
    setEditingEmployeeId(null);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="employes-page">
      <h1>Gestion des Employés</h1>

      {/* Formulaire pour ajouter un employé */}
      <div className="employee-form">
        <h3>Ajouter un nouvel employé</h3>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
        />
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          placeholder="Date de naissance"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Numéro de téléphone"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresse"
        />
        <button onClick={handleAddEmployee}>Ajouter Employé</button>
      </div>

      {/* Liste des employés */}
      <div className="employee-list">
        <h3>Liste des employés</h3>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee._id}>
                {editingEmployeeId === employee._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditChange}
                      placeholder="Prénom"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditChange}
                      placeholder="Nom"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      placeholder="Email"
                    />
                    <input
                      type="password"
                      name="password"
                      value={editFormData.password}
                      onChange={handleEditChange}
                      placeholder="Mot de passe"
                    />
                    <input
                      type="date"
                      name="birthday"
                      value={editFormData.birthday}
                      onChange={handleEditChange}
                      placeholder="Date de naissance"
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editFormData.phoneNumber}
                      onChange={handleEditChange}
                      placeholder="Numéro de téléphone"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditChange}
                      placeholder="Adresse"
                    />
                    <button onClick={handleUpdateEmployee}>Enregistrer</button>
                    <button onClick={() => setEditingEmployeeId(null)}>Annuler</button>
                  </div>
                ) : (
                  <div className="employee-item">
                    {employee.firstName} {employee.lastName} ({employee.email})
                    <button onClick={() => startEditingEmployee(employee)}>Modifier</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun employé pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Employes;
