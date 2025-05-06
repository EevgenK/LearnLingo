import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/Loader';
import TeacherCard from '../TeacherCard/TeacherCard';
import { AppDispatch } from '../../redux/store';
import {
  selectError,
  selectFavoriteTeachers,
  selectFilteredTeachersList,
  selectIsLoading,
} from '../../redux/teachers/selectors';
import {
  fetchTeachers,
  fetchTeachersByIds,
} from '../../redux/teachers/operations';
import s from './TeachersList.module.css';
import { selectFavorites } from '../../redux/auth/selectors';
type TeachersListProps = {
  type?: string;
};

const TeachersList = forwardRef<HTMLUListElement, TeachersListProps>(
  ({ type = '' }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const favoriteIds = useSelector(selectFavorites);
    const teachers = useSelector(
      type === 'favorites'
        ? selectFavoriteTeachers
        : selectFilteredTeachersList,
    );
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
      if (!type && teachers.length === 0) {
        dispatch(fetchTeachers(null));
      } else if (favoriteIds.length > 0) {
        dispatch(fetchTeachersByIds(favoriteIds));
      }
    }, [dispatch, type, favoriteIds, teachers.length]);

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
        {teachers.map((el) => (
          <TeacherCard item={el} key={el.id} />
        ))}
      </ul>
    ) : (
      <Loader />
    );
  },
);

export default TeachersList;
