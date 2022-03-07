import React from 'react';
import classNames from 'classnames';
import MatButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import styles from './buttonStyle';

const useStyles = makeStyles(styles as any);

type Props = {
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'twitter'
    | 'facebook'
    | 'google'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'tumblr'
    | 'github'
    | 'behance'
    | 'dribbble'
    | 'reddit'
    | 'transparent';
  size?: 'sm' | 'lg';
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string;
  muiClasses?: any;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode | React.ReactText;
  onClick?: (event: any) => void;
  [key: string]: any;
};

export const Button = React.forwardRef<any, Props>((props: Props, ref) => {
  const classes = useStyles();
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <MatButton {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </MatButton>
  );
});
