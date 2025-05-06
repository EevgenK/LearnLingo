import s from './LikedButton.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectIsFavorite, selectAuth } from '../../redux/auth/selectors';
import { AppDispatch } from '../../redux/store';
import { toggleFavorites } from '../../redux/auth/operations';
import { openModal } from '../../redux/modal/slice';
type LikedButtonProps = {
  teacherId: string;
};
const LikedButton = ({ teacherId }: LikedButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const liked = useSelector(makeSelectIsFavorite(teacherId));

  const user = useSelector(selectAuth);
  const onHandleClick = async () => {
    if (!user) {
      await dispatch(openModal('forbidden'));
      return;
    }
    if (user.uid) {
      await dispatch(toggleFavorites({ uid: user.uid, itemId: teacherId }));
    }
  };

  /*IMPROVE*/
  return (
    <button aria-label="close" type="button" onClick={onHandleClick}>
      <svg className={clsx(s.liked, liked && s.added)} width="26" height="26">
        <use href="/icons/sprite.svg#icon-heart" />
      </svg>
    </button>
  );
};

export default LikedButton;
