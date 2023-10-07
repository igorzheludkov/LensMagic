import React from 'react';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TAuthStack } from 'app/types/INavigation';
import RegistrationScreen from 'app/screens/RegistrationScreen';
import LoginScreen from 'app/screens/LoginScreen';

const Stack = createNativeStackNavigator<TAuthStack>();

export default function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName="RegistrationScreen"
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
      <SafeAreaView />
    </>
  );
}
