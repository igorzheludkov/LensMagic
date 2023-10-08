import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'app/types/IProfile';
import uploadImage from 'app/store/firebaseFeatures/uploadImage';
import { IStorage } from 'app/types/IFirestoreData';
import addUpdateProfile from 'app/store/firebaseFeatures/addUpdateProfile';
import getProfile from 'app/store/firebaseFeatures/getProfile';

export const getUserProfile = createAsyncThunk(
  'profile/getProfile',
  async (id: string, { rejectWithValue }) => {
    try {
      const profile = await getProfile(id);
      return profile;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
export const addUpdateUserProfile = createAsyncThunk(
  'profile/addUpdateUserProfile',
  async (data: IUser, { rejectWithValue, dispatch }) => {
    try {
      if (data.avatar) {
        const avatarUrl = await uploadImage(
          data.avatar,
          data.id,
          IStorage.USERS,
        );
        if (avatarUrl.status) {
          const result = await addUpdateProfile({
            ...data,
            avatar: avatarUrl.result,
          });
          dispatch(getUserProfile(data.id));
          return result;
        }
      }
      const response = await addUpdateProfile(data);
      if (response.status) {
        dispatch(getUserProfile(data.id));
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
