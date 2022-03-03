import { Theme } from '@material-ui/core';

import { grayColor, infoColor, whiteColor } from '@cenera/common/styles/common-styles';
import buttonStyle from '@cenera/components/Button/buttonStyle';

const sweetAlertStyle = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  cardTitle: {
    marginTop: '0',
    marginBottom: '3px',
    color: grayColor[2],
    fontSize: '18px',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  circularProgress: {
    margin: '0 auto',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  cardBody: {
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'auto',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  addButton: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    margin: theme.spacing(1),
  },
  ...buttonStyle,
});

export default sweetAlertStyle;
