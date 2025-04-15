import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action pour envoyer un message de contact
export const createContact = createAsyncThunk('contact/createContact', async (contactData) => {
  const response = await axios.post('http://localhost:3000/contacts', contactData);
  return response.data;
});

// Action pour récupérer tous les messages de contact
export const fetchContacts = createAsyncThunk('contact/fetchContacts', async () => {
  const response = await axios.get('http://localhost:3000/contacts');
  return response.data;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Création d'un contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de l’envoi du message';
      })
      // Récupération des contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de la récupération des messages';
      });
  },
});

export default contactSlice.reducer;