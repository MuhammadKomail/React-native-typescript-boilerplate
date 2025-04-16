import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './bottomTabNavigation';
import CustomDrawer from './customDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: 'right',
      }}>
      <Drawer.Screen 
        name="home-tabs" 
        component={BottomTab}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
