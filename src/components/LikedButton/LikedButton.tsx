import { useState } from 'react';
import s from './LikedButton.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors';

const LikedButton = () => {
  const [liked, setLiked] = useState(false);
  const user = useSelector(selectAuth);
  /*IMPROVE*/
  return (
    <button
      disabled={!user}
      aria-label="close"
      type="button"
      onClick={() => setLiked(!liked)}
    >
      <svg className={clsx(s.liked, liked && s.added)} width="26" height="26">
        <use href="/icons/sprite.svg#icon-heart" />
      </svg>
    </button>
  );
};

export default LikedButton;
