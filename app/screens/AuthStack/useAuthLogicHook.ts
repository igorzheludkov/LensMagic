import { useNavigation } from '@react-navigation/native';
import { auth } from 'app/constants/firebaseConfig';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { authActions } from 'app/store/modules/auth/slice';
import { login, signUp } from 'app/store/modules/auth/thunks';
import { IUserCreds } from 'app/types/IAuth';
import { Navigation, TAuthStack } from 'app/types/INavigation';
import stringifyParse from 'app/utils/stringifyParse';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function useAuthLogicHook() {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<Navigation>();
  const authState = useAppSelector(state => state.auth);

  useEffect(() => {
    if (authState.user)
      navigate('BottomTabsNavigator', { screen: 'PostsListScreen' });

    if (authState.error) Alert.alert('Error', stringifyParse(authState.error));
  }, [authState]);

  const handleSubmit = (credentials: IUserCreds, screen: keyof TAuthStack) => {
    if (!(credentials.email && credentials.password)) return;
    if (screen === 'LoginScreen') dispatch(login(credentials));
    if (screen === 'RegistrationScreen') dispatch(signUp(credentials));
  };

  return {
    handleSubmit,
    isLoading: authState.isLoggingIn || authState.isSigningUp,
  };
}
