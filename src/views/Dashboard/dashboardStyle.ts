import { successColor, tooltip, cardTitle, grayColor } from '@cenera/common/styles/common-styles';

const dashboardStyle = {
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
    textAlign: 'center',
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: '14px',
    paddingTop: '10px',
    marginBottom: '0',
    marginTop: '0',
    margin: '0',
  },
  cardProductDesciprion: {
    textAlign: 'center',
    color: grayColor[0],
  },
  stats: {
    color: grayColor[0],
    fontSize: '12px',
    lineHeight: '22px',
    display: 'inline-flex',
    '& svg': {
      position: 'relative',
      top: '4px',
      width: '16px',
      height: '16px',
      marginRight: '3px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      top: '4px',
      fontSize: '16px',
      marginRight: '3px',
    },
  },
  productStats: {
    paddingTop: '7px',
    paddingBottom: '7px',
    margin: '0',
  },
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: 14,
    height: 14,
  },
  underChartIcons: {
    width: '17px',
    height: '17px',
  },
  price: {
    color: 'inherit',
    '& h4': {
      marginBottom: '0px',
      marginTop: '0px',
    },
  },
  circularProgress: {
    margin: '0 auto',
    display: 'block',
    width: '12px',
    height: '12px',
    '& svg': {
      position: 'static !important',
      width: 'unset !important',
      height: 'unset !important',
      marginRight: 'unset !important',
    },
  },
};

export default dashboardStyle;
