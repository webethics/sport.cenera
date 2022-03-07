import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardTextStyle';

const useStyles = makeStyles(styles as any);

type Props = {
  className: string;
  color: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
  children: React.ReactNode;
};

export const CardText: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardTextClasses = classNames({
    [classes.cardText]: true,
    [classes[color + 'CardHeader']]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardTextClasses} {...rest}>
      {children}
    </div>
  );
};
