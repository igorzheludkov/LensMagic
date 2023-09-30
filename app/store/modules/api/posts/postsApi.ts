import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import apiSlice from '../apiSlice'

import { AuthState } from '../../auth/slice'
import { IPost } from 'app/types/IPost'
import fetchLocalPhoto from 'app/utils/fetchLocalPhoto'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from 'app/constants/firebaseConfig'
import getFilename from 'app/utils/getFilename'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { RootState } from 'app/store/store'

// import { IBookmarkQuery, IRemoveBookmark } from './types'

const collectionName = 'posts'
const storageName = 'posts-photos'

export const postsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], null>({
      providesTags: ['posts'],
      queryFn: async (_: null, thunkAPI) => {
        const querySnapshot = await getDocs(collection(db, collectionName))
        const postsList: IPost[] = []

        try {
          querySnapshot.forEach((doc) => {
            postsList.push(doc.data() as IPost)
          })
          return { data: postsList }
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
    })
  })
})

export default postsApi

export const { useAddPostMutation, useGetPostsQuery } = postsApi
