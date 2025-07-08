import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {colors, defaultStyles, typography} from '../styles/style';
import Button from './button';
import SparePartsModal from './sparePartsModal';

// Simplified spare part type
interface SparePart {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty?: number;
}

interface SparePartsSuggestionProps {
  btnText?: string;
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
  },
  {
    id: '4',
    name: 'Control Board',
    price: 210,
    imageUrl: 'https://example.com/control-board.jpg',
  },
  {
    id: '5',
    name: 'Water Pump',
    price: 180,
    imageUrl: 'https://example.com/water-pump.jpg',
  },
  {
    id: '6',
    name: 'Thermostat',
    price: 95,
    imageUrl: 'https://example.com/thermostat.jpg',
  },
];

const SparePartsSuggestion: React.FC<SparePartsSuggestionProps> = ({
  btnText = 'Request For Spare Parts',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpareParts, setSelectedSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Simulate search loading
    if (text.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const toggleSelect = (part: SparePart) => {
    setSelectedSpareParts(prev => {
      if (prev.some(selectedPart => selectedPart.id === part.id)) {
        return prev.filter(selectedPart => selectedPart.id !== part.id);
      } else {
        return [...prev, {...part, qty: 1}];
      }
    });
  };

  // Filter parts based on search query
  const filteredParts = searchQuery
    ? sampleSpareParts.filter(part =>
        part.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sampleSpareParts;

  return (
    <View style={styles.container}>
      <SparePartsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        screenName={btnText}
      />
      <Text style={defaultStyles.detailsTicketTitle}>
        Suggested Spare Parts
      </Text>
      <TextInput
        placeholder="Search Spare Parts"
        placeholderTextColor={colors.lightGray}
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors.tertiary}
          style={styles.loadingIndicator}
        />
      )}
      <View style={styles.grid}>
        {filteredParts.slice(0, 4).map(part => (
          <TouchableOpacity
            key={part.id}
            style={[
              styles.card,
              selectedSpareParts.some(
                selectedPart => selectedPart.id === part.id,
              )
                ? styles.cardSelected
                : styles.cardDefault,
            ]}
            onPress={() => toggleSelect(part)}>
            <View style={styles.cardContent}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.partName}>{part.name}</Text>
                <View
                  style={[
                    styles.checkboxOuter,
                    selectedSpareParts.some(
                      selectedPart => selectedPart.id === part.id,
                    )
                      ? styles.checkboxSelected
                      : styles.checkboxDefault,
                  ]}>
                  {selectedSpareParts.some(
                    selectedPart => selectedPart.id === part.id,
                  ) && <View style={styles.checkboxInner} />}
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Image source={{uri: part.imageUrl}} style={styles.image} />
                <Text style={styles.partPrice}>
                  SAR{' '}
                  {part.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title={btnText}
        onPress={() => {
          if (selectedSpareParts.length > 0) {
            setModalVisible(true);
          } else {
            // TODO: Show user feedback (e.g., Toast) if needed
          }
        }}
      />
    </View>
  );
};

export default SparePartsSuggestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayHue,
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: typography.fontSizes.size10,
    backgroundColor: colors.grayHue,
    borderWidth: typography.fontSizes.size1,
    borderRadius: typography.fontSizes.size8,
    marginVertical: typography.fontSizes.size10,
  },
  cardDefault: {
    borderColor: colors.gray,
  },
  cardSelected: {
    borderColor: colors.tertiary,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: typography.fontSizes.size10,
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partName: {
    fontSize: typography.fontSizes.size14,
    fontWeight: '700',
    flex: 1,
    marginRight: typography.fontSizes.size10,
  },
  partPrice: {
    color: colors.gray,
    fontSize: typography.fontSizes.size14,
  },
  checkboxOuter: {
    width: typography.fontSizes.size17,
    height: typography.fontSizes.size17,
    borderRadius: typography.fontSizes.small,
    borderWidth: typography.fontSizes.size2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: colors.tertiary,
  },
  checkboxDefault: {
    borderColor: colors.gray,
  },
  checkboxInner: {
    width: typography.fontSizes.size10,
    height: typography.fontSizes.size10,
    borderRadius: typography.fontSizes.size6,
    backgroundColor: colors.tertiary,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    backgroundColor: colors.grayHue,
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
    borderColor: colors.grayHue,
    color: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
});
