import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  container: { padding: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  detailsContainer: { flex: 1, marginLeft: 10 },
  partName: { height: 20, backgroundColor: '#d3d3d3', borderRadius: 5, marginBottom: 5 },
  stock: { height: 15, backgroundColor: '#d3d3d3', borderRadius: 5, marginBottom: 5 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 5,
  },
  quantity: { width: 30, height: 20, backgroundColor: '#d3d3d3', borderRadius: 5 },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E4C7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#d3d3d3',
  },
});

export default SparePartSkeleton;