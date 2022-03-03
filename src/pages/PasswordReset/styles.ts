import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb,
  primaryColor,
} from '@cenera/common/styles/common-styles';

import loginBg from '@cenera/assets/images/login-bg.jpg';

export const style = (theme: any) => ({
  wrapper: {
    height: 'auto',
    minHeight: '100vh',
    position: 'relative',
    top: '0',
  },
  fullPage: {
    padding: '120px 0',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex!important',
    margin: '0',
    border: '0',
    color: whiteColor,
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
    backgroundImage: `url(${loginBg})`,
    [theme.breakpoints.down('sm')]: {
      minHeight: 'fit-content!important',
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      border: 'none !important',
    },
    '&:before': {
      backgroundColor: 'rgba(' + hexToRgb(blackColor) + ', 0.65)',
    },
    '&:before,&:after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: '2',
    },
  },
  container: {
    ...container,
    zIndex: '4',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor,
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  checkboxAndRadio: {
    position: 'relative',
    display: 'block',
    marginTop: '10px',
    marginBottom: '10px',
  },
  checked: {
    color: primaryColor[0] + '!important',
  },
  checkedIcon: {
    width: '20px',
    height: '20px',
    border: '1px solid rgba(' + hexToRgb(blackColor) + ', .54)',
    borderRadius: '3px',
  },
  uncheckedIcon: {
    width: '0px',
    height: '0px',
    padding: '9px',
    border: '1px solid rgba(' + hexToRgb(blackColor) + ', .54)',
    borderRadius: '3px',
  },
  circularProgress: {
    margin: '0 auto',
    display: 'block',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: 'block',
    marginTop: '-12px',
  },
});
