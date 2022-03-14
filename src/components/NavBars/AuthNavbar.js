import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';

// core components
import { Button } from '@cenera/components/Button/Button';

import styles from './authNavbarStyle';

const useStyles = makeStyles(styles);

export function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();
  const { color, brandText } = props;
  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  });

  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              {brandText}
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              {brandText}
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}>
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={'right'}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}></Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
};
