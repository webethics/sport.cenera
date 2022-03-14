import { ReducerAction } from '@cenera/app-context';

/**
 * -----------  Action types ------------
 */
export const TEAM_NAME = 'TEAM_NAME';

/**
 * -----------  Action functions --------
 */
export const TeamName = (payload:any): ReducerAction => {
  return { payload, type: TEAM_NAME };
};


