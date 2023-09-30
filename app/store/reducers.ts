import { apiSlice } from './modules/api/apiSlice'
import authSlice from './modules/auth/slice'

const rootReducer = {
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
}

export default rootReducer
