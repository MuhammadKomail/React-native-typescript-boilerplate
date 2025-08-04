import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

// Note: Importing required components...!
import LanguageSelection from '../screens/languageSelection/languageSelection';
import LoginScreen from '../screens/loginScreen/loginScreen';
import OfflineScreen from '../screens/offlineScreen/offlineScreen';
import audioCall from '../screens/audioCall/audioCall';

// Note: array of screen data...!
const screenData = [
  {
    id: 1,
    screenName: 'audio-call',
    componentName: audioCall,
  },
  {
    id: 1,
    screenName: 'language-selection',
    componentName: LoginScreen,
  },
  {
    id: 2,
    screenName: 'offline-screen',
    componentName: OfflineScreen,
  },
  {
    id: 3,
    screenName: 'login-screen',
    componentName: LanguageSelection,
  },
];

const StackNavigation = () => {
  return (
    <>
      <Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
        {screenData.map(item => {
          return (
            <Screen
              key={item.id}
              name={item.screenName}
              component={item.componentName}
            />
          );
        })}
      </Navigator>
    </>
  );
};

export default StackNavigation;
