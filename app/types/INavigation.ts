export type TRootStack = {
  BottomTabsNavigator: TBottomTabsNav
  CreatePostScreen: undefined
  LoginScreen: undefined
  RegistrationScreen: undefined
  SinglePostScreen: { postId: string }
}

export type TAuthStack = {
  LoginScreen: undefined
  RegistrationScreen: undefined
}

export type TBottomTabsNav = {
  PostsListScreen: undefined
  ProfileScreen: undefined
}
