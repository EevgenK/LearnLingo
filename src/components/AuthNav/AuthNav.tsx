import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <ul className={s.navigation}>
      <li>
        <NavLink className={s.login} to="/">
          <svg
            className={s.icon}
            role="img"
            aria-label="Log in"
            width="20"
            height="20"
          >
            <use href="/icons/sprite.svg#icon-log-in" />
          </svg>
          <span className={s.text}>Log in</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={s.register} to="/">
          Registration
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
