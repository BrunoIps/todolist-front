export type LoadingState = {
  createAccountLoading: boolean;
  loginLoading: boolean;
  getMeLoading: boolean;
  getTaskLoading: boolean;
  createTaskLoading: boolean;
  updateTaskLoading: boolean;
};

export const initialState: LoadingState = {
  createAccountLoading: false,
  loginLoading: false,
  getMeLoading: false,
  createTaskLoading: false,
  getTaskLoading: false,
  updateTaskLoading: false,
};
