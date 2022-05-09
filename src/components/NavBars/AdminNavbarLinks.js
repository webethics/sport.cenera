import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';

// @material-ui/icons
import Person from '@material-ui/icons/Person';

// core components
import { Button } from '@cenera/components/Button/Button';
import { useAppContext, UserLogout } from '@cenera/app-context';
import { PasswordChangeDialog } from '@cenera/components/PasswordChangeDialog';

import styles from './adminNavbarLinksStyle';

const useStyles = makeStyles(styles);

export function AdminNavBarLinks(props) {
  const [, appDispatch] = useAppContext();

  const [openUserMenu, setOpenUserMenu] = useState(null);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);

  const handleClickUserMenu = event => {
    if (openUserMenu && openUserMenu.contains(event.target)) {
      setOpenUserMenu(null);
    } else {
      setOpenUserMenu(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(null);
  };

  const handleLogOut = () => {
    setOpenUserMenu(null);
    appDispatch(UserLogout());
    localStorage.removeItem("appState");
  };

  const classes = useStyles();
  const { rtlActive } = props;

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });

  return (
    <div className={wrapper}>
      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openUserMenu ? 'profile-menu-list' : null}
          aria-haspopup="true"
          onClick={handleClickUserMenu}
          className={classes.buttonLink}
          muiClasses={{
            label: '',
          }}>
          <Person className={classes.headerLinksSvg + ' ' + classes.links} />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickUserMenu} className={classes.linkText}>
              Profile
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openUserMenu)}
          anchorEl={openUserMenu}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openUserMenu,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} id="profile-menu-list" style={{ transformOrigin: '0 0 0' }}>
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseUserMenu}>
                  <MenuList role="menu">
                    <MenuItem onClick={() => setPasswordChangeOpen(true)} className={dropdownItem}>
                      Change Password
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={handleLogOut} className={dropdownItem}>
                      Log out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <PasswordChangeDialog open={passwordChangeOpen} onClose={() => setPasswordChangeOpen(false)} />
    </div>
  );
}

AdminNavBarLinks.propTypes = {
  rtlActive: PropTypes.bool,
};
