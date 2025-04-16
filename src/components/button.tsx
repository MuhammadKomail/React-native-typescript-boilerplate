import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import defaultStyles from '../styles/defaultStyles';
import { colors } from '../styles/style';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  title,
  onPress, 
  style, 
  backgroundColor = colors.primary,
  textColor = colors.white,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.primaryButton,
        { backgroundColor },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text 
        style={[
          defaultStyles.primaryButtonText,
          { color: textColor }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;