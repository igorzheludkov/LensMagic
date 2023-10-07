import { apiSlice } from './modules/api/apiSlice';
import { profileSlice } from './modules/profile/slice';
import { authSlice } from './modules/auth/slice';

const rootReducer = {
  [profileSlice.name]: profileSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

export default rootReducer;
