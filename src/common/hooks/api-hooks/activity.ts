
import useRequest from "@cenera/common/hooks/useRequest";

import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
// import { GetLocationsResponse } from "@cenera/services/api/types"; // new

export const useFetchGetLocations= () => { 
  const { GetLocations } = ActivityService;
  const [appState] = useAppContext();
  const swr = useRequest<any>(GetLocations(appState.authentication.accessToken));

  return {
    locationData: swr.data && swr.data,
    loading: !swr.data && !swr.error,
    error: getErrorMessage(swr.error),
    isValidating: swr.isValidating,
    revalidate: swr.revalidate,
  };
};












