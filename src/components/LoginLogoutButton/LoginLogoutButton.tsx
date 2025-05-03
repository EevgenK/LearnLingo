import { useDispatch, useSelector } from 'react-redux';
import s from './LoginLogoutButton.module.css';
import { selectAuth } from '../../redux/auth/selectors';
import { useCallback } from 'react';

import { openModal } from '../../redux/modal/slice';
import { logoutUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';

const LoginLogoutButton = () => {
  const user = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

  const onHandleClick = useCallback(() => {
    if (user) {
      dispatch(logoutUser());
    } else {
      dispatch(openModal('login'));
    }
  }, [dispatch, user]);
  return (
    <button onClick={onHandleClick} className={s.login} type="button">
      <svg
        className={s.icon}
        role="img"
        aria-label="Log in"
        width="20"
        height="20"
      >
        <use href={`/icons/sprite.svg#icon-log-in`} />
      </svg>
      <span className={s.text}>{user ? 'Log out' : 'Log in'}</span>
    </button>
  );
};

export default LoginLogoutButton;
