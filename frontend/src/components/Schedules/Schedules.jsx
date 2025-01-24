import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSchedules, setLoading, setError } from '../../store/schedulesSlice';

const Schedules = () => {
  const { schedules, loading, error } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSchedules = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('http://localhost:3000/schedules'); // Remplacez par votre API
        const data = await response.json();
        dispatch(setSchedules(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSchedules();
  }, [dispatch]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Plannings</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            {schedule.task} - {schedule.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedules;
