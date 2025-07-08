import {
  I18nManager,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';

/**
 * Utility function to get direction-aware styles
 * @param isRTL Whether the current language is RTL
 * @returns Object with direction-aware style properties
 */
export const getDirectionStyles = (isRTL = I18nManager.isRTL) => {
  return {
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  };
};

/**
 * Creates a style object with RTL-aware properties
 * @param baseStyles Base styles to apply
 * @param rtlOverrides Styles to override in RTL mode
 * @returns StyleSheet with RTL-aware styles
 */
export const createRTLAwareStyles = <T extends StyleSheet.NamedStyles<T>>(
  baseStyles: T,
  rtlOverrides?: Partial<T>,
): T => {
  if (!I18nManager.isRTL || !rtlOverrides) {
    return baseStyles;
  }

  const rtlStyles = {...baseStyles};

  // Apply RTL overrides
  Object.keys(rtlOverrides).forEach(key => {
    rtlStyles[key as keyof T] = {
      ...rtlStyles[key as keyof T],
      ...rtlOverrides[key as keyof T],
    } as any;
  });

  return rtlStyles;
};

/**
 * Flips margin/padding/position properties for RTL layouts
 * @param style The style to transform
 * @returns RTL-transformed style
 */
export const transformRTLStyle = (
  style: ViewStyle | TextStyle | ImageStyle,
): ViewStyle | TextStyle | ImageStyle => {
  if (!I18nManager.isRTL) return style;

  const transformed = {...style};

  // Flip margin and padding
  if ('marginLeft' in style) transformed.marginRight = style.marginLeft;
  if ('marginRight' in style) transformed.marginLeft = style.marginRight;
  if ('paddingLeft' in style) transformed.paddingRight = style.paddingLeft;
  if ('paddingRight' in style) transformed.paddingLeft = style.paddingRight;

  // Flip position
  if ('left' in style) transformed.right = style.left;
  if ('right' in style) transformed.left = style.right;

  return transformed;
};

/**
 * Check if a language is RTL
 * @param language Language code
 * @returns boolean indicating if the language is RTL
 */
export const isRTLLanguage = (language: string): boolean => {
  const rtlLanguages = ['ar', 'ur', 'he', 'fa'];
  return rtlLanguages.includes(language);
};
