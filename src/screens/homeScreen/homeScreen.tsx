import {StyleSheet, View, ImageBackground, ScrollView} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {imgPath, defaultStyles} from '../../styles/style';
import HomeHeader from '../../components/homeHeader';
import HomeSearch from '../../components/homeSearch';
import RequestCard from '../../components/requestCard';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const drawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <ImageBackground
      source={imgPath.backgroundImg}
      style={defaultStyles.bgImg}
      resizeMode="cover">
      <View style={[styles.mainContainer, {paddingTop: insets.top}]}>
        <HomeHeader title={'Guest'} drawer={drawerOpen} />
        <HomeSearch />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RequestCard />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
