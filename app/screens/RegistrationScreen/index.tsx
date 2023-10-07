import { View, Text } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { signUp } from 'app/store/modules/auth/thunks';
import { useAppDispatch } from 'app/store/hooks';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'app/types/INavigation';

export default function RegistrationScreen() {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<Navigation>();

  const [creds, setCreds] = useState({
    email: 'test@gmail.com',
    password: '1234567890',
  });

  const handleSubmit = () => {
    if (!(creds.email && creds.password)) return;
    dispatch(signUp(creds));
  };

  return (
    <View>
      <TextInput
        value={creds.email}
        onChangeText={email => setCreds({ ...creds, email })}
      />
      <TextInput
        value={creds.password}
        onChangeText={password => setCreds({ ...creds, password })}
      />
      <Button onPress={handleSubmit}>
        <Text>Register</Text>
      </Button>
      <Divider />
      <Button onPress={() => navigate('AuthStack', { screen: 'LoginScreen' })}>
        <Text>Already have an account? Login here</Text>
      </Button>
    </View>
  );
}
