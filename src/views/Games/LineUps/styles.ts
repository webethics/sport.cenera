import { Theme } from '@material-ui/core';
import buttonStyle from '@cenera/components/Button/buttonStyle';

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
  lineTitle: {
    fontWeight: 500,
    textAlign: 'center',
  },
  ...buttonStyle,
});
