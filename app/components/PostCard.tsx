import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useGetPostsQuery } from 'app/store/modules/api/posts/postsApi'
import { IPostRes } from 'app/store/modules/api/posts/types'
import { TRootStack } from 'app/types/INavigation'
import { IPost } from 'app/types/IPost'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FAB } from 'react-native-paper'

type Navigation = NavigationProp<TRootStack>

interface IProps {
  data: IPostRes
}

export default function PostsCard(props: IProps) {
  const { data } = props
  const { navigate } = useNavigation<Navigation>()

  return (
    <View style={s.wrapper}>
      <TouchableOpacity onPress={() => navigate('SinglePostScreen', { postId: data.postId })}>
        <Image source={{ uri: data.post.image }} style={s.image} />
      </TouchableOpacity>
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
