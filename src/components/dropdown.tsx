import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const LANGUAGE_KEY = 'selectedLanguage';

const CustomDropdown = ({
  data,
  onSelect,
  maxVisibleItems = 4,
  width = '80%',
}: {
  data: string[];
  onSelect: (item: string) => void;
  maxVisibleItems?: number;
  width?: number | `${number}%`;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('English'); // Default to English
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const ITEM_HEIGHT = 40;
  const MAX_HEIGHT = maxVisibleItems * ITEM_HEIGHT;

  useEffect(() => {
    // Load the stored language on app start
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLanguage) {
          setSelectedItem(storedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language:', error);
      }
    };

    loadLanguage();
  }, []);

  const handleSelect = async (item: string) => {
    if (isAnimating) return;

    setSelectedItem(item);
    onSelect(item);

    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, item);
    } catch (error) {
      console.error('Failed to save language:', error);
    }

    setIsAnimating(true);
    Animated.parallel([
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(arrowRotation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
      setIsAnimating(false);
    });
  };

  const toggleDropdown = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (isOpen) {
      // Close dropdown
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsOpen(false);
        setIsAnimating(false);
      });
    } else {
      // Open dropdown
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: MAX_HEIGHT,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsOpen(true);
        setIsAnimating(false);
      });
    }
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown} activeOpacity={0.8}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.selectedText}>
          {selectedItem}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: arrowRotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}
        >
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.dropdownContainer, { height: dropdownHeight }]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)} disabled={isAnimating} activeOpacity={0.7}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Keeps text and icon aligned
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 15
  },
  selectedText: {
    flex: 1, // Allows text to shrink if necessary
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  item: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;
