import { IPost } from "app/types/IPost";

export const initialPostState: IPost = {
  authorID: '',
  image: '',
  title: 'kjh',
  place: 'kjhkjh',
  mapLocation: {
    latitude: 0,
    longitude: 0
  },
  comments: [],
  likes: 0
}
