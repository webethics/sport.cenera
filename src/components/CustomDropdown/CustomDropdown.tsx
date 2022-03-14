import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
// core components
import { Button } from '@cenera/components/Button/Button';

import { customDropdownStyle } from './customDropdownStyle';

const useStyles = makeStyles(customDropdownStyle as any);

type Props = {
  hoverColor: 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  buttonText: React.ReactNode;
  buttonIcon: any;
  dropdownList: any[];
  buttonProps: object;
  dropup: boolean;
  dropdownHeader: React.ReactNode;
  rtlActive: boolean;
  caret: boolean;
  dropPlacement:
    | 'bottom'
    | 'top'
    | 'right'
    | 'left'
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
  noLiPadding: boolean;
  innerDropDown: boolean;
  navDropdown: boolean;
  // This is a function that returns the clicked menu item
  onClick: (param: any) => void;
};

export const CustomDropdown: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event: any) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event: any) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };
  const handleCloseMenu = (param: any) => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    dropPlacement,
    rtlActive,
    noLiPadding,
    innerDropDown,
    navDropdown,
  } = props;
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretDropup]: dropup && !anchorEl,
    [classes.caretActive]: Boolean(anchorEl) && !dropup,
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + 'Hover']]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  const dropDownMenu = (
    <MenuList role="menu" className={classes.menuList}>
      {dropdownHeader !== undefined ? (
        <MenuItem onClick={() => handleCloseMenu(dropdownHeader)} className={classes.dropdownHeader}>
          {dropdownHeader}
        </MenuItem>
      ) : null}
      {dropdownList.map((prop, key) => {
        if (prop.divider) {
          return (
            <Divider key={key} onClick={() => handleCloseMenu('divider')} className={classes.dropdownDividerItem} />
          );
        }
        if (prop.props !== undefined && prop.props['data-ref'] === 'multi') {
          return (
            <MenuItem key={key} className={dropdownItem} style={{ overflow: 'visible', padding: 0 }}>
              {prop}
            </MenuItem>
          );
        }
        return (
          <MenuItem key={key} onClick={() => handleCloseMenu(prop)} className={dropdownItem}>
            {prop}
          </MenuItem>
        );
      })}
    </MenuList>
  );

  const ButtonIcon = buttonIcon;

  return (
    <div className={innerDropDown ? classes.innerManager : classes.manager}>
      <div className={buttonText !== undefined ? '' : classes.target}>
        <Button
          aria-label="Notifications"
          aria-owns={anchorEl ? 'menu-list' : null}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}>
          {buttonIcon !== undefined ? <ButtonIcon className={classes.buttonIcon} /> : null}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition={true}
        disablePortal={true}
        placement={dropPlacement}
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
          [classes.popperNav]: Boolean(anchorEl) && navDropdown,
        })}>
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            // id="menu-list"
            style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}>
            <Paper className={classes.dropdown}>
              {innerDropDown ? (
                dropDownMenu
              ) : (
                <ClickAwayListener onClickAway={handleClose}>{dropDownMenu}</ClickAwayListener>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: 'primary',
};
