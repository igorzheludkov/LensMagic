export interface IPost {
  authorID: string
  image: string
  title: string
  place: string
  mapLocation: ILocation
  comments: IComment[] | []
  likes: number
}

export interface IComment {
  id: string
  authorID: string
  createdAt: string
  message: string
}

export interface ILocation {
  latitude: number
  longitude: number
}
