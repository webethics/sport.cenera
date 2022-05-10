import useRequest from "@cenera/common/hooks/useRequest";

import { GameService } from "@cenera/services/api/game";
import { useAppContext } from "@cenera/app-context";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { GetAwayTeamReqResponse } from "@cenera/services/api/types"; // new

export const useFetchAwayTeamInfo = (team_id?: number) => {
  const { getGameAwayTeam } = GameService;
  const [appState] = useAppContext();

  const swr = useRequest<GetAwayTeamReqResponse>(getGameAwayTeam(appState.authentication.accessToken, team_id));

  return {
    awayTeamInfo: swr.data && swr.data,
    loading: !swr.data && !swr.error,
    error: getErrorMessage(swr.error),
    isValidating: swr.isValidating,
    revalidate: swr.revalidate,
  };
};
