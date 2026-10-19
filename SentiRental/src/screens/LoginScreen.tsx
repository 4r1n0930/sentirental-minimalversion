import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { Card, Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { supabase } from '../lib/supabase';
import { spacing, typeScale, useTheme } from '../theme';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type Errors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (loading || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert('Unable to sign in', error.message);
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
        <View style={[styles.mark, { backgroundColor: colors.primaryMuted }]}>
          <Text style={[styles.markText, { color: colors.primary }]}>S</Text>
        </View>
        <Text style={[styles.title, typeScale.display, { color: colors.text }]}>
          Welcome back
        </Text>
        <Text style={[styles.subtitle, typeScale.subtitle, { color: colors.textMuted }]}>
          Sign in to continue to your account.
        </Text>
      </View>

      <Card>
        <TextField
          label="Email"
          value={email}
          onChangeText={value => {
            setEmail(value);
            if (errors.email) {
              setErrors(current => ({ ...current, email: undefined }));
            }
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
            if (errors.password) {
              setErrors(current => ({ ...current, password: undefined }));
            }
          }}
          error={errors.password}
          placeholder="Enter your password"
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />

        <Button
          label="Sign in"
          onPress={handleLogin}
          loading={loading}
          testID="login-submit"
        />
      </Card>

      <View style={styles.footer}>
        <Text style={[styles.footerText, typeScale.body, { color: colors.textMuted }]}>
          New to Sentirental?
        </Text>
        <Button
          label="Create an account"
          variant="secondary"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.xxxl,
  },
  mark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  markText: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
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
