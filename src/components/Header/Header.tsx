import AuthNav from '../AuthNav/AuthNav';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
      <ThemeSwitcher />
      <NavBar
        links={[
          { link: '/', title: 'Home' },
          { link: '/teachers', title: 'Teachers' },
        ]}
      />
      <AuthNav />
    </header>
  );
};

export default Header;
