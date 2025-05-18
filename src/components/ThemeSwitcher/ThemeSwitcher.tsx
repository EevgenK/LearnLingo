import { useState } from 'react';
import useTheme from '../../utils/hooks/useTheme';
import s from './ThemeSwitcher.module.css';
import clsx from 'clsx';
import { useRadialAnimation } from '../../utils/hooks/useRadialAnimation';

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
  const points = useRadialAnimation(colors.length, showColors, 40, 180, 150);
  const onHandleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    toggleTheme(e.currentTarget.title);
    setShowColors((prev) => !prev);
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
          const { x, y, visible } = points[index];

          return (
            <div
              key={color}
              className={clsx(s.colorCircle, visible && s.selected)}
              style={{
                backgroundColor: color,
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${(index + 1) * 150}ms`,
              }}
              onClick={onHandleChange}
              title={color}
            />
          );
        })}
    </div>
  );
};

export default ThemeSwitcher;
