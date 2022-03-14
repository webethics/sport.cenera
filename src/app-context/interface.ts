import { User, Authentication, AppTypes,LineupTeamId ,TeamName } from '@cenera/models'; // LineupTeamId ,TeamName is new
 
/**
 * Represents the Application's global state structure.
 */
export type AppState = {
  /** Authenticated user */
  user: User | null;

  /** All needed tokens */
  authentication: Authentication;

  /** Club Types, Player Types and User Types */
  appTypes: AppTypes;

  teamId: LineupTeamId;
  teamName: TeamName;
};

/**
 * Represents the structure of action which will be dispatched to reducer
 *
 * All actions must have `type` field and possible few more fields as payload.
 */
export type ReducerAction = {
  type: string;
  [key: string]: any;
};

/**
 * The structure of Application's context.
 *
 * Including `state` representing the global state and `dispatch`
 * function which dispatches an action or promise to reducer.
 */
export type AppContext = {
  state: AppState;
  dispatch: React.Dispatch<ReducerAction>;
};
