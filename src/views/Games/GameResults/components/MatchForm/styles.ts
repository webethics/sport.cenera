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
  inputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamInputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamNameContainer: {
    flex: 1,
    padding: '0 24px',
  },
  teamScoreContainer: {
    flex: 0.3,
    padding: '0 24px',
  },
  vsDivider: {
    fontSize: '16px',
    fontWeight: 500,
    paddingTop: '10px',
    margin: '0 24px',
  },
  btnContainer: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
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
