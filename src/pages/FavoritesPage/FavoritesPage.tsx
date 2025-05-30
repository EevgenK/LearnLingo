import { useRef } from 'react';
import s from './FavoritesPage.module.css';
import TeachersList from '../../components/TeachersList/TeachersList';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/teachers/selectors';
import Loader from '../../components/Loader/Loader';
import Container from '../../components/shared/Container/Container';

const FavoritesPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const listRef = useRef<HTMLUListElement>(null);
  return (
    <section>
      <Container additionalClass={s.teachers}>
        <h1 className={s.title}>Your teachers added to "Favorites":</h1>
        <TeachersList type="favorites" ref={listRef} />
        {isLoading && <Loader />}
      </Container>
    </section>
  );
};

export default FavoritesPage;
