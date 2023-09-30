import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import apiSlice from '../apiSlice'

import { AuthState } from '../../auth/slice'

import { IBookmarkQuery, IRemoveBookmark } from './types'

const collectionName = 'posts'

export const postsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      // providesTags: ['bookmarksList'],
      queryFn: async ({ subCollection }: IBookmarkQuery, thunkAPI) => {
      //   const { authSlice } = thunkAPI.getState() as { authSlice: AuthState }
      //   const collectionRef = firestore()
      //     .collection(collectionName)
      //     .doc(authSlice.user?.uid)
      //     .collection(subCollection)

      //   if (subCollection && authSlice.user?.uid) {
      //     try {
      //       const array: { data: IProfileForm; id: string }[] = []
      //       const documents = (await collectionRef.get()).docs.forEach((doc) =>
      //         array.push({ data: doc.data(), id: doc.id })
      //       )

      //       return { data: array }
      //     } catch (error: any) {
      //       return { error: { data: error.message, status: 500 } }
      //     }
      //   } else {
      //     return { error: { data: 'bookmark reading failed', status: 400 } }
      //   }
      // }
    }),

    saveBookmark: builder.mutation({
      // invalidatesTags: ['bookmarksList'],
      queryFn: async ({ data, subCollection }: IBookmarkQuery, thunkAPI) => {
        // const { authSlice } = thunkAPI.getState() as { authSlice: AuthState }
        // const collectionRef = firestore()
        //   .collection(collectionName)
        //   .doc(authSlice.user?.uid)
        //   .collection(subCollection)

        // if (data && subCollection) {
        //   try {
        //     await collectionRef.add(data)

        //     return { data: 'bookmark saved' }
        //   } catch (error: any) {
        //     return { error: { data: error.message, status: 500 } }
        //   }
        // } else {
        //   return { error: { data: 'bookmark saving failed', status: 400 } }
        // }
      }
    }),
    removeBookmark: builder.mutation({
      // invalidatesTags: ['bookmarksList'],
      queryFn: async ({ id, subCollection }: IRemoveBookmark, thunkAPI) => {
        // const { authSlice } = thunkAPI.getState() as { authSlice: AuthState }
        // const docRef = firestore()
        //   .collection(collectionName)
        //   .doc(authSlice.user?.uid)
        //   .collection(subCollection)
        //   .doc(id)

        // if (id && subCollection) {
        //   try {
        //     await docRef.delete()
        //     return { data: 'bookmark removed' }
        //   } catch (error: any) {
        //     return { error: { data: error.message, status: 500 } }
        //   }
        // } else {
        //   return { error: { data: 'bookmark saving failed', status: 400 } }
        // }
      }
    })
  })
})

export default postsApi

export const { useSaveBookmarkMutation, useGetBookmarksQuery, useRemoveBookmarkMutation } = postsApi
