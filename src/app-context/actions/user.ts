import { ReducerAction } from '@cenera/app-context';

/**
 * -----------  Action types ------------
 */
export const USER_GET_PROFILE_RESPONSE = 'USER_GET_PROFILE_RESPONSE';

/**
 * -----------  Action functions --------
 */
export const UserProfileReceived = (payload: any | null): ReducerAction => {
  return { ...(payload ? payload.data : null), type: USER_GET_PROFILE_RESPONSE };
};
