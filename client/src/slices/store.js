
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import signupreducer from './signup.slice'
import loginreducer from './login.slice'
import postAdReducer from './postAd.slice'

const loginPersistConfig = {
  key: "login",
  storage,
};

const signupPersistConfig = {
  key: "signup",
  storage,
};
  

const store = configureStore({
  reducer: {
    Signup: persistReducer(signupPersistConfig, signupreducer),
    Login: persistReducer(loginPersistConfig, loginreducer),
    PostAd: postAdReducer,
  },
});

export const persistor = persistStore(store);
export default store;
