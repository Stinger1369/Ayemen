import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './slice/userSlice';
import schedulesReducer from './slice/schedulesSlice';
import reservationsReducer from './slice/reservationsSlice';
import reviewsReducer from './slice/reviewsSlice';
import contactReducer from './slice/contactSlice'; // Ajout du reducer


const store = configureStore({
  reducer: {
    user: userReducer,
    schedules: schedulesReducer,
    reservations: reservationsReducer,
    reviews: reviewsReducer,
    contact: contactReducer, // Ajout du reducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;