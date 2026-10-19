import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { Card, Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { supabase } from '../lib/supabase';
import { spacing, typeScale, useTheme } from '../theme';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export const SignUpScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Errors = {};

    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `Use at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Confirm your password';
    } else if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const clearError = (field: keyof Errors) => {
    setErrors(current => ({ ...current, [field]: undefined }));
  };

  const handleSignUp = async () => {
    if (loading || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert('Unable to create account', error.message);
        return;
      }

      if (data.user) {
        Alert.alert(
          'Check your inbox',
          'We sent you a confirmation link to verify your email address.',
          [{ text: 'Back to sign in', onPress: () => navigation.navigate('Login') }],
        );
      }
    } catch (err) {
      Alert.alert('Something went wrong', (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, typeScale.display, { color: colors.text }]}>
          Create your account
        </Text>
        <Text style={[styles.subtitle, typeScale.subtitle, { color: colors.textMuted }]}>
          Get started in less than a minute.
        </Text>
      </View>

      <Card>
        <TextField
          label="Email"
          value={email}
          onChangeText={value => {
            setEmail(value);
            clearError('email');
          }}
          error={errors.email}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={value => {
            setPassword(value);
            clearError('password');
          }}
          error={errors.password}
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
        />

        <TextField
          label="Confirm password"
          value={confirmPassword}
          onChangeText={value => {
            setConfirmPassword(value);
            clearError('confirmPassword');
          }}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={handleSignUp}
        />

        <Button
          label="Create account"
          onPress={handleSignUp}
          loading={loading}
          testID="signup-submit"
        />
      </Card>

      <View style={styles.footer}>
        <Text style={[styles.footerText, typeScale.body, { color: colors.textMuted }]}>
          Already have an account?
        </Text>
        <Button
          label="Sign in instead"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.xxxl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    maxWidth: 320,
  },
  footer: {
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },
  footerText: {
    textAlign: 'center',
  },
});
