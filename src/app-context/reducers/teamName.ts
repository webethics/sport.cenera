//import { preferences } from '@cenera/utils/storage';

import { ReducerAction } from '../interface';
import { TEAM_NAME } from  '@cenera/app-context/actions';
import { TeamName} from '@cenera/models';

export const appTeamNameReducer = (teamName: TeamName, action: ReducerAction): TeamName => {

  switch (action.type) {
    /* User logs in successfully */
    case TEAM_NAME:
      const payload = action.payload;
     
      return payload;

    default:
      return teamName;
  }
};
