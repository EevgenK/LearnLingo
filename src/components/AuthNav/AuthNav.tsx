import s from './AuthNav.module.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors';
import UserGreeting from '../UserGreeting/UserGreeting';

import RegisterButton from '../RegisterButton/RegisterButton';
import LoginLogoutButton from '../LoginLogoutButton/LoginLogoutButton';
import clsx from 'clsx';

export interface AuthNavProps {
  type?: string;
}

const AuthNav = ({ type }: AuthNavProps) => {
  const userName = useSelector(selectAuth)?.name;

  return (
    <div className={clsx(s.authorization, type === 'main' && s.hidden)}>
      <LoginLogoutButton />

      {userName ? <UserGreeting name={userName} /> : <RegisterButton />}
    </div>
  );
};

export default AuthNav;
