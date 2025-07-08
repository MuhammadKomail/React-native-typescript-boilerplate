import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {colors, typography} from '../styles/style';

// Simplified type for spare parts
interface SparePart {
  id: string;
  name: string;
  price: string;
  stock: number;
  image?: string;
}

interface SparePartsInStockProps {
  items?: SparePart[];
}

const SparePartsInStock: React.FC<SparePartsInStockProps> = ({
  items = sampleItems, // Default to sample items if none provided
}) => {
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>(
    {},
  );

  const toggleSelect = (part: SparePart) => {
    setSelectedItems(prev => {
      const newSelected = {...prev};

      if (newSelected[part.id]) {
        delete newSelected[part.id];
      } else {
        newSelected[part.id] = 1;
      }

      return newSelected;
    });
  };

  const updateQuantity = (partId: string, increment: boolean) => {
    setSelectedItems(prev => {
      const newSelected = {...prev};

      if (!newSelected[partId]) return prev;

      const part = items.find(p => p.id === partId);
      if (!part) return prev;

      const currentQty = newSelected[partId];
      const maxQty = part.stock;

      if (increment && currentQty < maxQty) {
        newSelected[partId] = currentQty + 1;
      } else if (!increment && currentQty > 1) {
        newSelected[partId] = currentQty - 1;
      }

      return newSelected;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollableList} nestedScrollEnabled={true}>
        {items.map(part => {
          const isSelected = selectedItems[part.id] !== undefined;
          const currentQty = selectedItems[part.id] || 0;
          const maxQty = part.stock;
          const isPlusDisabled = isSelected && currentQty >= maxQty;
          const isMinusDisabled = !isSelected || currentQty <= 1;

          return (
            <View key={part.id} style={styles.card}>
              <Image
                source={{uri: part.image && part.image}}
                style={styles.image}
              />
              <View style={styles.detailsContainer}>
                <View style={styles.partInfoContainer}>
                  <Text style={styles.partName}>{part.name}</Text>
                  <TouchableOpacity
                    onPress={() => toggleSelect(part)}
                    style={[
                      styles.radioButton,
                      isSelected && styles.radioSelected,
                    ]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </TouchableOpacity>
                </View>
                <Text style={styles.stock}>In Stock: {part.stock}</Text>
                <View style={styles.quantityContainer}>
                  <View>
                    <TouchableOpacity
                      onPress={
                        isMinusDisabled
                          ? undefined
                          : () => updateQuantity(part.id, false)
                      }
                      style={
                        isMinusDisabled ? styles.buttonDisabled : styles.button
                      }
                      disabled={isMinusDisabled}>
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      {isSelected ? currentQty : 0}
                    </Text>
                    <TouchableOpacity
                      onPress={
                        isPlusDisabled
                          ? undefined
                          : () => updateQuantity(part.id, true)
                      }
                      style={
                        isPlusDisabled ? styles.buttonDisabled : styles.button
                      }
                      disabled={isPlusDisabled}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.price}>SAR {part.price}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

// Sample data for demonstration
const sampleItems: SparePart[] = [
  {
    id: '1',
    name: 'Water Filter',
    price: '120',
    stock: 5,
    image: 'https://example.com/water-filter.jpg',
  },
  {
    id: '2',
    name: 'Pressure Valve',
    price: '85',
    stock: 3,
    image: 'https://example.com/pressure-valve.jpg',
  },
  {
    id: '3',
    name: 'Heating Element',
    price: '150',
    stock: 2,
    image: 'https://example.com/heating-element.jpg',
  },
  {
    id: '4',
    name: 'Control Board',
    price: '210',
    stock: 1,
    image: 'https://example.com/control-board.jpg',
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  partName: {
    fontWeight: typography.fontWeights.regular700,
    fontSize: typography.fontSizes.size14,
    fontFamily: typography.fontFamilies.mullish,
    width: '70%',
  },
  stock: {
    color: colors.green,
    fontWeight: '500',
    fontSize: 12,
    fontFamily: typography.fontFamilies.mullish,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.gray,
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 14,
    color: colors.gray,
  },
  price: {
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular700,
    color: colors.tertiary,
    fontFamily: typography.fontFamilies.mullish,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioSelected: {
    backgroundColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  partInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollableList: {
    maxHeight: 400,
  },
});

export default SparePartsInStock;
