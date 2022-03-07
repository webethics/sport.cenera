import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  container: {
    margin: '0 auto',
  },
  circularProgress: {
    display: 'block',
    margin: 'auto',
  },
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: 'block',
    marginTop: '-12px',
  },
  btnContainer: {
    margin: '36px auto',
    display: 'flex',
    width: '60%',
    justifyContent: 'space-between',
  },
  btnSubmit: {
    flex: 1,
    margin: '0 24px',
  },
  btnDelete: {
    flex: 1,
    margin: '0 24px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },



  rightFormContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

});
