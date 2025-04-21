import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {useStyledTheme} from '../hooks/useStyledTheme';

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  ...props
}) => {
  const {colors} = useStyledTheme();

  return (
    <Text style={[styles.text, {color: colors.text}, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
