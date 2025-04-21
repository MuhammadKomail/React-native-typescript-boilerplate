import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import React from 'react';
import {imgPath} from '../styles/style';
import {ThemedText} from './ThemedComponents';
import {ThemedIcon} from './ThemedIcon';
import {useTranslation} from 'react-i18next';

interface HomeHeaderProps {
  title: string;
  drawer: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({title, drawer}) => {
  const isRTL = I18nManager.isRTL;
  const {t} = useTranslation();

  return (
    <View style={styles.headerContainer}>
      {/* Menu button for RTL */}
      {isRTL && (
        <TouchableOpacity onPress={drawer} style={styles.menuButton}>
          <ThemedIcon name="menu" size={24} />
        </TouchableOpacity>
      )}

      <View style={[styles.leftContainer, isRTL && styles.leftContainerRTL]}>
        <Image
          source={imgPath.logo}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <ThemedText style={styles.headerTitle}>{t(title)}</ThemedText>
          <ThemedText style={styles.headerSubTitle}>
            {t('Welcome to ajeek')}
          </ThemedText>
        </View>
      </View>

      {/* Menu button for LTR */}
      {!isRTL && (
        <TouchableOpacity onPress={drawer} style={styles.menuButton}>
          <ThemedIcon name="menu" size={24} />
        </TouchableOpacity>
      )}
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
  leftContainerRTL: {
    flexDirection: 'row-reverse', // Reverse direction for RTL
  },
  image: {
    height: 40,
    width: 40,
  },
  textContainer: {
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
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
  },
});
