import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import navigationService from './navigationService';
import DrawerNavigation from './drawerNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from '../theme/ThemeContext';
import {lightTheme, darkTheme} from '../theme/theme';

const NavigationContent = () => {
  const {theme} = useTheme();

  const navigationTheme =
    theme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            ...darkTheme,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            ...lightTheme,
          },
        };

  return (
    <NavigationContainer
      theme={navigationTheme}
      ref={ref => navigationService.setTopLevelNavigator(ref)}>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
