import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '../styles/style';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        style,
        {backgroundColor: checked ? colors.tertiary : colors.white},
      ]}
      onPress={onPress}>
      <Text style={{color: colors.white}}>{checked ? '✓' : ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;
