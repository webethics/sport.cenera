import { User } from '@cenera/models';
import { ReducerAction } from '@cenera/app-context/interface';
import { USER_GET_PROFILE_RESPONSE, USER_LOGOUT, USER_LOGIN_VERIFIED } from '@cenera/app-context/actions';
import { preferences } from '@cenera/utils/storage';

export const userReducer = (user: User | null, action: ReducerAction): User | null => {
  switch (action.type) {
    case USER_LOGIN_VERIFIED: {
      const { user_id, user_type, club_id, team_id, user_login } = action;

      preferences.user = { user_id, user_type, club_id, team_id, user_login };

      return { ...user, ...preferences.user };
    }
    case USER_GET_PROFILE_RESPONSE: {
      const { user_id, user_type, club_id, team_id, user_login, lastLogin } = action;

      preferences.user = { user_id, user_type, club_id, team_id, user_login, lastLogin };

      return { ...user, ...preferences.user };
    }
    case USER_LOGOUT:
      preferences.user = null;
      return null;

    default:
      return user;
  }
};
