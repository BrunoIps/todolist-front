import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './state';
import {
  createTaskLoading,
  getMELoading,
  getTaskLoading,
  loginLoading,
  registerAccountLoading,
  updateTaskLoading,
} from './action';

export const loadingReducer = createReducer(initialState, builder => {
  builder.addCase(registerAccountLoading, (state, { payload }) => {
    return {
      ...state,
      createAccountLoading: payload,
    };
  });

  builder.addCase(loginLoading, (state, { payload }) => {
    return {
      ...state,
      loginLoading: payload,
    };
  });

  builder.addCase(getMELoading, (state, { payload }) => {
    return {
      ...state,
      getMeLoading: payload,
    };
  });

  builder.addCase(createTaskLoading, (state, { payload }) => {
    return {
      ...state,
      createTaskLoading: payload,
    };
  });

  builder.addCase(getTaskLoading, (state, { payload }) => {
    return {
      ...state,
      getTaskLoading: payload,
    };
  });

  builder.addCase(updateTaskLoading, (state, { payload }) => {
    return {
      ...state,
      updateTaskLoading: payload,
    };
  });
});
