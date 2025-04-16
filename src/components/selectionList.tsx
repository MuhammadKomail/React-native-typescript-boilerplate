import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import Checkbox from './checkbox';
import {colors, typography} from '../styles/style';

// Simplified service type
interface Service {
  id: string;
  name: string;
  price: number;
}

interface SelectionListProps {
  services?: Service[];
}

const formatCurrency = (amount: number) => {
  return amount?.toLocaleString('en-US', { style: 'currency', currency: 'SAR' });
};

// Sample data
const sampleServices: Service[] = [
  { id: '1', name: 'Basic Maintenance', price: 150 },
  { id: '2', name: 'Water Heater Repair', price: 250 },
  { id: '3', name: 'Pipe Leakage Fix', price: 180 },
  { id: '4', name: 'Drain Cleaning', price: 120 },
  { id: '5', name: 'Faucet Replacement', price: 90 },
  { id: '6', name: 'Toilet Repair', price: 200 },
  { id: '7', name: 'Water Pressure Check', price: 80 },
  { id: '8', name: 'Shower Installation', price: 350 },
];

const SelectionList: React.FC<SelectionListProps> = ({
  services = sampleServices,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(item => item.id === service.id);
      if (isSelected) {
        return prev.filter(item => item.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServiceItem = ({item}: {item: Service}) => {
    const isSelected = selectedServices.some(service => service.id === item.id);
    return (
      <View style={styles.serviceItem}>
        <Checkbox
          checked={isSelected}
          onPress={() => toggleService(item)}
          style={{marginRight: 10}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.serviceText}>{item.name}</Text>
          <Text style={styles.priceText}>{formatCurrency(item.price)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for Service"
        placeholderTextColor={colors.lightGray}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.fixedHeightContainer}>
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id}
          nestedScrollEnabled
        />
      </View>
    </View>
  );
};

export default SelectionList;

const styles = StyleSheet.create({
  container: {
    marginTop: typography.fontSizes.size10,
  },
  fixedHeightContainer: {
    height: 300, // Set your desired fixed height here
  },
  serviceItem: {
    fontFamily: typography.fontFamilies.mullish,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: typography.fontSizes.size10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceText: {
    width: '70%',
    fontSize: typography.fontSizes.size14,
    fontWeight: '500',
    color: colors.gray,
    fontFamily: typography.fontFamilies.mullish,
  },
  priceText: {
    width: '30%',
    fontSize: typography.fontSizes.size14,
    fontFamily: typography.fontFamilies.mullish,
    color: colors.tertiary,
    fontWeight: typography.fontWeights.regular700,
    textAlign: 'right',
  },
  searchBar: {
    height: 40,
    borderColor: colors.grayHue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
