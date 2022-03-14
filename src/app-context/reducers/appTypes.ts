import { preferences } from '@cenera/utils/storage';

import { ReducerAction } from '../interface';
import { APP_TYPES_RECEIVED } from '../actions';
import { AppTypes } from '@cenera/models';
import { GetTypesReqResponse } from '@cenera/services/api/types';

export const appTypesReducer = (appTypes: AppTypes, action: ReducerAction): AppTypes => {
  switch (action.type) {
    /* User logs in successfully */
    case APP_TYPES_RECEIVED:
      const payload = action.payload as GetTypesReqResponse;

      const newAppTypes: AppTypes = {
        clubSportsTypes: payload.find(p => p.type_name === 'club_sportstype')?.values,
        teamTypes: payload.find(p => p.type_name === 'team_type')?.values,
        userTypes: payload.find(p => p.type_name === 'user_type')?.values,
      };

      preferences.appTypes = newAppTypes;

      return newAppTypes;

    default:
      return appTypes;
  }
};
