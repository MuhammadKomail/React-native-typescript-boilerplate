import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacityProps,
  I18nManager,
} from 'react-native';
import {useStyledTheme} from '../hooks/useStyledTheme';

// Themed View Component
export const ThemedView: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({children, style}) => {
  const {colors} = useStyledTheme();
  return (
    <View style={[{backgroundColor: colors.backgroundPrimary}, style]}>
      {children}
    </View>
  );
};

// Themed Text Component
import { StyleProp } from 'react-native';
export const ThemedText: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}> = ({children, style}) => {
  const {colors} = useStyledTheme();
  return (
    <Text
      style={[
        {
          color: colors.textPrimary,
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

// Themed Card Component
export const ThemedCard: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({children, style}) => {
  const {colors} = useStyledTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundCard,
          borderColor: colors.borderLight,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

// Themed Button Component
export const ThemedButton: React.FC<
  TouchableOpacityProps & {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
  }
> = ({title, variant = 'primary', style, ...props}) => {
  const {colors} = useStyledTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.primary,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      {...props}>
      <Text
        style={[
          styles.buttonText,
          {
            color: variant === 'outline' ? colors.primary : colors.textLight,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Themed Input Component
export const ThemedInput: React.FC<TextInputProps & {style?: TextStyle}> = ({
  style,
  ...props
}) => {
  const {colors} = useStyledTheme();
  return (
    <TextInput
      style={[
        styles.input,
        {
          color: colors.textPrimary,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderLight,
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
