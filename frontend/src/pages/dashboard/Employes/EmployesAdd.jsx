import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../../store/slice/userSlice';
import './EmployesAdd.css';

const EmployesAdd = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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

  return (
    <div className="employes-add">
      <h1>Ajouter un Employé</h1>
      <form className="add-form">
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Prénom" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nom" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Date de naissance" />
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Téléphone" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
        <button type="button" onClick={handleAddEmployee}>Ajouter</button>
      </form>
    </div>
  );
};

export default EmployesAdd;
