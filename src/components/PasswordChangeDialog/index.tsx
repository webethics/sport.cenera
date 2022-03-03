import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { CustomInput } from '@cenera/components/CustomInput/CustomInput';
import { UserService } from '@cenera/services/api';
import { useAppContext } from '@cenera/app-context';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

import { styles } from './styles';
const useStyles = makeStyles(styles as any);

type Props = {
  open: boolean;
  onClose: () => void;
};

export const PasswordChangeDialog: FC<Props> = ({ open, onClose }: Props) => {
  const classes = useStyles();
  const [appState] = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues = { password: '', confirmPassword: '' };
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Required *')
        .min(6, 'Min Length is 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password and Password Confirm do not match')
        .required('Password confirm is required'),
    }),
    onSubmit: async formValues => {
      try {
        if (formik.isValid) {
          const res = await UserService.changePassword(
            formValues.password,
            appState.user.user_id,
            appState.authentication.accessToken
          );
          enqueueSnackbar(res.data.message || 'Your password updated successfully', { variant: 'success' });
          formik.setValues(initialFormValues);
          onClose();
        }
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      }
    },
  });

  const { handleChange, handleBlur, values, errors, touched } = formik;

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>To update your password, please fill in your new password.</DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            error={touched.password && errors.password ? true : false}
            labelText="New Password *"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: values.password,
              onChange: handleChange,
              onBlur: handleBlur,
              type: 'password',
            }}
          />
          {errors.password && touched.password ? <label className={classes.errorLabel}>{errors.password}</label> : null}

          <CustomInput
            error={touched.confirmPassword && errors.confirmPassword ? true : false}
            labelText="New Password Confirmation *"
            id="confirmPassword"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: values.confirmPassword,
              onChange: handleChange,
              onBlur: handleBlur,
              type: 'password',
            }}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <label className={classes.errorLabel}>{errors.confirmPassword}</label>
          ) : null}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={formik.isSubmitting} color="primary">
          Cancel
        </Button>
        <Button onClick={formik.submitForm} disabled={formik.isSubmitting} color="primary">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};
