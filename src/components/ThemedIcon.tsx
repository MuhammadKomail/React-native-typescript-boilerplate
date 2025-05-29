import React from 'react';
import Icon from '@react-native-vector-icons/material-icons';
import {useStyledTheme} from '../hooks/useStyledTheme';
import {TextStyle} from 'react-native';

interface ThemedIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export const ThemedIcon: React.FC<ThemedIconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const {colors} = useStyledTheme();

  return (
    <Icon
      name={name}
      size={size}
      color={color || colors.textPrimary}
      style={style}
    />
  );
};
