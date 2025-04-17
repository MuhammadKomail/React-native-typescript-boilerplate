import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {imgPath, colors, defaultStyles} from '../styles/style';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useAppDispatch} from '../redux/store';
import {logout} from '../redux/slices/authSlice/authSlice';

type RootDrawerParamList = {
  Home: undefined;
  'help-screen': undefined;
  'privacy-screen': undefined;
  'faq-screen': undefined;
  'login-screen': undefined;
};

type DrawerItemType = {
  name: string;
  icon: unknown;
  route: keyof RootDrawerParamList;
};
import {showToast} from '../utils/toast';
import {tokenStorage} from '../services/storage';

// Note: Upper Drawer Data...!
const upperDrawerData: DrawerItemType[] = [
  {
    name: 'Home',
    icon: imgPath.home,
    route: 'Home',
  },
];

// Note: Bottom Drawer Data...!
const bottomDrawerData: DrawerItemType[] = [
  {
    name: 'Help & Support',
    icon: imgPath.help,
    route: 'help-screen',
  },
];

const CustomDrawer = (props: unknown) => {
  // Note: Handeling navigation here...!
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const dispatch = useAppDispatch();

  // Note: Close Drawer...!
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  // Note: Logout user...!
  const handleLogout = () => {
    closeDrawer();
    // Dispatch Redux logout action
    dispatch(logout());
    // Clear tokens from storage
    tokenStorage.clearTokens();
    // Show success message
    showToast({
      type: 'success',
      message: 'Logged out successfully',
    });
    // Navigate to login screen
    // navigation.navigate('login-screen');
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainer}>
      {/* Header Section */}
      <TouchableOpacity onPress={closeDrawer} style={defaultStyles.drawerClose}>
        <Image style={defaultStyles.drawerIcon} source={imgPath.arrow} />
      </TouchableOpacity>

      <View style={styles.flexGrow}>
        {/* Drawer Items */}
        <Text style={defaultStyles.drawerHeading}>Account</Text>
        {upperDrawerData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[defaultStyles.drawerItem, styles.drawerItemPadding]}
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route);
                }
              }}>
              <Image
                source={item.icon}
                style={[defaultStyles.drawerIcon, styles.drawerIconSmall]}
                resizeMode="contain"
              />
              <Text style={defaultStyles.drawerText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
        <Text style={defaultStyles.drawerHeading}>Legal</Text>
        {bottomDrawerData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[defaultStyles.drawerItem, styles.drawerItemPadding]}
              onPress={() => {
                // if (item.route) {
                // navigation.navigate(item.route);
                // }
              }}>
              <Image
                source={item.icon}
                style={[defaultStyles.drawerIcon, styles.drawerIconSmall]}
                resizeMode="contain"
              />
              <Text style={defaultStyles.drawerText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Image
          source={imgPath.logout}
          resizeMode="contain"
          style={defaultStyles.drawerIcon}
        />

        <Text style={[defaultStyles.drawerText, styles.logoutText]}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContentContainer: {
    flexGrow: 1,
    marginLeft: 10,
  },
  flexGrow: {
    flexGrow: 1,
  },
  drawerItemPadding: {
    paddingVertical: 10,
  },
  drawerIconSmall: {
    width: 24,
    height: 24,
  },
  logoutText: {
    color: colors.tertiary,
  },

  logoutBtn: {
    padding: 15,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 8,
  },
});
