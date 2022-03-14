import useRequest from '@cenera/common/hooks/useRequest';

import { GameService } from '@cenera/services/api/game';
import { useAppContext } from '@cenera/app-context';
import { GetGameInfoReqResponse } from '@cenera/services/api/types';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

export const useFetchGameInfo = (team_id?:number) => {
  
  const { getGameInfo } = GameService;
  const [appState] = useAppContext();

  const swr = useRequest<GetGameInfoReqResponse>(getGameInfo(appState.authentication.accessToken , team_id));

 

  return {
    gameInfo: swr.data && swr.data,
    loading: !swr.data && !swr.error,
    error: getErrorMessage(swr.error),
    isValidating: swr.isValidating,
    revalidate: swr.revalidate,
  };
};


export const useUpdateGameInfo = ()=> {

}

