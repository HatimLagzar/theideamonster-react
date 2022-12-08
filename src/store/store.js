import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import basketsReducer from "./features/tasks/basketsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    baskets: basketsReducer
  },
});
