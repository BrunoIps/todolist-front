import { createAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import AuthApi from '../../api/Auth';
import { AuthActionTypes } from '@mobile/enum/auth';
import { show } from '@mobile/utils/Alert';
import { RegisterAccount } from '@mobile/screens/Auth/CreateAccount/types';
import { getMELoading, loginLoading, registerAccountLoading } from '../Loading';
import { getItem, setItem } from '@mobile/utils/Storage';
import { LoginProps } from '@mobile/screens/Auth/Login/types';
import { User } from './state';
import { setAuthorizationHeader } from '@mobile/api/axios';
import { SetTasks } from '../Task/action';
import moment from 'moment';
import { translator } from '@mobile/services/translate';

const Api = AuthApi();

export const registerAccount = createAction(AuthActionTypes.REGISTER);

export const login = createAction(AuthActionTypes.LOGIN);

export const registerSuccessOrError = createAction<boolean>(
  AuthActionTypes.REGISTER_ACCOUNT_SUCCESS_OR_ERROR,
);

export const loginSuccessOrError = createAction<boolean>(
  AuthActionTypes.LOGIN_SUCCESS_OR_ERROR,
);

export const registerAccountError = createAction<string | null>(
  AuthActionTypes.REGISTER_ACCOUNT_ERROR,
);

export const loginError = createAction<string | null>(
  AuthActionTypes.LOGIN_ERROR,
);

export const SetUser = createAction<User>(AuthActionTypes.SET_USER);

export const RegisterAccountAction =
  ({ email, password, name }: RegisterAccount): AppThunk =>
  async dispatch => {
    dispatch(registerAccountLoading(true));
    try {
      const data = await Api.register(email, password, name);

      if (data) {
        dispatch(registerSuccessOrError(true));
        dispatch(registerAccountError(null));

        show(translator('SCREENS.CREATE_ACCOUNT.SUCCESS'));
      }
    } catch (err) {
      if (err) {
        dispatch(registerSuccessOrError(false));
        dispatch(registerAccountError(err.message));
      }
    } finally {
      dispatch(registerAccountLoading(false));
    }
  };

export const authenticate =
  ({ email, password }: LoginProps): AppThunk =>
  async dispatch => {
    dispatch(loginLoading(true));
    try {
      const data = await Api.login(email, password);

      if (data) {
        setItem('token', data.token);
        setItem('id', data.id);
        setAuthorizationHeader(`Bearer ${data.token}`);
        dispatch(loginSuccessOrError(true));
        dispatch(loginError(null));
        dispatch(getMe(data.id, moment().toDate()));
      }
    } catch (err) {
      if (err) {
        dispatch(loginSuccessOrError(false));
        dispatch(loginError(err.message));
      }
    } finally {
      dispatch(loginLoading(false));
    }
  };

export const getMe =
  (userId: string, date: Date): AppThunk =>
  async dispatch => {
    dispatch(getMELoading(true));
    try {
      const token = await getItem('token');

      if (token) {
        setAuthorizationHeader(`Bearer ${token}`);
      }

      const data = await Api.getMe(userId, date);

      if (data) {
        dispatch(SetUser(data.user));
        dispatch(SetTasks(data.user.tasks));
      }
    } catch (err) {
    } finally {
      dispatch(getMELoading(false));
    }
  };

export const logout = (): AppThunk => async () => {
  await setItem('token', '');
};
