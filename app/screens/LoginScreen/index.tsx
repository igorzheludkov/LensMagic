import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'app/store/hooks';
import { login } from 'app/store/modules/auth/thunks';
import { Navigation } from 'app/types/INavigation';
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { s } from './styles';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<Navigation>();

  const [creds, setCreds] = useState({
    email: 'test@gmail.com',
    password: '1234567890',
  });

  const handleSubmit = () => {
    if (!(creds.email && creds.password)) return;
    dispatch(login(creds));
  };

  return (
    <View>
      <Image
        source={require('app/assets/images/wallpaper.jpeg')}
        style={s.wallpaper}
        resizeMode="contain"
        blurRadius={5}
      />
      <TextInput
        value={creds.email}
        onChangeText={email => setCreds({ ...creds, email })}
      />
      <TextInput
        value={creds.password}
        onChangeText={password => setCreds({ ...creds, password })}
      />
      <Button onPress={handleSubmit}>
        <Text>Login</Text>
      </Button>
      <Divider />
      <Button
        onPress={() => navigate('AuthStack', { screen: 'RegistrationScreen' })}
      >
        <Text>Don't have an account? Register here</Text>
      </Button>
    </View>
  );
}
