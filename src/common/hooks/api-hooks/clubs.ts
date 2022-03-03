import useRequest from '@cenera/common/hooks/useRequest';

import { ClubService } from '@cenera/services/api/clubs';
import { useAppContext } from '@cenera/app-context';
import { GetClubsReqResponse, GetClubReqResponse } from '@cenera/services/api/types';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

export const useFetchClubs = () => {
  const { getClubs } = ClubService;
  const [appState] = useAppContext();

  const result = useRequest<GetClubsReqResponse>(getClubs(appState.authentication.accessToken));

  return {
    clubs: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};

export const useFetchClub = (clubId: number) => {
  const { getClub } = ClubService;
  const [appState] = useAppContext();

  const result = useRequest<GetClubReqResponse>(clubId ? getClub(clubId, appState.authentication.accessToken) : null);

  return {
    club: result.data && result.data.length > 0 ? result.data[0] : null,
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};
