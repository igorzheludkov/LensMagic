import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'app/types/INavigation';
import { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { s } from './styles';
import AuthLayout from 'app/screens/AuthStack/components/AuthLayout';
import useAuthLogicHook from 'app/screens/AuthStack/useAuthLogicHook';
import { IUserCreds } from 'app/types/IAuth';

export default function LoginScreen() {
  const { navigate } = useNavigation<Navigation>();

  const { handleSubmit, isLoading } = useAuthLogicHook();

  const [creds, setCreds] = useState<IUserCreds>({
    email: 'test@gmail.com',
    password: '1234567890',
  });

  return (
    <AuthLayout>
      <ScrollView style={s.wrapper} contentContainerStyle={s.form}>
        <Text style={s.title}>Registration</Text>
        <TextInput
          value={creds.email}
          onChangeText={email => setCreds({ ...creds, email })}
          keyboardType="email-address"
          style={s.textInput}
        />
        <TextInput
          value={creds.password}
          onChangeText={password => setCreds({ ...creds, password })}
          style={s.textInput}
        />
        <Button
          style={s.button}
          onPress={() => handleSubmit(creds, 'RegistrationScreen')}
          mode="contained"
          loading={isLoading}
        >
          <Text>Register</Text>
        </Button>
        <Divider />
        <Button
          onPress={() => navigate('AuthStack', { screen: 'LoginScreen' })}
        >
          <Text>Already have an account? Login here</Text>
        </Button>
      </ScrollView>
    </AuthLayout>
  );
}
