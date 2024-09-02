export interface CreateAccountProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ToggleVisibilityIconProps {
  isVisible: boolean;
  onToggle: () => void;
  iconColor: string;
}

export interface IDoubleInput {
  password: boolean;
  confirmPassword: boolean;
}

export enum ValidationType {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  CONFIRM_PASSWORD = 'CONFIRM_PASSWORD',
}

export interface RegisterAccount
  extends Omit<CreateAccountProps, 'confirmPassword'> {}

export interface LoginProps {
  email: string;
  password: string;
}
