import { ReducerAction } from '@cenera/app-context';

/**
 * -----------  Action types ------------
 */
export const APP_LINEUP_TEAMID = 'APP_LINEUP_TEAMID';

/**
 * -----------  Action functions --------
 */
export const LineupTeamId = (payload:any): ReducerAction => {
  return { payload, type: APP_LINEUP_TEAMID };
};


