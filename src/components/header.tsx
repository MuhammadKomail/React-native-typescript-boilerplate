import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/material-icons';
import { colors, defaultStyles, imgPath } from '../styles/style';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useAppDispatch, useAppSelector, type RootState } from '../redux/store';

interface HeaderProps {
  title: string;
  screenName: string;
}

const Header: React.FC<HeaderProps> = ({ title, screenName }) => {
  const insets = useSafeAreaInsets();

  // Note: Handling navigation here
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useAppSelector(
    (state: RootState) => state.auth,
  );
  console.log('AUTHENTICATED USER', user);

  const dispatch = useAppDispatch();
  // Note: Drawer Open Function...!
  const drawerOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // Note: Go Back Function...!
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ImageBackground
        source={imgPath.bgHeader}
        style={{ paddingTop: insets.top, paddingHorizontal: 10 }}>
        <View style={[defaultStyles.headerContainer, { paddingVertical: 10 }]}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-back" color={colors.white} size={25} />
          </TouchableOpacity>
          <Text style={defaultStyles.headerText}>{title}</Text>
          <TouchableOpacity onPress={drawerOpen}>
            <Image
              source={imgPath.menuIcon}
              style={defaultStyles.menuIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrowStyle: {
    // height: 40,
    // width: 40,
    resizeMode: 'contain',
  },
});
