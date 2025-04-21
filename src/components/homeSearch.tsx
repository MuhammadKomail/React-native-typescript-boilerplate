import {StyleSheet, View, TextInput, I18nManager, Platform} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import {useTranslation} from 'react-i18next';

const HomeSearch = () => {
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.searchContainer}>
      <View
        style={[
          styles.inputContainer,
          {flexDirection: isRTL ? 'row-reverse' : 'row'},
        ]}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={22} color={colors.primary} />
        </View>
        <TextInput
          style={[styles.searchInput, {textAlign: isRTL ? 'right' : 'left'}]}
          placeholder={t('Enter ticket number to search')}
          placeholderTextColor={colors.gray}
        />
      </View>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: typography.fontSizes.size25,
    paddingHorizontal: 16,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    margin: 4,
  },
  searchInput: {
    flex: 1,
    color: colors.black,
    fontFamily: typography.fontFamilies.mullish,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: 48,
  },
});
