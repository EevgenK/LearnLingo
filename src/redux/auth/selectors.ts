import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
export const selectAuth = (state: RootState) => state.auth.user;
export const selectFavorites = (state: RootState) => state.auth.favorites;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;

export const makeSelectIsFavorite = (id: string) =>
  createSelector([selectFavorites], (favorites) => favorites.includes(id));
