import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors';
import { useMemo } from 'react';
export interface NavBarProps {
  type?: string;
}
const NavBar = ({ type }: NavBarProps) => {
  const isLoggedIn = useSelector(selectAuth);
  const navItems = useMemo(() => {
    const base = [
      { link: '/', title: 'Home' },
      { link: '/teachers', title: 'Teachers' },
    ];
    return isLoggedIn
      ? [...base, { link: '/favorites', title: 'Favorites' }]
      : base;
  }, [isLoggedIn]);
  const items = navItems.map((el) => {
    return (
      <li key={el.title}>
        <NavLink className={s.link} to={el.link}>
          {el.title}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className={clsx(type === 'main' && s.hidden)}>
      <ul className={clsx(s.nav, type !== 'main' && s.modal)}>{items}</ul>
    </nav>
  );
};

export default NavBar;
