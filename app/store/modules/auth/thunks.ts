import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from 'app/constants/firebaseConfig';
import { IUserCreds } from 'app/types/IAuth';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userCredentials: IUserCreds, { rejectWithValue }) => {
    const { email, password } = userCredentials;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const login = createAsyncThunk(
  'auth/login',
  async (userCredentials: IUserCreds, { rejectWithValue }) => {
    const { email, password } = userCredentials;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
