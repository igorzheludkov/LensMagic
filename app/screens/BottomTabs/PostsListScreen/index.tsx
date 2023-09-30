import { NavigationProp, useNavigation } from '@react-navigation/native'
import PostsCard from 'app/components/PostCard'
import { useGetPostsQuery } from 'app/store/modules/api/posts/postsApi'
import { TRootStack } from 'app/types/INavigation'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'

type Navigation = NavigationProp<TRootStack>

export default function PostsListScreen() {
  const { navigate } = useNavigation<Navigation>()
  const posts = useGetPostsQuery(null)

  return (
    <View style={s.wrapper}>
      <FlatList
        data={posts.data}
        renderItem={({ item }) => <PostsCard post={item} />}
        contentContainerStyle={s.contentContainer}
      />
      <FAB icon='plus' style={s.fab} onPress={() => navigate('CreatePostScreen')} />
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    gap: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
