import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { getThemeColors, getThemeClasses } from '../constants/colors';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Re-export das funções centralizadas
export { getThemeColors, getThemeClasses };
