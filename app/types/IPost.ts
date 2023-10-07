export interface IPost {
  author: IPostAuthor;
  image: string;
  title: string;
  place: string;
  mapLocation: ILocation;
  comments: IComment[] | [];
  likes: ILike[] | [];
}

export interface IComment {
  authorID: string;
  createdAt: string;
  message: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IPostAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface ILike {
  userId: string;
  userName: string;
  avatar: string;
}
