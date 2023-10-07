import { configureStore } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import apiSlice from './modules/api/apiSlice';
import { persistCombineReducers, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
  // blacklist: [apiSlice.reducerPath, userSliceApi.reducerPath]
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
