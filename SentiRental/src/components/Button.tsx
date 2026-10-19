import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { fontSizes, radii, shadows, spacing, typeScale, useTheme } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  testID?: string;
};

export const Button = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  testID,
}: Props) => {
  const { colors, dark } = useTheme();
  const isInactive = disabled || loading;

  const backgroundColor =
    variant === 'primary'
      ? isInactive
        ? colors.borderStrong
        : colors.primary
      : 'transparent';

  const labelColor =
    variant === 'primary'
      ? isInactive
        ? colors.textSubtle
        : colors.onPrimary
      : colors.primary;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: loading }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor, borderColor: variant === 'secondary' ? colors.border : 'transparent' },
        variant === 'primary' && !isInactive && shadows.card,
        variant === 'primary' && !isInactive && { shadowColor: colors.shadow },
        variant === 'secondary' && styles.secondaryBorder,
        pressed && !isInactive && { opacity: dark ? 0.8 : 0.9 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={labelColor} />
      ) : (
        <Text style={[styles.label, typeScale.body, { color: labelColor }]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
  },
  secondaryBorder: {
    borderWidth: 1,
  },
  label: {
    fontSize: fontSizes.subtitle,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});
