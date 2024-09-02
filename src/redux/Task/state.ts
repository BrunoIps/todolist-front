export type Task = {
  id?: string;
  user_id: string;
  title: string;
  description?: string;
  is_done: boolean;
  start_date: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type TaskState = {
  tasks: Task[] | null;
  createTaskSuccess: boolean;
  taskToEdit: string | null;
};

export const initialState: TaskState = {
  createTaskSuccess: false,
  tasks: null,
  taskToEdit: null,
};
