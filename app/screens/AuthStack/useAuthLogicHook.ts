import { useNavigation } from '@react-navigation/native';
import { auth } from 'app/constants/firebaseConfig';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { authActions } from 'app/store/modules/auth/slice';
import { login, signUp } from 'app/store/modules/auth/thunks';
import { IUserCreds } from 'app/types/IAuth';
import { Navigation, TAuthStack } from 'app/types/INavigation';
import { IUser } from 'app/types/IProfile';
import stringifyParse from 'app/utils/stringifyParse';
import { useEffect } from 'react';
import { Alert } from 'react-native';

interface IParams {
  creds: IUserCreds;
  profile?: IUser;
  screen: keyof TAuthStack;
}

export default function useAuthLogicHook({ creds, profile, screen }: IParams) {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<Navigation>();
  const authState = useAppSelector(state => state.auth);

  useEffect(() => {
    if (authState.user)
      navigate('BottomTabsNavigator', { screen: 'PostsListScreen' });

    if (authState.error) Alert.alert('Error', stringifyParse(authState.error));
  }, [authState]);

  const handleSubmit = () => {
    if (!(creds.email && creds.password)) return;
    if (screen === 'LoginScreen') dispatch(login(creds));
    if (screen === 'RegistrationScreen' && profile?.name) {
      dispatch(signUp({ creds, profile }));
    }
  };

  return {
    handleSubmit,
    isLoading: authState.isLoggingIn || authState.isSigningUp,
  };
}
