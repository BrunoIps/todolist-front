import { createAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { TaskActionTypes } from '@mobile/enum/task';
import { Task } from './state';
import {
  createTaskLoading,
  getTaskLoading,
  updateTaskLoading,
} from '../Loading';
import TaskApi from '@mobile/api/Task/api';

const Api = TaskApi();

export const SetTasks = createAction<Task[]>(TaskActionTypes.SET_TASKS);

export const CreateTask = createAction<Task>(TaskActionTypes.CREATE_TASK);

export const CreateTaskSuccess = createAction<boolean>(
  TaskActionTypes.CREATE_TASK_SUCCESS,
);

export const GetTasks = createAction(TaskActionTypes.GET_TASKS);

export const updateTask = createAction<Task>(TaskActionTypes.UPDATE_TASK);

export const deleteTask = createAction<string>(TaskActionTypes.DELETE_TASK);

export const setTaskToEdit = createAction<string>(
  TaskActionTypes.SET_TASK_TO_EDIT,
);

export const CreateTaskAction =
  (task: Task): AppThunk =>
  async dispatch => {
    dispatch(createTaskLoading(true));
    try {
      const data = await Api.createTask(task);
      if (data) {
        dispatch(CreateTask(data));
        dispatch(CreateTaskSuccess(true));
      }
    } catch (err) {
      dispatch(CreateTaskSuccess(false));
    } finally {
      dispatch(createTaskLoading(false));
    }
  };

export const getTasks =
  (user_id: string, start_date: moment.Moment): AppThunk =>
  async dispatch => {
    dispatch(getTaskLoading(true));
    try {
      const data = await Api.getTasks(user_id, start_date);
      if (data) {
        dispatch(SetTasks(data));
      }
    } catch (err) {
    } finally {
      dispatch(getTaskLoading(false));
    }
  };

export const updateTaskAction =
  (task: Task): AppThunk =>
  async dispatch => {
    dispatch(updateTaskLoading(true));
    try {
      const data = await Api.updateTask(task);
      if (data) {
        dispatch(updateTask(data));
        dispatch(CreateTaskSuccess(true));
      }
    } catch (err) {
      dispatch(CreateTaskSuccess(false));
    } finally {
      dispatch(updateTaskLoading(false));
    }
  };

export const deleteTaskAction =
  (task_id: string): AppThunk =>
  async dispatch => {
    dispatch(updateTaskLoading(true));
    try {
      await Api.deleteTask(task_id);
      dispatch(CreateTaskSuccess(true));

      dispatch(deleteTask(task_id));
    } catch (err) {
      dispatch(CreateTaskSuccess(false));
    } finally {
      dispatch(updateTaskLoading(false));
    }
  };
