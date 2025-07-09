import React, {createContext, useContext, useEffect, useState} from 'react';
import {tokenStorage} from '../services/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Load saved theme when app starts
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    // try {
    const savedTheme = tokenStorage.getToken();
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
    // } catch (error) {
    //   throw error;
    // }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    tokenStorage.saveToken(newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
