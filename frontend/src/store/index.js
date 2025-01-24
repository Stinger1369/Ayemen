import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // Importer logger
import userReducer from './userSlice';
import schedulesReducer from './schedulesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    schedules: schedulesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
