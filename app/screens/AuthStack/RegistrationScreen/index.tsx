import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'app/types/INavigation';
import { useEffect, useState } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { s } from './styles';
import AuthLayout from 'app/screens/AuthStack/components/AuthLayout';
import useAuthLogicHook from 'app/screens/AuthStack/useAuthLogicHook';
import { IUserCreds } from 'app/types/IAuth';
import { IUser } from 'app/types/IProfile';
import { initProfile } from 'app/screens/BottomTabs/ProfileScreen/state';
import usePickImage from 'app/hooks/usePickImage';

export default function RegistrationScreen() {
  const { navigate } = useNavigation<Navigation>();

  const { image, pickGalleryImage } = usePickImage();

  const [profile, setProfile] = useState<IUser>(initProfile);
  const [creds, setCreds] = useState<IUserCreds>({
    email: 'test@gmail.com',
    password: '1234567890',
  });

  const { handleSubmit, isLoading } = useAuthLogicHook({
    creds,
    profile,
    screen: 'RegistrationScreen',
  });

  useEffect(() => {
    image && setProfile({ ...profile, avatar: image });
  }, [image]);

  return (
    <AuthLayout>
      <ScrollView style={s.wrapper} contentContainerStyle={s.form}>
        <Text style={s.title}>Registration</Text>
        <View style={s.container}>
          <View style={s.leftContainer}>
            <Image
              style={s.avatar}
              source={
                profile.avatar
                  ? { uri: profile.avatar }
                  : require('app/assets/images/avatar_placeholder.jpeg')
              }
            />
            <Button onPress={pickGalleryImage} mode="text">
              <Text>{profile.avatar ? 'Change avatar' : 'Select avatar'}</Text>
            </Button>
          </View>
          <View style={s.rightContainer}>
            <TextInput
              value={profile?.name}
              onChangeText={name => setProfile({ ...profile, name })}
              style={s.textInput}
              placeholder="Enter your name"
            />
            <TextInput
              value={creds.email}
              onChangeText={email => setCreds({ ...creds, email })}
              keyboardType="email-address"
              placeholder="Enter your email"
              style={s.textInput}
            />
            <TextInput
              value={creds.password}
              onChangeText={password => setCreds({ ...creds, password })}
              style={s.textInput}
              placeholder="Enter a password"
            />
          </View>
        </View>

        <Button
          style={s.button}
          onPress={handleSubmit}
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
