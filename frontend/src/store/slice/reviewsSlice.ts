import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
  id: string;
  name: string;
  firstName?: string;
  email?: string;
  address?: string;
  role: string;
  quote: string;
  query: string;
  image: string;
}

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

// Action asynchrone pour récupérer tous les avis
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await axios.get("http://localhost:3000/reviews");
    return response.data;
  }
);

// Action asynchrone pour créer un nouvel avis
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (formData: FormData) => {
    const response = await axios.post(
      "http://localhost:3000/reviews",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

// Action asynchrone pour mettre à jour un avis
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const response = await axios.put(
      `http://localhost:3000/reviews/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

// Action asynchrone pour supprimer un avis
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id: string) => {
    await axios.delete(`http://localhost:3000/reviews/${id}`);
    return id;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors de la récupération des avis";
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors de la création de l’avis";
      })
      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        const index = state.reviews.findIndex(
          (review) => review.id === updatedReview._id
        );
        if (index !== -1) {
          state.reviews[index] = updatedReview;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors de la mise à jour de l’avis";
      })
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors de la suppression de l’avis";
      });
  },
});

export default reviewsSlice.reducer;
