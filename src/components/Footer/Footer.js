/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from './footerStyle.js';

const useStyles = makeStyles(styles);

export function Footer(props) {
  const classes = useStyles();
  const { fluid, white } = props;
  let container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  let anchor =
    classes.a +
    cx({
      [' ' + classes.whiteColor]: white,
    });
  let block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}></div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href="/" className={anchor} target="_blank">
            Cenera Sports Web
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
};
