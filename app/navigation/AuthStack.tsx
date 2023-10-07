import React from 'react';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TAuthStack } from 'app/types/INavigation';
import RegistrationScreen from 'app/screens/AuthStack/RegistrationScreen';
import LoginScreen from 'app/screens/AuthStack/LoginScreen';
import { colors } from 'app/constants/colors';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator<TAuthStack>();

export default function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: colors.white },
        }}
        initialRouteName="RegistrationScreen"
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
}
