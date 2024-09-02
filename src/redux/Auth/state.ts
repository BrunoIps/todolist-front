export type User = {
  id: string;
  email: string;
  name: string;
  recoveryCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted_at: Date | null;
  tasks: Task[];
};

type Task = {
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

export type AuthState = {
  createAccount: boolean;
  createAccountError: string | null;
  loginSuccess: boolean;
  loginError: string | null;
  user: User | null;
};

export const initialState: AuthState = {
  createAccount: false,
  createAccountError: null,
  loginSuccess: false,
  loginError: null,
  user: null,
};
