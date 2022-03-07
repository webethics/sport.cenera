import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardAvatarStyle';

const useStyles = makeStyles(styles);

type Props = {
  children: React.ReactNode;
  className?: string;
  profile?: boolean;
  plain?: boolean;
  testimonial?: boolean;
  testimonialFooter?: boolean;
};

export const CardAvatar: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { children, className, plain, profile, testimonial, testimonialFooter, ...rest } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [classes.cardAvatarTestimonial]: testimonial,
    [classes.cardAvatarTestimonialFooter]: testimonialFooter,
    [className]: className !== undefined,
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
};
