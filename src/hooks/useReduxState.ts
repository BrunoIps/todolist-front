import type { RootState } from '@mobile/redux/store';
import { useSelector } from 'react-redux';

const useAppSelector = useSelector.withTypes<RootState>();

export const useReduxState = () => {
  const LoadingState = () => useAppSelector(state => state.loading);
  const AuthState = () => useAppSelector(state => state.auth);
  const TaskState = () => useAppSelector(state => state.tasks);

  return {
    LoadingState,
    AuthState,
    TaskState,
  };
};
