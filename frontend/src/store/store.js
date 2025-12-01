import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import materialsReducer from './slices/materialsSlice';
import certificationsReducer from './slices/certificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    materials: materialsReducer,
    certifications: certificationsReducer,
  },
});

