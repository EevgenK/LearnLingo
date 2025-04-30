import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../shared/CustomButton/CustomButton';
import {
  selectHasMore,
  selectIsLoading,
  selectLastKey,
} from '../../redux/teachers/selectors';
import { AppDispatch } from '../../redux/store';
import { smoothScroll } from '../../utils/smoothScroll';
import { fetchTeachers } from '../../redux/teachers/operations';
import { RefObject } from 'react';

type LoadMoreButtonProps = {
  listRef: RefObject<HTMLUListElement | null>;
};

const LoadMoreButton = ({ listRef }: LoadMoreButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(selectHasMore);
  const lastKey = useSelector(selectLastKey);
  const isLoading = useSelector(selectIsLoading);

  const loadMore = async () => {
    await dispatch(fetchTeachers(lastKey));
    smoothScroll(listRef);
  };
  return (
    <CustomButton
      onClick={loadMore}
      disabled={!hasMore || isLoading}
      type="button"
    >
      Load more
    </CustomButton>
  );
};

export default LoadMoreButton;
