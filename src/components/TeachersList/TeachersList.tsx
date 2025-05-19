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
import { selectFavorites } from '../../redux/auth/selectors';
import s from './TeachersList.module.css';
type TeachersListProps = {
  type?: '' | 'favorites';
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
      if (type === 'favorites') {
        dispatch(fetchTeachersByIds(favoriteIds.length ? favoriteIds : ['']));
      } else if (!teachers.length) {
        dispatch(fetchTeachers(null));
      }
    }, [dispatch, type, favoriteIds, teachers.length]);

    if (isLoading && !teachers.length) return <Loader />;
    if (error) return <p className={s.error}>Error: {error}</p>;
    if (!isLoading && !teachers.length)
      return <p className={s.empty}>No teachers found.</p>;

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
