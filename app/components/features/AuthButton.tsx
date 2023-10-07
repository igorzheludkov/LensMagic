import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from 'app/store/hooks';
import { logout } from 'app/store/modules/auth/thunks';
import { Navigation, TRootStack } from 'app/types/INavigation';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

interface IProps {}

export default function AuthButton(props: IProps) {
  const {} = props;
  const { navigate } = useNavigation<Navigation>();
  const authState = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.wrapper}>
      {authState.isAuthorized ? (
        <Button mode="contained" onPress={() => dispatch(logout())}>
          {authState.user?.email} - Logout
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={() =>
            navigate('AuthStack', { screen: 'RegistrationScreen' })
          }
        >
          Sign Up
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});
