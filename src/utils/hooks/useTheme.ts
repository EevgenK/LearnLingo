import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'default';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
