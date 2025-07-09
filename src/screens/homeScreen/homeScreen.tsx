import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ThemedView} from '../../components/ThemedComponents';
import HomeHeader from '../../components/homeHeader';
import HomeSearch from '../../components/homeSearch';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const drawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <View style={[styles.content, {paddingTop: insets.top}]}>
        <HomeHeader title={'Guest'} drawer={drawerOpen} />
        <HomeSearch />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}></ScrollView>
      </View>
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
