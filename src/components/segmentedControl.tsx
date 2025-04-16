import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SegmentedControlProps {
  options: string[];
  onChange?: (index: number) => void;
  selectedTextColor?: string;
  selectedBackgroundColor?: string;
  nonSelectedTextColor?: string;
  nonSelectedBackgroundColor?: string;
  borderRadius?: number;
}

const SegmentedControl = ({
  options = [],
  onChange = (index: number) => {},
  selectedTextColor = '#fff',
  selectedBackgroundColor = '#007BFF',
  nonSelectedTextColor = '#555',
  nonSelectedBackgroundColor = '#F0F0F0',
  borderRadius = 8,
}: SegmentedControlProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <View style={[styles.container, { 
        borderRadius,
          backgroundColor: nonSelectedBackgroundColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3, // For Android shadow
     }]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedIndex === index
              ? { backgroundColor: selectedBackgroundColor }
              : { backgroundColor: nonSelectedBackgroundColor },
          ]}
          onPress={() => handlePress(index)}
        >
          <Text
            style={[
              styles.segmentText,
              selectedIndex === index
                ? { color: selectedTextColor }
                : { color: nonSelectedTextColor },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SegmentedControl;
