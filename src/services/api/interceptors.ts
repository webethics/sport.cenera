import axios, { AxiosRequestConfig } from 'axios';

import configs from '@cenera/configs';
import { appDispatch, AuthTokenRejected } from '@cenera/app-context';

let previousInterceptor: number | null = null;

export const setInterceptors = () => {
  // Remove previous interceptor if any:
  axios.interceptors.request.eject(previousInterceptor);

  // Add a request interceptor
  previousInterceptor = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const { user, password } = configs.security.basicAuth;
    config.headers.Authorization = `Basic ${window.btoa(`${user}:${password}`)}`;
    return config;
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async error => {
      return new Promise(async (_, reject) => {
        if (error.response && error.response.status === 403) {
          appDispatch(AuthTokenRejected());
          reject(error);
          window.location.replace('/login');
        } else {
          reject(error);
        }
      });
    }
  );
};
