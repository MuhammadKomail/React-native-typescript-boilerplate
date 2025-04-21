import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {I18nManager, Dimensions} from 'react-native';
import CustomDrawer from './customDrawer';
import BottomTab from './bottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const isRTL = I18nManager.isRTL;

  return (
    <Drawer.Navigator
      defaultStatus="closed"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: isRTL ? 'left' : 'right',
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('window').width * 0.85,
          backgroundColor: 'white',
          [isRTL ? 'left' : 'right']: 0,
          transform: [
            {
              translateX: isRTL ? 20 : -20,
            },
          ],
        },
        swipeEnabled: false,
        overlayColor: 'rgba(0,0,0,0.5)',
      }}>
      <Drawer.Screen
        name="home-tabs"
        component={BottomTab}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
