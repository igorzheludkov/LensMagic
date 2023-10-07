import { NavigationProp } from '@react-navigation/native';

export type Navigation = NavigationProp<TRootStack>;

export type TRootStack = {
  BottomTabsNavigator: TBottomTabsNav;
  CreatePostScreen: undefined;
  AuthStack: { screen: keyof TAuthStack };
  SinglePostScreen: { postId: string };
};

export type TAuthStack = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
};

export type TBottomTabsNav = {
  PostsListScreen: undefined;
  CreatePostButton: undefined;
  ProfileScreen: undefined;
};
