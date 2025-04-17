import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import colors from '../styles/colors';
import typography from '../styles/typography';

const HomeSearch = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter ticket number to search"
        />
      </View>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: typography.fontSizes.size25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: typography.alignments.center,
    backgroundColor: colors.white,
    borderRadius: typography.fontSizes.size5,
    padding: typography.fontSizes.size3,
  },
  icon: {
    marginRight: typography.fontSizes.size10,
  },
  searchInput: {
    color: colors.black,
    fontFamily: typography.fontFamilies.mullish,
  },
});
