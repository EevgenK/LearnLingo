import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  toggleFavorites,
  loginUser,
  logoutUser,
  registerUser,
  fetchFavorites,
  signInWithGoogle,
} from './operations';

interface AuthState {
  user: {
    name: string | undefined;
    uid?: string | undefined;
    email: string | undefined;
  } | null;
  loading: boolean;
  error: string | null;
  favorites: string[];
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  favorites: [],
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.user = null;
      state.favorites = [];
      state.isAuthChecked = true;
    },
    setFavorites: (state, action) => {
      state.favorites = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = initialState.user;
        state.loading = initialState.loading;
        state.error = initialState.error;
        state.favorites = initialState.favorites;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(toggleFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout, setFavorites } = authSlice.actions;
export default authSlice.reducer;
