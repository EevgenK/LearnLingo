import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormValues } from '../../components/SearchBar/SearchBar';

const initialState: IFormValues = {
  levels: '',
  languages: '',
  price: '',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilters: (state, action: PayloadAction<IFormValues>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeFilters } = slice.actions;
export default slice.reducer;
