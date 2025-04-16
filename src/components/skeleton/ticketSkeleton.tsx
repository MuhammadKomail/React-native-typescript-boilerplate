import { View, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../styles/style';

const TicketSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonHeader} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonButtonContainer}>
        <View style={styles.skeletonButton} />
        <View style={styles.skeletonButton} />
      </View>
    </View>
  );
};

export default TicketSkeleton;

const styles = StyleSheet.create({
  skeletonContainer: {
    backgroundColor: colors.grayHue,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    shadowColor: colors.gray,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
  },
  skeletonHeader: {
    width: '50%',
    height: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonLine: {
    width: '100%',
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  skeletonButton: {
    width: '45%',
    height: 35,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
});
