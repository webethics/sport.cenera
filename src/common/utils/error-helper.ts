export const getErrorMessage = (err: any): string => {
  if (!err) {
    return null;
  }

  if (err.response) {
    if (err.response.data && err.response.data.fa_message) return err.response.data.fa_message;
    if (err.response.status === 401) return 'Your are not authorized to to this operation.';
    if (err.response.status === 409) return 'Already Exists!';
    return 'An error occurred while contacting server.';
  }
  if (err.isAxiosError) {
    return 'Network Error, please check your internet connection.';
  }
  return 'Unknown error, please contact support.';
};
