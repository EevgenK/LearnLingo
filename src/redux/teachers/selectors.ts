import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectTeachersList = (state: RootState) => state.teachers.teachers;
export const selectIsLoading = (state: RootState) => state.teachers.isLoading;
export const selectError = (state: RootState) => state.teachers.error;
export const selectHasMore = (state: RootState) => state.teachers.hasMore;
export const selectLastKey = (state: RootState) => state.teachers.lastKey;
