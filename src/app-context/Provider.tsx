import React, { useReducer } from 'react';
import { preferences } from '@cenera/utils/storage';
import { AppContext, ReducerAction, AppState } from './interface';
import { RootReducer } from './reducers';
import { thunkMiddleware } from './middlewares';

/** Keeps current app state */
let currentState: AppState;

/** Initial application global state */
const InitialAppState: AppState = {
  user: preferences.user,
  authentication: {
    accessToken: preferences.accessToken,
  },
  appTypes: preferences.appTypes,
  teamId :null,
  teamName: null
};

/** Returns a freezed version of current app's global state */
export function getAppState(): AppState {
  return Object.freeze(currentState);
}

/** Keeps current app dispatcher function, so we can reference it in appDisptach function */
let currentDispatcher: (action: ReducerAction | Promise<any>) => void;

/** Dispatches given action to application's store */
export function appDispatch(action: ReducerAction | Promise<any>) {
  currentDispatcher(action);
}

/**
 * Applications context
 *
 * Check AppContextHookProvider function for complete implementation.
 */
export const appContext = React.createContext<AppContext>({
  state: InitialAppState,
  // tslint:disable-next-line: no-empty
  dispatch: (_action: ReducerAction | Promise<any>) => {},
});

/**
 * App context provider HOC
 *
 * A wrapper for app context provider
 */
export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RootReducer, InitialAppState);
  currentState = state;
  currentDispatcher = dispatch as any;

  const contextValue = { state, dispatch: thunkMiddleware(dispatch) };

  return <appContext.Provider value={contextValue}>{children}</appContext.Provider>;
};
