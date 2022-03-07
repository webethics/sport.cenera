import { Theme } from '@material-ui/core';
import { selectStyles } from '@cenera/common/styles/select-styles';

export const styles = (theme: Theme) => ({
  rightFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageUploadContainer: {
    flex: 1,
  },
  fileUploadFormControl: {
    margin: '0 auto',
    width: 'max-content',
    display: 'block',
  },
  fileInput: {
    display: 'none',
  },
  clubLogo: {
    maxWidth: '40%',
    margin: '24px auto',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  btnSubmit: {
    width: '100%',
    margin: '0 12px',
  },
  btnContainer: {
    display: 'flex',
    width: '50%',
    margin: '0 auto',
  },
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: 'block',
    marginTop: '-12px',
  },
  ...selectStyles(),
});
