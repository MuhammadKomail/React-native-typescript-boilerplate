import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  I18nManager,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/homeScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';
import colors from '../styles/colors';
import {RootStackParamList} from '../types/navigationTypes';
import ChatScreen from '../screens/chatScreen/chatScreen';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');
const Tab = createBottomTabNavigator<RootStackParamList>();

const getIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Home':
      return focused ? 'home-sharp' : 'home-outline';
    case 'Alerts':
      return focused ? 'notifications-sharp' : 'notifications-outline';
    case 'Tickets':
      return 'ticket-sharp';
    case 'Profile':
      return focused ? 'person-sharp' : 'person-outline';
    case 'Chats':
      return focused ? 'chatbox-sharp' : 'chatbox-outline';
    default:
      return 'ellipse-outline';
  }
};

const CustomTabBar = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;

  return (
    <View
      style={[
        styles.tabContainer,
        {flexDirection: isRTL ? 'row-reverse' : 'row'},
      ]}>
      {state.routes
        .filter(
          (route: any) => descriptors[route.key].options.tabBarButton == null,
        )
        .map((route: {key: string; name: string}, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              (navigation as any).navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}>
              <View style={styles.iconWrapper}>
                <Icon
                  name={getIconName(route.name, isFocused)}
                  size={24}
                  color={isFocused ? colors.primary : colors.gray}
                />
              </View>
              <Text style={[styles.tabText, isFocused && styles.focusedText]}>
                {t(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', undefined)}
        style={[
          styles.middleButtonContainer,
          {
            [!isRTL ? 'right' : 'left']: width / 2 - 37,
          },
        ]}>
        <View style={styles.middleButton}>
          <Icon name="ticket-outline" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      {/* Visible tabs */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chats" component={ChatScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 5,
    height: 90,
    paddingBottom: 10,
    position: 'relative',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  middleButtonContainer: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: colors.white,
    borderRadius: 80,
    padding: 5,
    zIndex: 10,
  },
  middleButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  tabText: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 5,
  },
  focusedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  iconWrapper: {
    position: 'relative',
  },
});

export default BottomTab;
