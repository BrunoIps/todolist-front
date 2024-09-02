import { getClient } from '../axios';

const AuthApi = () => {
  const login = async (email: string, password: string) => {
    const client = getClient();
    const { data } = await client.post('/auth', {
      email,
      password,
    });
    return data;
  };

  const register = async (email: string, password: string, name: string) => {
    const client = getClient();
    const { data } = await client.post('/auth/register', {
      email,
      password,
      name,
    });
    return data;
  };

  const getMe = async (userId: string, date: Date) => {
    const client = getClient();
    const { data } = await client.post('/me', {
      userId,
      date,
    });

    return data;
  };

  return {
    login,
    register,
    getMe,
  };
};

export default AuthApi;
