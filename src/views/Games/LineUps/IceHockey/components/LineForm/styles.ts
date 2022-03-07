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

  btnContainer: {
    margin: '36px auto',
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    justifyContent: 'space-between',
  },
  btnSubmit: {
    flex: 1,
    margin: '12px 0',
  },
  btnDelete: {
    flex: 1,
    margin: '12px 0',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  ...buttonStyle,
});
