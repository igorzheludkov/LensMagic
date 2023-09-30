import { initialPostState } from 'app/screens/CreatePostScreen/state'
import { IPost } from 'app/types/IPost'
import { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import useGetLocation from 'app/hooks/useGetLocation'
import { Camera } from 'expo-camera'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TRootStack } from 'app/types/INavigation'
import { useAddPostMutation } from 'app/store/modules/api/posts/postsApi'

type Navigation = NavigationProp<TRootStack>

export default function CreatePostScreen() {
  const { goBack } = useNavigation<Navigation>()
  const [addPost, result] = useAddPostMutation()

  const cameraRef = useRef<Camera>(null)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [form, setForm] = useState<IPost>(initialPostState)

  const geo = useGetLocation()

  useEffect(() => {
    requestPermission()
  }, [])

  useEffect(() => {
    result.isSuccess && goBack()
  }, [result.isSuccess])

  useEffect(() => {
    geo.isSuccess && setForm((prev) => ({ ...prev, mapLocation: geo.location }))
  }, [geo.isSuccess])

  function submitForm() {
    addPost(form)
  }

  function onChangeForm(text: string, field: keyof IPost) {
    setForm({ ...form, [field]: text })
  }

  function takePhoto() {
    cameraRef.current?.takePictureAsync().then((photo) => setForm((prev) => ({ ...prev, image: photo.uri })))
  }

  if (!permission?.granted) return <></>

  return (
    <View>
      <Camera ref={cameraRef} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <Button onPress={takePhoto}>
            <View style={styles.cameraButton} />
          </Button>
        </View>
      </Camera>
      <TextInput value={form.title} onChangeText={(text) => onChangeForm(text, 'title')} />
      <TextInput value={form.place} onChangeText={(text) => onChangeForm(text, 'place')} />
      <Button onPress={submitForm}>Submit</Button>
      {result.isLoading && <Text>Loading ....</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  camera: {
    height: 200,
    justifyContent: 'flex-end'
  },

  buttonContainer: {},
  cameraButton: {
    width: 50,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50
  }
})
