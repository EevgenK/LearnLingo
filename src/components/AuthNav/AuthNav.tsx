import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors';
import UserGreeting from '../UserGreeting/UserGreeting';

import RegisterButton from '../RegisterButton/RegisterButton';
import LoginLogoutButton from '../LoginLogoutButton/LoginLogoutButton';

const AuthNav = () => {
  const userName = useSelector(selectAuth)?.name;

  return (
    <div className={s.authorization}>
      <LoginLogoutButton />

      {userName ? <UserGreeting name={userName} /> : <RegisterButton />}
    </div>
  );
};

export default AuthNav;
