import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardFooterStyle';

const useStyles = makeStyles(styles as any);

type Props = {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  stats?: boolean;
  chart?: boolean;
  product?: boolean;
  children?: React.ReactNode;
};

export const CardFooter: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { className, children, plain, profile, pricing, testimonial, stats, chart, product, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile || testimonial,
    [classes.cardFooterPricing]: pricing,
    [classes.cardFooterTestimonial]: testimonial,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart || product,
    [className]: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};
