import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loadingReducer } from './Loading';
import { authReducer } from './Auth';
import { taskReducer } from './Task/reducer';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
