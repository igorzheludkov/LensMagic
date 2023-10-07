import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, addUpdateUserProfile } from './thunks';
import { IUser } from 'app/types/IProfile';

export interface profileState {
  profile: IUser | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: any | null;
}

const initialState: profileState = {
  profile: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
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
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload.result;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // adUpdateProfile actions
      .addCase(addUpdateUserProfile.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addUpdateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addUpdateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
