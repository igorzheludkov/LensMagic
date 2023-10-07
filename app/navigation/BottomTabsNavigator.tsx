import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TBottomTabsNav, TRootStack } from 'app/types/INavigation';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import CustomBottomTabs from 'app/screens/BottomTabs/CustomBottomTabs';
import PostsListScreen from 'app/screens/BottomTabs/PostsListScreen';
import ProfileScreen from 'app/screens/BottomTabs/ProfileScreen';
import { useAppSelector } from 'app/store/hooks';
import AuthButton from 'app/components/features/AuthButton';
import {
  EventArg,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator<TBottomTabsNav>();

type Navigation = NavigationProp<TRootStack>;

export default function BottomTabsNavigator() {
  const { navigate } = useNavigation<Navigation>();

  const authState = useAppSelector(state => state.auth);

  function createPostButtonHandler(e: EventArg<'tabPress', true, undefined>) {
    e.preventDefault();
    if (authState.isAuthorized) {
      navigate('CreatePostScreen');
    } else {
      navigate('AuthStack', { screen: 'LoginScreen' });
    }
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
        }}
        tabBar={CustomBottomTabs}
        sceneContainerStyle={styles.screenContainer}
      >
        <Tab.Screen
          name="PostsListScreen"
          component={PostsListScreen}
          options={{
            tabBarLabel: 'Posts',
          }}
        />
        <Tab.Screen
          name="CreatePostButton"
          component={View}
          listeners={{
            tabPress: createPostButtonHandler,
          }}
          options={{
            tabBarLabel: 'Add post',
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerRight: AuthButton,
          }}
        />
      </Tab.Navigator>
      <SafeAreaView />
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {},
});
