import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './teachers/slice';
import filtersReducer from './filters/slice';

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    filter: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
