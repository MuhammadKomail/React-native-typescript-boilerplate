import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { colors, typography } from '../styles/style';

// Simplified SparePart type
interface SparePart {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty?: number;
}

export interface SparePartsModalProps {
  visible: boolean;
  onClose: () => void;
  screenName?: string;
}

// Sample data
const sampleSpareParts: SparePart[] = [
  {
    id: '1',
    name: 'Water Filter',
    price: 120,
    imageUrl: 'https://example.com/water-filter.jpg',
  },
  {
    id: '2',
    name: 'Pressure Valve',
    price: 85,
    imageUrl: 'https://example.com/pressure-valve.jpg',
  },
  {
    id: '3',
    name: 'Heating Element',
    price: 150,
    imageUrl: 'https://example.com/heating-element.jpg',
  }
];

const SparePartsModal: React.FC<SparePartsModalProps> = ({
  visible,
  onClose,
  screenName = 'Request For Spare Parts'
}) => {
  const [selectedSpareParts, setSelectedSpareParts] = useState<SparePart[]>(sampleSpareParts);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Update quantities when selectedSpareParts changes
  useEffect(() => {
    if (selectedSpareParts) {
      setQuantities(Array(selectedSpareParts.length).fill(1));
    } else {
      setQuantities([]); // Reset quantities if selectedSpareParts is null
    }
  }, [selectedSpareParts]);

  // Increase quantity
  const increaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  // Decrease quantity
  const decreaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedSpareParts = selectedSpareParts.map((item, index) => ({
        ...item,
        qty: quantities[index],
      }));
      console.log('Confirmed spare parts with quantities:', updatedSpareParts);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.innerHeaderContainer}>
              <Text style={styles.header}>Requested Spare Parts - Cart</Text>
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>
                  {selectedSpareParts.length}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          {selectedSpareParts.length > 0 ? (
            selectedSpareParts.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.quantityAndPriceContainer}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => decreaseQuantity(index)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantities[index]}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => increaseQuantity(index)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>
                      SAR {(item.price * quantities[index]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>No spare parts selected.</Text>
          )}
          {!loading ? (
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>Confirm Your Request</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.confirmButton}>
              <ActivityIndicator color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: typography.fontSizes.size14,
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: typography.fontWeights.regular700,
    color: colors.black,
  },
  cartCount: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cartCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 15,
    color: 'grey',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.tertiary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SparePartsModal;
