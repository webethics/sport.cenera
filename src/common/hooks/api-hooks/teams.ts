import useRequest from '@cenera/common/hooks/useRequest';

import { TeamService } from '@cenera/services/api/teams';
import { useAppContext } from '@cenera/app-context';
import { GetTeamsReqResponse, GetTeamReqResponse } from '@cenera/services/api/types';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

export const useFetchTeams = () => {
  const { getTeams } = TeamService;
  const [appState] = useAppContext();

  const result = useRequest<GetTeamsReqResponse>(getTeams(appState.authentication.accessToken));

  return {
    teams: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};



export const useFetchTeam = (teamId: number) => {
  const { getTeam } = TeamService;
  const [appState] = useAppContext();

  const result = useRequest<GetTeamReqResponse>(teamId ? getTeam(teamId, appState.authentication.accessToken) : null);

  return {
    team: result.data && result.data.length > 0 ? result.data[0] : null,
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};
