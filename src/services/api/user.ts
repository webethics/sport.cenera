import axios, { AxiosRequestConfig } from 'axios';

import configs from '@cenera/configs';
import { LoginReqParams, LoginReqResult, UserUpdateReqResponse } from './types';
import { User } from '@cenera/models';

const login = ({ email, password }: LoginReqParams) => {
  return axios.post<LoginReqResult>(`${configs.app.api}/userAuthentication`, {
    password,
    function: 'login',
    user_login: email,
  });
};

const getUsers = (access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getUsers`,
    method: 'post',
    data: {
      access_token,
    },
  };
};

const createOrUpdateUser = (user: User, access_token: string) => {
  return axios.post<UserUpdateReqResponse>(`${configs.app.api}/updateUser`, {
    access_token,
    updateType: user.user_id ? 'update' : 'create',
    ...user,
  });
};

const deleteUser = (user_id: number, access_token: string) => {
  return axios.post<UserUpdateReqResponse>(`${configs.app.api}/updateUser`, {
    access_token,
    user_id,
    updateType: 'delete',
  });
};

const changePassword = (user_pwd: string, user_id: number, access_token: string) => {
  return axios.post<UserUpdateReqResponse>(`${configs.app.api}/updateUser`, {
    access_token,
    user_pwd,
    user_id,
    updateType: 'updatePassword',
  });
};

const requestPasswordReset = (user_login: string) => {
  return axios.post<UserUpdateReqResponse>(`${configs.app.api}/userAuthentication`, {
    user_login,
    function: 'passwordReset',
  });
};

const resetPassword = (data: { user_login: string; user_pwd: string; access_token: string }) => {
  return axios.post<UserUpdateReqResponse>(`${configs.app.api}/updateUser`, {
    ...data,
    updateType: 'passwordReset',
  });
};

export const UserService = {
  login,
  getUsers,
  createOrUpdateUser,
  deleteUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
};
