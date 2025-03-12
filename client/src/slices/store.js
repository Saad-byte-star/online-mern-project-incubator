
import { configureStore } from '@reduxjs/toolkit';
import signupreducer from './signup.slice'
import loginreducer from './login.slice'
import postAdReducer from './postAd.slice'


const store = configureStore({
    reducer:{
      Signup :signupreducer,
      Login : loginreducer,
      PostAd : postAdReducer
    }
})
export default store;
