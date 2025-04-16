import React from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { colors, typography } from '../../styles/style';

const ServicesSkeleton = () => {
  const renderSkeletonItem = () => (
    <View style={styles.serviceItem}>
      <View style={styles.checkbox} />
      <View style={styles.serviceText} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Array(5).fill(0)}
        renderItem={renderSkeletonItem}
        keyExtractor={(_, index) => index.toString()}
        nestedScrollEnabled
      />
    </View>
  );
};

export default ServicesSkeleton;

const styles = StyleSheet.create({
  container: {
    marginTop: typography.fontSizes.size10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: typography.fontSizes.size10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.gray,
    marginRight: 10,
    opacity: 0.3,
  },
  serviceText: {
    flex: typography.fontSizes.size1,
    height: 20,
    backgroundColor: colors.gray,
    borderRadius: 4,
    opacity: 0.3,
  },
  priceText: {
    width: 30,
    height: 20,
    backgroundColor: colors.gray,
    borderRadius: 4,
    opacity: 0.3,
  },
});
