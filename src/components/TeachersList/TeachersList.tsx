import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/Loader';
import TeacherCard from '../TeacherCard/TeacherCard';
import { AppDispatch } from '../../redux/store';
import {
  selectError,
  selectIsLoading,
  selectTeachersList,
} from '../../redux/teachers/selectors';
import { fetchTeachers } from '../../redux/teachers/operations';
import s from './TeachersList.module.css';

const TeachersList = forwardRef<HTMLUListElement>((_, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector(selectTeachersList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!teachers.length) {
      dispatch(fetchTeachers(null));
    }
  }, [dispatch, teachers.length]);

  if (isLoading && teachers.length === 0) {
    return <Loader />;
  }
  if (error) {
    return <p className={s.error}>Error: {error}</p>;
  }
  if (!isLoading && teachers.length === 0) {
    return <p className={s.empty}>No teachers found.</p>;
  }
  return teachers.length ? (
    <ul className={s.list} ref={ref}>
      {teachers.map((el, idx) => (
        <TeacherCard item={el} key={el.surname + idx} />
      ))}
    </ul>
  ) : (
    <Loader />
  );
});

export default TeachersList;
