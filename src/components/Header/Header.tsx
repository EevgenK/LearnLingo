import { useSelector } from 'react-redux';
import AuthNav from '../AuthNav/AuthNav';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import s from './Header.module.css';
import { selectAuth } from '../../redux/auth/selectors';
import { useMemo } from 'react';

const Header = () => {
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

  return (
    <header className={s.header}>
      <Logo />
      <ThemeSwitcher />
      <NavBar links={navItems} />
      <AuthNav />
    </header>
  );
};

export default Header;
