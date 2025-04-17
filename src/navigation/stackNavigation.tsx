import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNetInfo} from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

// Note: Importing required components...!
import LanguageSelection from '../screens/languageSelection/languageSelection';
import LoginScreen from '../screens/loginScreen/loginScreen';
import OfflineScreen from '../screens/offlineScreen/offlineScreen';

// Note: array of screen data...!
const screenData = [
  {
    id: 1,
    screenName: 'language-selection',
    componentName: LanguageSelection,
  },
  {
    id: 2,
    screenName: 'login-screen',
    componentName: LoginScreen,
  },
  {
    id: 3,
    screenName: 'offline-screen',
    componentName: OfflineScreen,
  },
];

const StackNavigation = () => {
  const netInfo = useNetInfo();

  return (
    <>
      {/* {netInfo.isConnected ? ( */}
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
      {/* ) : (
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="offline-screen" component={OfflineScreen} />
        </Navigator>
      )} */}
    </>
  );
};

export default StackNavigation;
