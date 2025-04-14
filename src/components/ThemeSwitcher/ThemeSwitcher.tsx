import { useState } from 'react';
import useTheme from '../../utils/hooks/useTheme';
import s from './ThemeSwitcher.module.css';
import clsx from 'clsx';

const colors = [
  'var(--first-theme)',
  'var(--second-theme)',
  'var(--third-theme)',
  'var(--fourth-theme)',
  'var(--fifth-theme)',
];
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [showColors, setShowColors] = useState(false);
  const onHandleChange = (e) => {
    toggleTheme(e.target.title);
    setShowColors(!showColors);
  };

  return (
    <div className={s.circleContainer}>
      <button
        className={s.mainButton}
        onClick={() => setShowColors(!showColors)}
      >
        Choose theme
      </button>

      {showColors &&
        colors.map((color, index) => {
          const angle = (180 / colors.length) * index;
          const radius = 40;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={color}
              className={clsx(s.colorCircle, theme === color && s.selected)}
              style={{
                backgroundColor: color,
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={onHandleChange}
              title={color}
            />
          );
        })}
    </div>

    // <div>
    //   <button className={s.btn}>Change color</button>
    //   <p>Change color: {theme}</p>
    //   <button onClick={() => toggleTheme('grey-green')}>Темна тема</button>
    //   <button onClick={() => toggleTheme('purple')}>Світла тема</button>
    //   <button onClick={() => toggleTheme('orange')}>Світла тема</button>
    // </div>
  );
};

export default ThemeSwitcher;
