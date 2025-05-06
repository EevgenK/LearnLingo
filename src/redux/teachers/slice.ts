import { createSlice } from '@reduxjs/toolkit';
import { TeachersState } from '../../types/teachersState.type';
import { fetchTeachers, fetchTeachersByIds } from './operations';

const initialState: TeachersState = {
  teachers: [],
  isLoading: false,
  error: null,
  hasMore: true,
  lastKey: null,
  favoriteTeachers: [],
};
const slice = createSlice({
  name: 'teachersList',
  initialState: initialState,
  reducers: {
    resetTeachers: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers.push(...action.payload.teachers);
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
        state.hasMore = false;
      })
      .addCase(fetchTeachersByIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeachersByIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteTeachers = action.payload;
      })
      .addCase(fetchTeachersByIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch teachers';
      });
  },
});
export const { resetTeachers } = slice.actions;
export default slice.reducer;
