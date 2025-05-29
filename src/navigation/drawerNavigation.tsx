import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import HomeScreen from '../screens/homeScreen/homeScreen';
import BookmarksScreen from '../screens/bookmarksScreen/bookmarksScreen';
import NewsDetailScreen from '../screens/newsDetailScreen/newsDetailScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  return (
    <Drawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('window').width * 0.85,
          backgroundColor: 'white',
          right: 0,
          transform: [
            {
              translateX: 20,
            },
          ],
        },
        swipeEnabled: false,
        overlayColor: 'rgba(0,0,0,0.5)',
      }}>
      <Drawer.Screen
        name="Home-Screen"
        component={HomeScreen} 
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Bookmarks-Screen"
        component={BookmarksScreen}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
