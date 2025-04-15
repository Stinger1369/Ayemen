import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/schedules';

const initialState = {
  schedules: [],
  loading: false,
  error: null,
};

// Thunk pour ajouter un planning
export const addSchedule = createAsyncThunk(
  'schedules/addSchedule',
  async (scheduleData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.currentUser?.token; // Récupérer le token de l'utilisateur connecté
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ajouter le token ici
        },
        body: JSON.stringify(scheduleData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to add schedule');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSchedules, setLoading, setError } = schedulesSlice.actions;

export default schedulesSlice.reducer;
