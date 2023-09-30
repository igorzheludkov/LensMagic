import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  useAddPostCommentMutation,
  useGetPostsQuery,
  useGetSinglePostQuery
} from 'app/store/modules/api/posts/postsApi'
import { TRootStack } from 'app/types/INavigation'
import { IPost } from 'app/types/IPost'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button, FAB, TextInput } from 'react-native-paper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { commentState } from 'app/screens/SinglePostScreen/state'

type Navigation = NavigationProp<TRootStack>

type IProps = NativeStackScreenProps<TRootStack, 'SinglePostScreen'>

export default function SinglePostScreen(props: IProps) {
  const postId = props.route.params.postId
  const { navigate } = useNavigation<Navigation>()
  const { data: post } = useGetSinglePostQuery(postId)
  const [addComment, addCommentResult] = useAddPostCommentMutation()

  const [comment, setComment] = useState(commentState)

  useEffect(() => {
    setComment({ ...commentState, createdAt: new Date().toString() })
  }, [addCommentResult.isSuccess])

  return (
    <>
      <ScrollView style={s.wrapper}>
        <Image source={{ uri: post?.image }} style={s.image} />
      </ScrollView>
      <View style={s.commentBlock}>
        <TextInput
          value={comment.message}
          onChangeText={(text) => setComment((prev) => ({ ...prev, message: text }))}
          style={s.textInput}
        />
        <Button onPress={() => addComment({ postId, comment })}>Add</Button>
      </View>
    </>
  )
}

const s = StyleSheet.create({
  wrapper: {},
  imageCont: {},
  image: {
    height: 200,
    width: '100%'
  },
  commentBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  textInput: {
    flex: 1
  },
  addButton: {
    backgroundColor: 'yellow'
  }
})
