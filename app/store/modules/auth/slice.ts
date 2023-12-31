import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, logout, signUp } from './thunks';
import { User } from '@firebase/auth';

export interface AuthState {
  user: User | null;
  isAuthorized: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isSigningUp: boolean;
  error: any | null;
}

const initialState: AuthState = {
  user: null,
  isAuthorized: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthorized = Boolean(action.payload.uid);
    },
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // login actions
      .addCase(login.pending, state => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggingIn = false;
        state.isAuthorized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.isAuthorized = false;
        state.error = action.payload;
      })
      // logout actions
      .addCase(logout.pending, state => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isLoggingOut = false;
        state.isAuthorized = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.isAuthorized = false;
        state.error = action.payload;
      })
      // signUp actions
      .addCase(signUp.pending, state => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSigningUp = false;
        state.isAuthorized = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSigningUp = false;
        state.isAuthorized = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
