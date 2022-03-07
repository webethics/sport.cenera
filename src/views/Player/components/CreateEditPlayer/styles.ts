import { Theme } from '@material-ui/core';
import { selectStyles } from '@cenera/common/styles/select-styles';

export const styles = (theme: Theme) => ({
  playerImageContainer: {
    margin: '12px auto',
  },
  imageUploadContainer: {
    flex: 1,
  },
  imgBtnContainers: {
    display: 'flex',
    flexDirection: 'row',
    '& > label': {
      margin: '0 12px',
    },
  },
  fileUploadFormControl: {
    margin: '0 auto',
    width: 'max-content',
    display: 'block',
  },
  fileInput: {
    display: 'none',
  },
  teamLogo: {
    maxWidth: '40%',
    margin: '24px auto',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
  },
  btnCancel: {
    flex: 1,
    margin: '36px 12px',
    marginBottom: 0,
  },
  btnSubmit: {
    flex: 1,
    margin: '36px 12px',
    marginBottom: 0,
  },
  playerImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    margin: '24px auto 0 auto',
    display: 'block',
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
