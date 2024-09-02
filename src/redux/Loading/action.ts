import { createAction } from '@reduxjs/toolkit';
import { LoadingActionTypes } from '@mobile/enum/loading';

export const registerAccountLoading = createAction<boolean>(
  LoadingActionTypes.REGISTER_LOADING,
);

export const loginLoading = createAction<boolean>(
  LoadingActionTypes.LOGIN_LOADING,
);

export const getMELoading = createAction<boolean>(
  LoadingActionTypes.GET_ME_LOADING,
);

export const createTaskLoading = createAction<boolean>(
  LoadingActionTypes.CREATE_TASK_LOADING,
);

export const getTaskLoading = createAction<boolean>(
  LoadingActionTypes.GET_TASKS_LOADING,
);

export const updateTaskLoading = createAction<boolean>(
  LoadingActionTypes.UPDATE_TASK_LOADING,
);
