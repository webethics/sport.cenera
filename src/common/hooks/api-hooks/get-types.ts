import { useEffect } from 'react';

import { MiscService } from '@cenera/services/api/misc';
import { useAppContext, AppTypesReceived } from '@cenera/app-context';

export const useGetTypes = () => {
  const [appState, appDispatch] = useAppContext();

  useEffect(() => {
    MiscService.getTypes(appState.authentication.accessToken)
      .then(res => {
        if (res.data) {
          appDispatch(AppTypesReceived(res.data));
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.authentication.accessToken]);
};

