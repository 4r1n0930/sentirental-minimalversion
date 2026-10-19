export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 56,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const fontSizes = {
  display: 30,
  title: 22,
  subtitle: 17,
  body: 15,
  label: 13,
  caption: 12,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typeScale = {
  display: {
    fontSize: fontSizes.display,
    lineHeight: 38,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.6,
  },
  title: {
    fontSize: fontSizes.title,
    lineHeight: 28,
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: fontSizes.subtitle,
    lineHeight: 24,
    fontWeight: fontWeights.regular,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: fontSizes.body,
    lineHeight: 22,
    fontWeight: fontWeights.regular,
    letterSpacing: 0,
  },
  label: {
    fontSize: fontSizes.label,
    lineHeight: 18,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.4,
  },
  caption: {
    fontSize: fontSizes.caption,
    lineHeight: 16,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.2,
  },
} as const;

export const shadows = {
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  raised: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

export const durations = {
  fast: 120,
  normal: 220,
} as const;
