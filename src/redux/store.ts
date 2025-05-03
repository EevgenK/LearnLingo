import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './teachers/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice';
import modalReducer from './modal/slice';

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    filter: filtersReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
