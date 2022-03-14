import { GetTypesReqResponse } from '@cenera/services/api/types';
import { ReducerAction } from '@cenera/app-context';

/**
 * -----------  Action types ------------
 */
export const APP_TYPES_RECEIVED = 'APP_TYPES_RECEIVED';

/**
 * -----------  Action functions --------
 */
export const AppTypesReceived = (payload: GetTypesReqResponse): ReducerAction => {
  return { payload, type: APP_TYPES_RECEIVED };
};
