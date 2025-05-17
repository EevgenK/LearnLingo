import { useSelector } from 'react-redux';
import AuthNav from '../AuthNav/AuthNav';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import s from './Header.module.css';
import BurgerBtn from '../BurgerBtn/BurgerBtn';
import Container from '../shared/Container/Container';

const Header = () => {
  return (
    <header>
      <Container additionalClass={s.header}>
        <Logo />
        <ThemeSwitcher />
        <BurgerBtn />
        <NavBar type="main" />
        <AuthNav type="main" />
      </Container>
    </header>
  );
};

export default Header;
