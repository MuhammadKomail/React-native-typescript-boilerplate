import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../styles/style';

const SparePartSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.partName} />
          <View style={styles.stock} />
          <View style={styles.quantityContainer}>
            <View style={styles.button} />
            <View style={styles.quantity} />
            <View style={styles.button} />
          </View>
        </View>
        <View style={styles.radioButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: colors.grayHue,
    borderRadius: 10,
  },
  detailsContainer: {flex: 1, marginLeft: 10},
  partName: {
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 5,
  },
  stock: {
    height: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    marginHorizontal: 5,
  },
  quantity: {
    width: 30,
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: colors.lightGray,
  },
});

export default SparePartSkeleton;
