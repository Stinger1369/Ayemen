import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, signup, getAllUsers, setCurrentUser } from '../../../store/slice/userSlice';
import './AdminAccounts.css';

const AdminAccounts = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const admins = useSelector((state) => state.user.users.filter((user) => user.role === 'admin'));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [editingAdminId, setEditingAdminId] = useState(null); // ID de l'admin en cours de modification
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Récupérer tous les utilisateurs au montage
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleAddAdmin = () => {
    dispatch(signup({ ...formData, role: 'admin' }));
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  const startEditingAdmin = (admin) => {
    setEditingAdminId(admin._id);
    setEditFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: '', // Le mot de passe sera saisi par l'utilisateur
    });
  };

  const handleUpdateAdmin = () => {
    dispatch(updateUser({ id: editingAdminId, updateData: editFormData })).then(() => {
      // Si l'utilisateur connecté met à jour son propre mot de passe, le déconnecter volontairement
      if (currentUser && currentUser._id === editingAdminId) {
        alert('Votre mot de passe a été modifié. Vous serez déconnecté.');
        dispatch(setCurrentUser(null));
      }
    });
    setEditingAdminId(null);
  };

  return (
    <div className="admin-accounts">
      <h2>Gérer les comptes administrateurs</h2>

      {/* Liste des admins */}
      <div className="admin-list">
        <h3>Liste des admins</h3>
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>
              {editingAdminId === admin._id ? (
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
                  <button onClick={handleUpdateAdmin}>Enregistrer</button>
                  <button onClick={() => setEditingAdminId(null)}>Annuler</button>
                </div>
              ) : (
                <div className="admin-item">
                  {admin.firstName} {admin.lastName} ({admin.email})
                  <button onClick={() => startEditingAdmin(admin)}>Modifier</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulaire pour ajouter un nouvel admin */}
      <div className="admin-form">
        <h3>Ajouter un nouvel admin</h3>
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
        <button onClick={handleAddAdmin}>Ajouter Admin</button>
      </div>
    </div>
  );
};

export default AdminAccounts;
