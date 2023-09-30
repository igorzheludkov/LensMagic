import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import apiSlice from '../apiSlice'

import { AuthState } from '../../auth/slice'
import { IComment, IPost } from 'app/types/IPost'
import fetchLocalPhoto from 'app/utils/fetchLocalPhoto'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from 'app/constants/firebaseConfig'
import getFilename from 'app/utils/getFilename'
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  increment,
  getDoc
} from 'firebase/firestore'
import { RootState } from 'app/store/store'
import { ICommentAddReq, IPostRes } from 'app/store/modules/api/posts/types'

// import { IBookmarkQuery, IRemoveBookmark } from './types'

const collectionName = 'posts'
const storageName = 'posts-photos'

export const postsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPosts: builder.query<IPostRes[], null>({
      providesTags: ['posts'],
      queryFn: async (_: null, thunkAPI) => {
        const querySnapshot = await getDocs(collection(db, collectionName))
        const postsList: IPostRes[] = []

        try {
          querySnapshot.forEach((doc) => {
            postsList.push({ postId: doc.id, post: doc.data() as IPost })
          })
          return { data: postsList }
        } catch (error: any) {
          return { error: { data: error.message, status: 400 } }
        }
      }
    }),
    getSinglePost: builder.query<IPost, string>({
      providesTags: ['post'],
      queryFn: async (id: string, thunkAPI) => {
        const docRef = doc(db, collectionName, id)
        const docSnap = await getDoc(docRef)
        let post: IPost

        try {
          post = docSnap.data() as IPost
          return { data: post }
        } catch (error: any) {
          return { error: { data: error.message, status: 400 } }
        }
      }
    }),
    // refactor this code
    addPost: builder.mutation({
      invalidatesTags: ['posts'],
      queryFn: async (post: IPost, thunkAPI) => {
        const { auth } = thunkAPI.getState() as RootState
        if (!auth?.user) return { error: { data: 'user unauthorised', status: 401 } }
        try {
          const file = await fetchLocalPhoto(post.image)
          const filename = getFilename(post.image)
          const imageRef = ref(storage, `${storageName}/${filename}`)

          const uploadTask = await uploadBytesResumable(imageRef, file)

          if (uploadTask.state === 'success') {
            const imageURL = await getDownloadURL(imageRef)
            const newPost: IPost = {
              ...post,
              authorID: auth.user?.uid,
              image: imageURL
            }
            await addDoc(collection(db, collectionName), newPost)
            return { data: true }
          } else {
            return { error: { data: 'post saving failed', status: 400 } }
          }
        } catch (error: any) {
          return { error: { data: error.message, status: 400 } }
        }
      }
    }),
    addPostComment: builder.mutation({
      invalidatesTags: ['post'],
      queryFn: async (data: ICommentAddReq, thunkAPI) => {
        const { auth } = thunkAPI.getState() as RootState
        if (!auth?.user) return { error: { data: 'user unauthorised', status: 401 } }
        try {
          const comment: IComment = {
            ...data.comment,
            authorID: auth.user.uid
          }
          await updateDoc(doc(db, collectionName, data.postId), {
            comments: arrayUnion({ ...comment })
          })
          return { data: true }
        } catch (error: any) {
          return { error: { data: error.message, status: 400 } }
        }
      }
    }),
    addPostLike: builder.mutation({
      invalidatesTags: ['post'],
      queryFn: async (data: ICommentAddReq, thunkAPI) => {
        try {
          await updateDoc(doc(db, collectionName, data.postId), {
            likes: increment(1)
          })
          return { data: true }
        } catch (error: any) {
          return { error: { data: error.message, status: 400 } }
        }
      }
    })
  })
})

export default postsApi

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useGetSinglePostQuery,
  useAddPostCommentMutation,
  useAddPostLikeMutation
} = postsApi
