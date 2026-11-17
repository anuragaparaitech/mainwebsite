import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check saved user preference in localStorage
    try {
      const saved = localStorage.getItem('aparaitech-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // LocalStorage access may fail in private browsing
    }

    // 2. Fall back to system preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }

    // 3. Default to light mode (matches existing website)
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Apply temporary transition class for smooth theme shift
    root.classList.add('theme-transition');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem('aparaitech-theme', theme);
    } catch {
      // Ignore localStorage write failures
    }

    const timer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 350);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
