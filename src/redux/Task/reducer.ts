import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './state';
import {
  CreateTaskSuccess,
  deleteTask,
  SetTasks,
  setTaskToEdit,
  updateTask,
} from './action';

export const taskReducer = createReducer(initialState, builder => {
  builder.addCase(SetTasks, (state, { payload }) => {
    return {
      ...state,
      tasks: payload,
    };
  });

  builder.addCase(CreateTaskSuccess, (state, { payload }) => {
    return {
      ...state,
      createTaskSuccess: payload,
    };
  });

  builder.addCase(updateTask, (state, { payload }) => {
    const tasks =
      state &&
      state.tasks &&
      state.tasks.map(task => {
        if (task.id === payload.id) {
          return payload;
        }

        return task;
      });

    return {
      ...state,
      tasks: tasks,
    };
  });

  builder.addCase(deleteTask, (state, { payload }) => {
    const tasks =
      state &&
      state.tasks &&
      state.tasks.filter(task => {
        if (task.id !== payload) {
          return task;
        }
      });

    return {
      ...state,
      tasks: tasks,
    };
  });

  builder.addCase(setTaskToEdit, (state, { payload }) => {
    return {
      ...state,
      taskToEdit: payload,
    };
  });
});
