import s from './TeachersPage.module.css';
import TeachersList from '../../components/TeachersList/TeachersList';

import { useSelector } from 'react-redux';
import {
  selectFilteredTeachersList,
  selectIsLoading,
} from '../../redux/teachers/selectors';

import Loader from '../../components/Loader/Loader';
import { useRef } from 'react';

import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '../../components/shared/Container/Container';

const TeachersPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const listRef = useRef<HTMLUListElement>(null);
  const teachers = useSelector(selectFilteredTeachersList);

  return (
    <section>
      <Container additionalClass={s.teachers}>
        <SearchBar />
        <TeachersList ref={listRef} />
        {isLoading ? (
          <Loader />
        ) : (
          !!teachers.length && <LoadMoreButton listRef={listRef} />
        )}
      </Container>
    </section>
  );
};

export default TeachersPage;
