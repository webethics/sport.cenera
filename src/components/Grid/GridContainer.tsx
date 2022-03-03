import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  grid: {
    margin: '0 -15px',
    width: 'calc(100% + 30px)',
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  },
};

const useStyles = makeStyles(styles);

type Props = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export const GridContainer = (props: Props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container={true} {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};
