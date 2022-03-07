import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  grid: {
    padding: '0 15px !important',
  },
};

const useStyles = makeStyles(styles);

type Props = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export const GridItem = (props: Props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item={true} {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};
