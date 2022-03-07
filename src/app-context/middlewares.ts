/** Checks if the given object is Promise or not */
const isPromise = (obj: any) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

/** A thunk middleware for async dispatches */
export const thunkMiddleware = (dispatch: any) => {
  return (action: any) => {
    if (isPromise(action)) {
      action.then((v: any) => {
        dispatch({ type: action.type, payload: v });
      });
    } else {
      dispatch(action);
    }
  };
};