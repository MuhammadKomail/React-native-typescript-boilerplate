const typography = {
  fontSizes: {
    size1: 1,
    size2: 2,
    size3: 3,
    size4: 4,
    size5: 5,
    size6: 6,
    size7: 7,
    size8: 8,
    size9: 9,
    size10: 10,
    size11: 11,
    size13: 13,
    size14: 14,
    size15: 15,
    size17: 17,
    size19: 19,
    size21: 21,
    size22: 22,
    size23: 23,
    size25: 25,
    size26: 26,
    size27: 27,
    size28: 28,
    size29: 29,
    size30: 30,
    small: 12,
    medium: 16,
    regular: 18,
    large: 20,
    extraLarge: 24,
  },

  fontWeights: {
    regular400: '400' as const,
    regular600: '600' as const,
    regular700: '700' as const,
    bold: 'bold' as const,
  },

  fontFamilies: {
    default: 'Roboto, Arial, sans-serif',
    mullish: 'Mulish-Regular',
  },

  alignments: {
    center: 'center' as const,
    start: 'flex-start' as const,
    end: 'flex-end' as const,
  },
};

export default typography;
