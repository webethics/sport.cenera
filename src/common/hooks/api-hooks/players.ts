import useRequest from '@cenera/common/hooks/useRequest';

import { PlayerService } from '@cenera/services/api/players';
import { useAppContext } from '@cenera/app-context';
import { GetPlayerReqResponse } from '@cenera/services/api/types';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

export const useFetchPlayer = (playerId: number) => {
  const { getPlayer } = PlayerService;
  const [appState] = useAppContext();

  const result = useRequest<GetPlayerReqResponse>(
    playerId ? getPlayer(playerId, appState.authentication.accessToken) : null
  );

  return {
    player: result.data && result.data.length > 0 ? result.data[0] : null,
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};
