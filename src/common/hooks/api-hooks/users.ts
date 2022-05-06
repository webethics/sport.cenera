import useRequest from "@cenera/common/hooks/useRequest";

import { UserService } from "@cenera/services/api";
import { useAppContext } from "@cenera/app-context";
import { GetUsersReqResponse } from "@cenera/services/api/types";
import { getErrorMessage } from "@cenera/common/utils/error-helper";

export const useFetchUsers = () => {
  const { getUsers } = UserService;
  const [appState] = useAppContext();

  const result = useRequest<GetUsersReqResponse>(
    getUsers(appState.authentication.accessToken)
  );

  return {
    users: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};

export const useFetchUser = (id: any) => {
  const { getUser } = UserService;
  const [appState] = useAppContext();
  const result = useRequest<any>(
    getUser(appState.authentication.accessToken, id)
  );

  return {
    user: result.data ? result.data : [],
    loading: !result.data && !result.error,
    error: getErrorMessage(result.error),
    revalidate: result.revalidate,
  };
};
