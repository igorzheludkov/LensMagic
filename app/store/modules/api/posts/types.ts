import { IComment, IPost } from 'app/types/IPost'

export interface ICommentAddReq {
  postId: string
  comment: IComment
}

export interface IPostRes {
  post: IPost
  postId: string
}
