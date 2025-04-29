import s from './TeachersPage.module.css';
import TeachersList from '../../components/TeachersList/TeachersList';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHasMore,
  selectIsLoading,
  selectLastKey,
} from '../../redux/teachers/selectors';
import { AppDispatch } from '../../redux/store';
import { fetchTeachers } from '../../redux/teachers/operations';
import Loader from '../../components/Loader/Loader';
import { useRef } from 'react';
import { smoothScroll } from '../../utils/smoothScroll';

const TeachersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);
  const lastKey = useSelector(selectLastKey);
  const isLoading = useSelector(selectIsLoading);

  const listRef = useRef<HTMLUListElement>(null);

  const loadMore = async () => {
    await dispatch(fetchTeachers(lastKey));
    smoothScroll(listRef);
  };
  return (
    <section className={s.teachers}>
      <TeachersList ref={listRef} />
      {isLoading ? (
        <Loader />
      ) : (
        <CustomButton
          onClick={loadMore}
          disabled={!hasMore || isLoading}
          type="button"
        >
          Load more
        </CustomButton>
      )}
    </section>
  );
};
/*ADDING SCROLL */
export default TeachersPage;
