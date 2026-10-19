import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useTheme } from '../theme';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AppNavigator = () => {
  const { dark, colors } = useTheme();

  const navigationTheme: Theme = {
    ...(dark ? DarkTheme : DefaultTheme),
    dark,
    colors: {
      ...(dark ? DarkTheme : DefaultTheme).colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
