//import { preferences } from '@cenera/utils/storage';

import { ReducerAction } from '../interface';
import { APP_LINEUP_TEAMID ,} from  '@cenera/app-context/actions';
import { LineupTeamId ,} from '@cenera/models';

export const appLineupTeamIdReducer = (teamId: LineupTeamId, action: ReducerAction): LineupTeamId => {

  switch (action.type) {

   
    /* User logs in successfully */
    case APP_LINEUP_TEAMID:
      const payload = action.payload;
     
      return payload;

    default:
      return teamId;
  }
};
