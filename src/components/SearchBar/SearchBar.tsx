/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';

import s from './SearchBar.module.css';
import { Teacher } from '../../types/teacher.type';
import CustomSelect from '../shared/CustomSelect/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectUniqueValuesByKeys } from '../../redux/teachers/selectors';
import { useEffect } from 'react';

import { AppDispatch } from '../../redux/store';
import { changeFilters } from '../../redux/filters/slice';
import ResetButton from '../ResetButton/ResetButton';
import AuthProvider from '../../firebase/auth';

export interface IFormValues {
  levels: string;
  languages: string;
  price: string;
}
const initialValues = {
  levels: '',
  languages: '',
  price: '',
};
const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const keys: (keyof Teacher)[] = ['levels', 'languages', 'price_per_hour'];

  const queryData = useSelector(makeSelectUniqueValuesByKeys(keys));

  const { register, watch, setValue } = useForm<IFormValues>({
    defaultValues: initialValues,
  });

  const formValues = watch();

  const handleReset = () => {
    setValue('levels', initialValues.levels);
    setValue('languages', initialValues.languages);
    setValue('price', initialValues.price);
  };

  useEffect(() => {
    dispatch(changeFilters(formValues));
  }, [dispatch, formValues.levels, formValues.languages, formValues.price]);

  return (
    <form className={s.form}>
      <CustomSelect
        labelText="Languages"
        label="languages"
        options={queryData.languages}
        {...register('languages')}
      />
      <CustomSelect
        labelText="Level of knowledge"
        label="levels"
        options={queryData.levels}
        {...register('levels')}
      />
      <CustomSelect
        labelText="Price"
        label="price"
        options={queryData.price_per_hour}
        {...register('price')}
      />
      <ResetButton action={handleReset} />
      <AuthProvider />
    </form>
  );
};

export default SearchBar;
