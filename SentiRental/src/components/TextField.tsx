import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { fontSizes, radii, spacing, typeScale, useTheme } from '../theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export const TextField = ({ label, error, onBlur, onFocus, ...inputProps }: Props) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, typeScale.label, { color: colors.textMuted }]}>
        {label}
      </Text>

      <TextInput
        {...inputProps}
        onFocus={event => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setFocused(false);
          onBlur?.(event);
        }}
        accessibilityLabel={label}
        placeholderTextColor={colors.textSubtle}
        style={[
          styles.input,
          typeScale.body,
          { color: colors.text, backgroundColor: colors.surface, borderColor },
        ]}
      />

      {!!error && (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.error, typeScale.caption, { color: colors.danger }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: fontSizes.body,
  },
  error: {
    marginTop: spacing.sm,
  },
});
