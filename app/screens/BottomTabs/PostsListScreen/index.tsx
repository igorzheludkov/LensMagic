import { NavigationProp, useNavigation } from '@react-navigation/native';
import PostsCard from 'app/components/PostCard';
import { useAppSelector } from 'app/store/hooks';
import { useGetPostsQuery } from 'app/store/modules/api/posts/postsApi';
import { Navigation, TRootStack } from 'app/types/INavigation';
import { View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import s from './styles';

export default function PostsListScreen() {
  const { navigate } = useNavigation<Navigation>();
  const { isAuthorized } = useAppSelector(state => state.auth);
  const posts = useGetPostsQuery(null);

  return (
    <View style={s.wrapper}>
      <FlatList
        data={posts.data}
        renderItem={({ item }) => <PostsCard data={item} />}
        contentContainerStyle={s.contentContainer}
      />
      {isAuthorized && (
        <FAB
          icon="plus"
          style={s.fab}
          onPress={() => navigate('CreatePostScreen')}
        />
      )}
    </View>
  );
}
