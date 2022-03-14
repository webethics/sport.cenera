import { LoginReqResult } from '@cenera/services/api/types/auth';
import { ReducerAction } from '@cenera/app-context';

/**
 * -----------  Action types ------------
 */
export const USER_LOGIN_VERIFIED = 'USER_LOGIN_VERIFIED';
export const USER_LOGOUT = 'USER_LOGOUT';
export const AUTH_TOKEN_REJECTED = 'AUTH_TOKEN_REJECTED';

/**
 * -----------  Action functions --------
 */
export const UserLoggedIn = (payload: LoginReqResult): ReducerAction => {
  return { ...payload, type: USER_LOGIN_VERIFIED };
};

export const UserLogout = (): ReducerAction => {
  return { type: USER_LOGOUT };
};


export const AuthTokenRejected = (): ReducerAction => {
  return { type: AUTH_TOKEN_REJECTED };
};
