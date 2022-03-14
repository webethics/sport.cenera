import { preferences } from '@cenera/utils/storage';

import { ReducerAction } from '../interface';
import { AUTH_TOKEN_REJECTED, USER_LOGIN_VERIFIED, USER_LOGOUT } from '../actions';
import { Authentication } from '@cenera/models';

export const authReducer = (authentication: Authentication, action: ReducerAction): Authentication => {
  switch (action.type) {
    /* User logs in successfully */
    case USER_LOGIN_VERIFIED:
      const { access_token } = action;

      preferences.accessToken = access_token;

      const updatedAuth = {
        ...authentication,
        accessToken: access_token,
      };

      return updatedAuth;
    /* User logs out */
    case AUTH_TOKEN_REJECTED:
    case USER_LOGOUT:
      preferences.accessToken = null;
      preferences.user = null;

      return {
        ...authentication,
        accessToken: null,
      };
    default:
      return authentication;
  }
};
