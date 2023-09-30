import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useAppDispatch } from 'app/store/hooks'
import { login } from 'app/store/modules/auth/thunks'
import { TAuthStack } from 'app/types/INavigation'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Divider, TextInput } from 'react-native-paper'

type Navigation = NavigationProp<TAuthStack>

export default function LoginScreen() {
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation<Navigation>()

  const [creds, setCreds] = useState({ email: 'test@gmail.com', password: '1234567890' })

  const handleSubmit = () => {
    if (!(creds.email && creds.password)) return
    dispatch(login(creds))
  }

  return (
    <View>
      <TextInput value={creds.email} onChangeText={(email) => setCreds({ ...creds, email })} />
      <TextInput value={creds.password} onChangeText={(password) => setCreds({ ...creds, password })} />
      <Button onPress={handleSubmit}>
        <Text>Login</Text>
      </Button>
      <Divider />
      <Button onPress={() => navigate('RegistrationScreen')}>
        <Text>Don't have an account? Register here</Text>
      </Button>
    </View>
  )
}
