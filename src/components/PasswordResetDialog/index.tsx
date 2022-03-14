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
import { getErrorMessage } from '@cenera/common/utils/error-helper';

import { styles } from './styles';
const useStyles = makeStyles(styles as any);

type Props = {
  open: boolean;
  onClose: () => void;
};

export const PasswordResetDialog: FC<Props> = ({ open, onClose }: Props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues = { email: '' };
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required *')
        .email('Enter a valid email address'),
    }),
    onSubmit: async formValues => {
      try {
        if (formik.isValid) {
          const res = await UserService.requestPasswordReset(formValues.email);
          enqueueSnackbar(
            res.data.message ||
              'Request for password reset has been successfully registered, you should get an email shortly.',
            { variant: 'success' }
          );
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
        <DialogContentText>
          To reset your password, fill in your email address and click on request password reset button. If your email
          address is registered before, you should receive an email shortly after submiting.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            error={touched.email && errors.email ? true : false}
            labelText="Your Email Address *"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: values.email,
              onChange: handleChange,
              onBlur: handleBlur,
              type: 'email',
            }}
          />
          {errors.email && touched.email ? <label className={classes.errorLabel}>{errors.email}</label> : null}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={formik.isSubmitting} color="primary">
          Cancel
        </Button>
        <Button onClick={formik.submitForm} disabled={formik.isSubmitting} color="primary">
          Request Password Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};
