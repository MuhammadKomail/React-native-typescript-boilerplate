import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

// Note: Importing required components...!
import LanguageSelection from '../screens/languageSelection/languageSelection';
import LoginScreen from '../screens/loginScreen/loginScreen';
import OfflineScreen from '../screens/offlineScreen/offlineScreen';
import AudioCall from '../screens/audioCall/audioCall';
import MapScreen from '../screens/mapScreen/mapScreen';

// Note: array of screen data...!
const screenData = [
  {
    id: 1,
    screenName: 'map-screen',
    componentName: MapScreen,
  },
  {
    id: 2,
    screenName: 'audio-call',
    componentName: AudioCall,
  },
  {
    id: 3,
    screenName: 'language-selection',
    componentName: LoginScreen,
  },
  {
    id: 4,
    screenName: 'offline-screen',
    componentName: OfflineScreen,
  },
  {
    id: 5,
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
