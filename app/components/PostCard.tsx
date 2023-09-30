import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useGetPostsQuery } from 'app/store/modules/api/posts/postsApi'
import { TRootStack } from 'app/types/INavigation'
import { IPost } from 'app/types/IPost'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FAB } from 'react-native-paper'

type Navigation = NavigationProp<TRootStack>

interface IProps {
  post: IPost
}

export default function PostsCard(props: IProps) {
  const { post } = props
  console.log('~~~~~~~~~~~~~~ post', post)
  const { navigate } = useNavigation<Navigation>()

  return (
    <View style={s.wrapper}>
      <Image source={{ uri: post.image }} style={s.image} />
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: {},
  imageCont: {},
  image: {
    height: 200,
    width: '100%'
  },
  title: {},
  place: {},
  comments: {},
  likes: {}
})
