import { useColorScheme } from 'react-native';
import { darkColors, lightColors, ThemeColors } from './colors';

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

export const useTheme = (): Theme => {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  return { dark, colors: dark ? darkColors : lightColors };
};

export * from './colors';
export * from './tokens';
