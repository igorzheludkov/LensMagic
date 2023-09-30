import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainBottomTabs } from 'app/types/INavigation'

import { StyleSheet, SafeAreaView } from 'react-native'
import CustomBottomTabs from 'app/navigation/HomeStack/BottomTabs/CustomBottomTabs'
import PostsListScreen from 'app/navigation/HomeStack/BottomTabs/PostsListScreen'
import ProfileScreen from 'app/navigation/HomeStack/BottomTabs/ProfileScreen'

const Tab = createBottomTabNavigator<MainBottomTabs>()

const TabBarBlockWrapper = (props: any) => {
  return <CustomBottomTabs {...props} />
}

export default function BottomTabsNavigator() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={CustomBottomTabs}
        sceneContainerStyle={styles.screenContainer}
      >
        <Tab.Screen
          name='PostsListScreen'
          component={PostsListScreen}
          options={{
            tabBarLabel: 'Events'
          }}
        />
        <Tab.Screen
          name='ProfileScreen'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Practices'
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
