import { useContext } from 'react';
import { appContext } from './Provider';
import { AppState, ReducerAction, AppContext } from './interface';

export const useAppContext = (): [AppState, React.Dispatch<ReducerAction>] => {
  const { state, dispatch } = useContext<AppContext>(appContext);
  return [state, dispatch];
};
