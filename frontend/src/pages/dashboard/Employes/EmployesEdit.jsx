import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, updateUser } from '../../../store/slice/userSlice';
import './EmployesEdit.css';

const EmployesEdit = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.user.users.filter((user) => user.role === 'employee'));
  const [editFormData, setEditFormData] = useState({});
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEdit = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditFormData(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editingEmployeeId, updateData: editFormData }));
    setEditingEmployeeId(null);
  };

  return (
    <div className="employes-edit">
      <h1>Modifier Employés</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {editingEmployeeId === employee._id ? (
              <div>
                <input type="text" name="firstName" value={editFormData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" value={editFormData.lastName} onChange={handleChange} />
                <input type="email" name="email" value={editFormData.email} onChange={handleChange} />
                <button onClick={handleSave}>Enregistrer</button>
              </div>
            ) : (
              <div>
                {employee.firstName} {employee.lastName} ({employee.email})
                <button onClick={() => handleEdit(employee)}>Modifier</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployesEdit;
