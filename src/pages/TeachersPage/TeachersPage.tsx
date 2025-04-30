import s from './TeachersPage.module.css';
import TeachersList from '../../components/TeachersList/TeachersList';

import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/teachers/selectors';

import Loader from '../../components/Loader/Loader';
import { useRef } from 'react';

import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import SearchBar from '../../components/SearchBar/SearchBar';

const TeachersPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <section className={s.teachers}>
      <SearchBar />
      <TeachersList ref={listRef} />
      {isLoading ? <Loader /> : <LoadMoreButton listRef={listRef} />}
    </section>
  );
};

export default TeachersPage;
