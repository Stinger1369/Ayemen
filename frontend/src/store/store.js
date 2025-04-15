import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './slice/userSlice';
import schedulesReducer from './slice/schedulesSlice';
import reservationsReducer from './slice/reservationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    schedules: schedulesReducer,
    reservations: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;