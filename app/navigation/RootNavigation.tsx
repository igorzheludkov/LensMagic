import React from 'react'
import { RootStack } from 'app/types/INavigation'

import { SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreatePostScreen from 'app/navigation/HomeStack/CreatePostScreen'
import BottomTabsNavigator from 'app/navigation/HomeStack/BottomTabs/BottomTabsNavigator'

const Stack = createNativeStackNavigator<RootStack>()

export default function RootNavigation() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTabsNavigator'>
        <Stack.Screen
          name='BottomTabsNavigator'
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreatePostScreen'
          component={CreatePostScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
      <SafeAreaView />
    </>
  )
}
