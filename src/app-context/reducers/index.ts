import { ReducerAction, AppState } from '../interface';
import { userReducer } from './user';
import { authReducer } from './auth';
import { appTypesReducer } from './appTypes';
import { appLineupTeamIdReducer } from './LineupTeamId';
import { appTeamNameReducer } from './teamName';


/**
 * App state root reducer
 */
export const RootReducer = (state: AppState, action: ReducerAction): AppState => ({
  user: userReducer(state.user, action),
  authentication: authReducer(state.authentication, action),
  appTypes: appTypesReducer(state.appTypes, action),
  teamId:appLineupTeamIdReducer(state.teamId, action),
  teamName:appTeamNameReducer(state.teamName, action)

});
