import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Platform,
  StatusBar,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {colors} from '../styles/style';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useAppDispatch} from '../redux/store';
import {logout} from '../redux/slices/authSlice/authSlice';
import {useTheme} from '../theme/ThemeContext';
import {showToast} from '../utils/toast';
import {tokenStorage} from '../services/storage';
import {ThemedIcon} from '../components/ThemedIcon';
import {lightTheme} from '../theme/theme';

type RootDrawerParamList = {
  Home: undefined;
  'help-screen': undefined;
  'privacy-screen': undefined;
  'faq-screen': undefined;
  'login-screen': undefined;
};

type DrawerItemType = {
  name: string;
  icon: string;
  route: keyof RootDrawerParamList;
};

// Note: Upper Drawer Data...!
const upperDrawerData: DrawerItemType[] = [
  {
    name: 'Home',
    icon: 'home',
    route: 'Home',
  },
];

// Note: Bottom Drawer Data...!
const bottomDrawerData: DrawerItemType[] = [
  {
    name: 'Help & Support',
    icon: 'help-outline',
    route: 'help-screen',
  },
];

const CustomDrawer = (props: any) => {
  // Note: Handeling navigation here...!
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const dispatch = useAppDispatch();

  // Note: Close Drawer...!
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const {theme, toggleTheme} = useTheme();

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

  const isRTL = I18nManager.isRTL;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContentContainer,
        {
          backgroundColor:
            theme === 'dark' ? lightTheme.border : lightTheme.background,
        },
      ]}>
      {/* Header Section */}
      <View
        style={[
          styles.headerSection,
          {paddingStart: isRTL ? 60 : 0, paddingEnd: isRTL ? 0 : 40},
        ]}>
        <TouchableOpacity
          onPress={closeDrawer}
          style={[
            styles.iconButton,
            {
              backgroundColor:
                theme === 'dark' ? lightTheme.border : colors.lightGray,
            },
          ]}>
          <ThemedIcon
            name={isRTL ? 'chevron-right' : 'chevron-left'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.iconButton,
            {
              backgroundColor:
                theme === 'dark' ? lightTheme.border : colors.lightGray,
            },
          ]}>
          <ThemedIcon
            name={theme === 'dark' ? 'light-mode' : 'dark-mode'}
            size={24}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View
          style={[
            styles.avatarContainer,
            {
              backgroundColor:
                theme === 'dark' ? lightTheme.border : colors.lightGray,
            },
          ]}>
          <ThemedIcon name="account-circle" size={80} />
        </View>
        <Text
          style={[
            styles.profileName,
            {color: theme === 'dark' ? lightTheme.text : colors.black},
          ]}>
          User Name
        </Text>
        <Text
          style={[
            styles.profileEmail,
            {color: theme === 'dark' ? lightTheme.text : colors.gray},
          ]}>
          user@example.com
        </Text>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor:
              theme === 'dark' ? lightTheme.border : colors.lightGray,
          },
        ]}
      />

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme === 'dark' ? lightTheme.text : colors.gray,
              width: '100%',
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}>
          Account
        </Text>
        {upperDrawerData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                paddingHorizontal: 16,
              },
            ]}
            onPress={() => item.route && navigation.navigate(item.route)}>
            <ThemedIcon
              name={item.icon}
              size={24}
              style={{marginLeft: isRTL ? 16 : 0, marginRight: isRTL ? 0 : 16}}
            />
            <Text
              style={[
                styles.menuText,
                {
                  flex: 1,
                  textAlign: isRTL ? 'right' : 'left',
                  color: theme === 'dark' ? lightTheme.text : colors.gray,
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

        <View
          style={[
            styles.divider,
            {
              backgroundColor:
                theme === 'dark' ? lightTheme.border : colors.lightGray,
            },
          ]}
        />

        {/* Legal Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme === 'dark' ? lightTheme.text : colors.gray,
              width: '100%',
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}>
          Legal
        </Text>
        {bottomDrawerData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              {
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                paddingHorizontal: 16,
              },
            ]}>
            <ThemedIcon
              name={item.icon}
              size={24}
              style={{marginLeft: isRTL ? 16 : 0, marginRight: isRTL ? 0 : 16}}
            />
            <Text
              style={[
                styles.menuText,
                {
                  flex: 1,
                  textAlign: isRTL ? 'right' : 'left',
                  color: theme === 'dark' ? lightTheme.text : colors.gray,
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={[
          styles.logoutBtn,
          {
            backgroundColor:
              theme === 'dark' ? lightTheme.border : colors.lightGray,
          },
        ]}>
        <ThemedIcon name="logout" size={24} color={colors.tertiary} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  headerSection: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingEnd: 60,
    marginBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 16,
  },
  menuSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 16,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  menuText: {
    fontSize: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.tertiary,
    marginLeft: 16,
  },
});
