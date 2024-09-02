import navigationService from '@mobile/services/navigation';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ngrok, base } from './server.json';
import { show } from '@mobile/utils/Alert';
import { setItem } from '@mobile/utils/Storage';

export enum AxiosStatus {
  Unauthorized = 401,
  Forbidden = 403,
  ServerError = 500,
  BadGetWay = 502,
}

const axiosInstance = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const getClient = (): AxiosInstance => axiosInstance;

export const setAuthorizationHeader = (token: string) => {
  axiosInstance.defaults.headers.Authorization = token;
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError) => {
    if (err.response) {
      if (err.response.status === AxiosStatus.BadGetWay) {
        show('Ops surgiu um erro, tente novamente mais tarde');
      }

      if (err.response && err.response.status === AxiosStatus.ServerError) {
        // show(err.response);
        console.log('entrei aqui 1', err);
      }
      if (err.response && err.response.status === AxiosStatus.Unauthorized) {
        console.log(err.response);
        setItem('token', '');
        navigationService.navigate('Auth');
      }
      if (err.response && err.response.status === AxiosStatus.Forbidden) {
        console.log(err.response);
        setItem('token', '');
        navigationService.navigate('Auth');
      }

      if (err.response && err.response.status === 400 && err.response.data) {
        throw new Error(err.response.data.message);
      }
    }
  },
);
