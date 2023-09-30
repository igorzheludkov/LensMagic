import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { MainBottomTabs } from 'app/types/INavigation'
import { useAppDispatch } from 'app/store/hooks'

export default function CustomBottomTabs({ state, descriptors, navigation }: Props) {
  function selectTabIcon(routeName: keyof MainBottomTabs | string, isFocused: boolean) {
    switch (routeName) {
      case 'PostsListScreen':
        return <Ionicons name='md-checkmark-circle' size={32} color='green' />
      case 'ProfileScreen':
        return <Ionicons name='airplane-sharp' size={32} color='green' />
    }
    return <></>
  }

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index
        const tabIcon = selectTabIcon(route.name, isFocused)

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}
          >
            {tabIcon}
            <Text style={[styles.tabBarText, isFocused ? styles.focusedText : styles.unfocusedText]}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white'
  },
  tabBarButton: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabBarText: {
    fontSize: 14
  },
  focusedText: {
    color: '#673ab7' // Styles when the tab is focused
  },
  unfocusedText: {
    color: '#222' // Styles when the tab is not focused
  }
})
