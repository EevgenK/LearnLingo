import { NavLink } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <NavLink to="/" className={s.logo} aria-label="Home page link">
      <svg
        className={s.icon}
        role="img"
        aria-hidden="true"
        width="28"
        height="28"
      >
        <use href="/icons/sprite.svg#icon-ukraine" />
      </svg>
      <span className={s.text}>LearnLingo</span>
    </NavLink>
  );
};

export default Logo;
