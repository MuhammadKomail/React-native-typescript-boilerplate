import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {imgPath, defaultStyles, colors, typography} from '../styles/style';

interface HomeHeaderProps {
  title: string;
  drawer: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({title, drawer}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Image
          source={imgPath.logo}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubTitle}>Welcome to ajeek</Text>
        </View>
      </View>
      <TouchableOpacity onPress={drawer} style={styles.rightContainer}>
        <Image
          source={imgPath.menuIcon}
          style={defaultStyles.menuIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    color: colors.white,
    fontSize: typography.fontSizes.large,
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fontFamilies.mullish,
  },
  headerSubTitle: {
    color: colors.white,
    fontSize: typography.fontSizes.medium,
    fontWeight: typography.fontWeights.regular400,
    fontFamily: typography.fontFamilies.mullish,
  },
  rightContainer: {},
});
