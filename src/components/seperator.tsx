import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/style';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 10,
  },
});

export default Separator;