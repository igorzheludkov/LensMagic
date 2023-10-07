import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, addUpdateUserProfile } from './thunks';
import { IUser } from 'app/types/IProfile';

export interface AuthState {
  profile: IUser | null;
  isLoading: boolean;
  error: any | null;
}

const initialState: AuthState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfileState: (state, action: PayloadAction<IUser>) => {
      state.profile = action.payload;
    },
    resetProfileState: state => {
      state.profile = null;
    },
  },
  extraReducers: builder => {
    builder
      // getProfile actions
      .addCase(getUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload.result;
        state.isLoading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // adUpdateProfile actions
      .addCase(addUpdateUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUpdateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addUpdateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
