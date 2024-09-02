import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './state';
import {
  loginError,
  loginSuccessOrError,
  registerAccountError,
  registerSuccessOrError,
  SetUser,
} from './action';

export const authReducer = createReducer(initialState, builder => {
  builder.addCase(registerSuccessOrError, (state, { payload }) => {
    return {
      ...state,
      createAccount: payload,
    };
  });

  builder.addCase(registerAccountError, (state, { payload }) => {
    return {
      ...state,
      createAccountError: payload,
    };
  });

  builder.addCase(loginSuccessOrError, (state, { payload }) => {
    return {
      ...state,
      loginSuccess: payload,
    };
  });

  builder.addCase(loginError, (state, { payload }) => {
    return {
      ...state,
      loginError: payload,
    };
  });

  builder.addCase(SetUser, (state, { payload }) => {
    return {
      ...state,
      user: payload,
    };
  });
});
