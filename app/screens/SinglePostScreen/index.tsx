import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useGetPostsQuery, useGetSinglePostQuery } from 'app/store/modules/api/posts/postsApi'
import { TRootStack } from 'app/types/INavigation'
import { IPost } from 'app/types/IPost'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FAB } from 'react-native-paper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Navigation = NavigationProp<TRootStack>

type IProps = NativeStackScreenProps<TRootStack, 'SinglePostScreen'>

export default function SinglePostScreen(props: IProps) {
  const postId = props.route.params.postId
  const { navigate } = useNavigation<Navigation>()
  const { data: post } = useGetSinglePostQuery(postId)

  return (
    <View style={s.wrapper}>
      <Image source={{ uri: post?.image }} style={s.image} />
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
  commentBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
