import {useTheme} from '../theme/ThemeContext';
import {lightTheme, darkTheme} from '../theme/theme';

export const useStyledTheme = () => {
  const {theme} = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return {
    colors,
    theme,
  };
};
