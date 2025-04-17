import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/homeScreen';
import ProfileScreen from '../screens/profileScreen/profileScreen';
import colors from '../styles/colors';
import {RootStackParamList} from '../types/navigationTypes';
import ChatScreen from '../screens/chatScreen/chatScreen';

const {width} = Dimensions.get('window');
const Tab = createBottomTabNavigator<RootStackParamList>();

const CustomTabBar = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;
  // Note: Fetching data from redux...!
  // const {authenticatedUser} = useAppSelector(
  //   (state: RootState) => state.authState,
  // );

  // const {ticketList} = useAppSelector((state: RootState) => state.ticketState);

  // Note: Handeling dispatch here...!
  // const dispatch = useAppDispatch();

  // Note: This hook will run when component mounts....!
  // useEffect(() => {
  //   if (authenticatedUser) {
  //     dispatch(
  //       fetchTicketByTechnicianId({
  //         technicianId: authenticatedUser?.technicianId,
  //         status: 'Assigned',
  //       }),
  //     );
  //   }
  // }, []);

  return (
    <View style={styles.tabContainer}>
      {/* Render visible tabs */}
      {state.routes
        .filter((route: any) => {
          const tabBarButton = descriptors[route.key].options.tabBarButton;
          return typeof tabBarButton !== 'function' || tabBarButton() !== null;
        })
        .map((route: {key: string; name: string}, index: number) => {
          const {options} = descriptors[route.key];
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

          // const showBadge = route.name === 'Alerts';
          // const badgeCount = ticketList?.length || 0;

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
                {/* {showBadge && badgeCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCount}</Text>
                  </View>
                )} */}
              </View>
              <Text style={[styles.tabText, isFocused && styles.focusedText]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}

      {/* Middle Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.middleButtonContainer}>
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
    left: width / 2 - 37,
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
