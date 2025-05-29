import { StyleSheet, View, TextInput, I18nManager, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import typography from '../styles/typography';
import { useStyledTheme } from '../hooks/useStyledTheme';
import { fetchArticles, searchArticles } from '../redux/actions/newsAction/newsAction';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from '../utils/toast';

const HomeSearch = () => {

  const { colors } = useStyledTheme();
  const [searchText, setSearchText] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const loadArticles = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        if (searchText === '') {
          dispatch(fetchArticles() as any);
        } else {
          dispatch(searchArticles(searchText) as any);
        }
      } else {
        showToast({
          type: 'error',
          message: 'No internet connection',
          duration: 1000,
          position: 'bottom',
        });
      }
    };
    loadArticles();
  }, [searchText]);

  return (
    <View style={styles.searchContainer}>
      <View
        style={[
          styles.inputContainer,
          {
            flexDirection: 'row',
            backgroundColor: colors.backgroundPrimary,
            borderColor: colors.borderLight,
            ...Platform.select({
              ios: { shadowColor: colors.text },
              android: {},
            }),
          },
        ]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSecondary }]}>
          <Icon name="search" size={22} color={colors.primary} />
        </View>
        <TextInput
          style={[
            styles.searchInput,
            {
              textAlign: 'left',
              color: colors.text,
            },
          ]}
          placeholder={'Search for news articles...'}
          placeholderTextColor={colors.textSecondary}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity onPress={() => setSearchText('')} style={styles.closeIcon}>
          <Icon name="close" size={22} color={colors.primary} />
        </TouchableOpacity>
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
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamilies.mullish,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
