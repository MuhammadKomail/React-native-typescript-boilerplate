import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';
import React from 'react';
import {imgPath, colors} from '../styles/style';
import {ThemedText} from './ThemedComponents';
import {ThemedIcon} from './ThemedIcon';
import {useStyledTheme} from '../hooks/useStyledTheme';
import {useTheme} from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const HomeHeader: React.FC = () => {

  const {colors, theme} = useStyledTheme();
  const {toggleTheme} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>


      <View style={styles.leftContainer}>
        <Image
          source={imgPath.logo}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <ThemedText style={styles.headerTitle}>Guest</ThemedText>
          <ThemedText style={styles.headerSubTitle}>
            Welcome to News
          </ThemedText>
        </View>
      </View>

      {/* Theme toggle button */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bookmarks-Screen' as never)}
          style={[
            styles.menuButton,
            {
              backgroundColor: theme === 'dark' ? colors.black : colors.white,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            },
          ]}
        >
          <ThemedIcon
            name="bookmark"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.menuButton,
            {
              backgroundColor: theme === 'dark' ? colors.black : colors.white,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <ThemedIcon
            name={theme === 'dark' ? 'light-mode' : 'dark-mode'}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
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
  textContainer: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  menuButton: {
    padding: 8,
    marginHorizontal: 0,
  },
});
