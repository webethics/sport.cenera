
import useRequest from "@cenera/common/hooks/useRequest";

import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import { getErrorMessage } from "@cenera/common/utils/error-helper";

export const useFetchPublicClubs=() => { 
  const { GetPublicClubs } = ActivityService;
  const swr = useRequest<any>(GetPublicClubs());

  return {
    clubsData: swr.data && swr.data,
    loading: !swr.data && !swr.error,
    error: getErrorMessage(swr.error),
    isValidating: swr.isValidating,
    revalidate: swr.revalidate,
  };
};

export const useFetchGetActivites=(data:any) => { 
  const { GetActivities } = ActivityService;
  const swr = useRequest<any>(GetActivities(data));
  const data1 =[swr.data];
  console.log(data1[0])

  return {
    acitivityData: swr.data && swr.data,
    loading: !swr.data && !swr.error,
    error: getErrorMessage(swr.error),
    isValidating: swr.isValidating,
    revalidate: swr.revalidate,
  };
};

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

export const useFetchWardrobes = () => {
  const { getWardrobes } = ActivityService;
  const [appState] = useAppContext();

  const result = useRequest<any>(getWardrobes(appState.authentication.accessToken));

  return {
    
    Wardrobesdata: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};

export const useFetchActivities = (newobj:any) => {
  const { getUpcomingActivities } = ActivityService;
  // const [appState] = useAppContext();
  
  const result = useRequest<any>(getUpcomingActivities(newobj));
  

  return {
    Activitydata: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};



export const useFetchEditActivities = (activity_id_list:any) => {
  const { getEditActivities } = ActivityService;
  const [appState] = useAppContext();
  
  const result = useRequest<any>(getEditActivities(appState.authentication.accessToken,appState.user.club_id,activity_id_list));

  return {
    EditActivitydata: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};
















