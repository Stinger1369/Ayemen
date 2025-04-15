import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// URL de base pour l'API (à adapter selon votre backend)
const API_URL = 'http://localhost:3000/users';

// Initial state
const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null, // Récupérer l'utilisateur depuis localStorage
  token: localStorage.getItem('token') || null, // Récupérer le token depuis localStorage
  users: [],
  loading: false,
  error: null,
};

// Thunks asynchrones

// Inscription (signup)
export const signup = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to signup');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Connexion (signin)
export const signin = createAsyncThunk(
  'user/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Connexion échouée');
      }

      const data = await response.json();

      // Stocker le token
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      return { user: data.user, token: data.accessToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Récupérer tous les utilisateurs
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Récupération du token
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mise à jour d'un utilisateur
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Récupération du token
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Suppression d'un utilisateur
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Récupération du token
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to delete user');
      }
      return id; // Renvoie l'ID supprimé pour le mettre à jour dans l'état Redux
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Actions synchrones
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem('currentUser', JSON.stringify(action.payload)); // Stocker l'utilisateur dans localStorage
      } else {
        localStorage.removeItem('currentUser'); // Supprimer l'utilisateur de localStorage en cas de déconnexion
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token'); // Supprimer également le token
    },
  },
  extraReducers: (builder) => {
    // Inscription
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); // Stocker après inscription
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Connexion
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      console.log('Utilisateur connecté :', state.currentUser);
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Récupérer tous les utilisateurs
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Mise à jour d'un utilisateur
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.users.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Suppression d'un utilisateur
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Exporter les actions synchrones
export const { setCurrentUser, logout } = userSlice.actions;

// Exporter le reducer
export default userSlice.reducer;
