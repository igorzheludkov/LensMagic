import React, { useEffect } from 'react'
import { TRootStack } from 'app/types/INavigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'app/constants/firebaseConfig'

import { SafeAreaView, StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreatePostScreen from 'app/screens/CreatePostScreen'
import BottomTabsNavigator from 'app/screens/BottomTabs/BottomTabsNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppDispatch } from 'app/store/hooks'
import { authActions } from 'app/store/modules/auth/slice'

const Stack = createNativeStackNavigator<TRootStack>()

export default function RootNavigation() {
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.updateUserState(user))
      } else {
        console.log('~~~~~~~~~~~~~~ loggedOut')
      }
    })
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <StatusBar />
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
              headerShown: true
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </>
  )
}
