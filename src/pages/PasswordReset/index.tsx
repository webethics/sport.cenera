import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// core components
import { GridContainer } from '@cenera/components/Grid/GridContainer';
import { GridItem } from '@cenera/components/Grid/GridItem';
import { CustomInput } from '@cenera/components/CustomInput/CustomInput';
import { Button } from '@cenera/components/Button/Button';
import { Card } from '@cenera/components/Card/Card';
import { CardBody } from '@cenera/components/Card/CardBody';
import { CardHeader } from '@cenera/components/Card/CardHeader';
import { CardFooter } from '@cenera/components/Card/CardFooter';
import { AuthNavbar } from '@cenera/components/NavBars/AuthNavbar';
import { Footer } from '@cenera/components/Footer/Footer';
import { useSnackbar } from 'notistack';

import { style } from './styles';
import { useAppContext } from '@cenera/app-context';
import { UserLoggedIn } from '@cenera/app-context/actions';
import { UserService } from '@cenera/services';
import { PasswordResetDialog } from '@cenera/components/PasswordResetDialog';

const useStyles = makeStyles(style as any);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PasswordReset() {
  const [cardAnimation, setCardAnimation] = useState('cardHidden');
  const [passwordResetDlgOpen, setPasswordResetDlgOpen] = useState(false);
  const [, appDispatch] = useAppContext();
  const query = useQuery();

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTimeout(() => {
      setCardAnimation('');
    }, 700);
  }, []);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .min(6, 'Min Length is 6 characters')
        .max(32, 'Max Length is 32 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password and Password Confirm do not match')
        .required('Password confirm is required'),
    }),
    onSubmit: async formValues => {
      if (formik.isValid) {
        try {
          const resetPasswordResult = await UserService.resetPassword({
            access_token: query.get('token'),
            user_login: query.get('userid'),
            user_pwd: formValues.confirmPassword,
          });
          if (resetPasswordResult.status === 200) {
            const { data: result } = await UserService.login({
              email: query.get('userid'),
              password: formValues.password,
            });

            appDispatch(UserLoggedIn(result));
            history.replace('/');
          } else {
            enqueueSnackbar('Password reset failed, maybe your reset link was expired..', { variant: 'error' });
          }
        } catch {
          enqueueSnackbar('Login failed, either your email or password was wrong.', { variant: 'error' });
        }
      }
    },
  });

  const { handleChange, handleBlur, values, errors, touched } = formik;

  return (
    <>
      <AuthNavbar brandText="Cenera Sports Web" />
      <div className={classes.wrapper}>
        <div className={classes.fullPage}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form onSubmit={formik.handleSubmit}>
                  <Card login={true} className={classes[cardAnimation]}>
                    <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="rose">
                      <h4 className={classes.cardTitle}>Password Reset</h4>
                      <div className={classes.socialLine}>Please fill the form to reset your password.</div>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="New Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={errors.password ? true : false}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                            </InputAdornment>
                          ),
                          name: 'password',
                          type: 'password',
                          autoComplete: 'off',
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.password,
                        }}
                      />
                      {errors.password && touched.password ? (
                        <label className={classes.errorLabel}>{errors.password}</label>
                      ) : null}

                      <CustomInput
                        labelText="Confirm Password"
                        id="confirmPassword"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={touched.confirmPassword && errors.confirmPassword ? true : false}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                            </InputAdornment>
                          ),
                          name: 'confirmPassword',
                          type: 'password',
                          autoComplete: 'off',
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.confirmPassword,
                        }}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <label className={classes.errorLabel}>{errors.confirmPassword}</label>
                      ) : null}

                      {formik.isSubmitting ? (
                        <CircularProgress size="24px" className={classes.circularProgress} />
                      ) : null}
                    </CardBody>

                    <CardFooter className={classes.justifyContentCenter}>
                      <Button
                        color="rose"
                        simple={true}
                        size="lg"
                        block={true}
                        type="submit"
                        disabled={formik.isSubmitting}>
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
            <PasswordResetDialog open={passwordResetDlgOpen} onClose={() => setPasswordResetDlgOpen(false)} />
          </div>
          <Footer white={true} />
        </div>
      </div>
    </>
  );
}
