import { useState } from 'react';
import s from './BurgerBtn.module.css';
import { RxHamburgerMenu, RxBorderSolid } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openModal } from '../../redux/modal/slice';

const BurgerBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    dispatch(openModal({ type: 'menu' }));
    setIsHovered(false);
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={s.burgerBtn}
      aria-label="Open menu button"
    >
      {isHovered ? (
        <RxBorderSolid className={s.svg} />
      ) : (
        <RxHamburgerMenu className={s.svg} />
      )}
    </button>
  );
};

export default BurgerBtn;
