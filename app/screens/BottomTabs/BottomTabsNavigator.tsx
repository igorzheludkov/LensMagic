import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TBottomTabsNav } from 'app/types/INavigation'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import CustomBottomTabs from 'app/screens/BottomTabs/CustomBottomTabs'
import PostsListScreen from 'app/screens/BottomTabs/PostsListScreen'
import ProfileScreen from 'app/screens/BottomTabs/ProfileScreen'
import { Button } from 'react-native-paper'
import { logout } from 'app/store/modules/auth/thunks'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'

const Tab = createBottomTabNavigator<TBottomTabsNav>()

export default function BottomTabsNavigator() {
  const dispatch = useAppDispatch()
  const { isAuthorized } = useAppSelector((state) => state.auth)

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true
        }}
        tabBar={CustomBottomTabs}
        sceneContainerStyle={styles.screenContainer}
      >
        <Tab.Screen
          name='PostsListScreen'
          component={PostsListScreen}
          options={{
            tabBarLabel: 'Posts'
          }}
        />
        <Tab.Screen
          name='ProfileScreen'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerRight: isAuthorized
              ? () => (
                  <Button mode='contained' onPress={() => dispatch(logout())}>
                    Logout
                  </Button>
                )
              : () => <View />
          }}
        />
      </Tab.Navigator>
      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  screenContainer: {}
})
