import React from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';
import {useStyledTheme} from '../hooks/useStyledTheme';

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  ...props
}) => {
  const {colors} = useStyledTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: colors.background}, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
