import AuthStack from 'app/navigation/AuthStack'
import { useAppSelector } from 'app/store/hooks'
import { View, Text } from 'react-native'

export default function ProfileScreen() {
  const { isAuthorized, user } = useAppSelector((state) => state.auth)


  return <>{isAuthorized ? <Text>Authorized</Text> : <AuthStack />}</>
}
