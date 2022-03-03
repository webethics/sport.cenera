import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles, Backdrop, CircularProgress, IconButton } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { getErrorMessage } from '@cenera/common/utils/error-helper';
import { GameService } from '@cenera/services/api/game';
import { useAppContext } from '@cenera/app-context';
import { useShowConfirmDialog } from '@cenera/common/hooks/confirmDialog';
import { GameMatchRecord } from '@cenera/models';
import { CustomInput } from '@cenera/components/CustomInput/CustomInput';

import { styles } from './styles';
const useStyles = makeStyles(styles as any);

type Props = {
  toEditMatchRecord?: GameMatchRecord;
  onMatchRecordUpDeleted: () => void;
  onMatchRecordUpUpdated: () => void;
  team_id?:number;
};

export const MatchResultForm: FC<Props> = ({
  toEditMatchRecord,
  onMatchRecordUpDeleted,
  onMatchRecordUpUpdated,
  team_id
}: Props) => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [deleting, setDeleting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues = {
    match_team1_name: toEditMatchRecord ? toEditMatchRecord.match_team1_name || '' : '',
    match_team1_score: toEditMatchRecord ? toEditMatchRecord.match_team1_score || '' : '',
    match_team2_name: toEditMatchRecord ? toEditMatchRecord.match_team2_name || '' : '',
    match_team2_score: toEditMatchRecord ? toEditMatchRecord.match_team2_score || '' : '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      match_team1_name: Yup.string().required('Required *'),
      match_team2_name: Yup.string().required('Required *'),
      match_team1_score: Yup.number()
        .required('Required *')
        .min(0, 'Minimum should be zero'),
      match_team2_score: Yup.number()
        .required('Required *')
        .min(0, 'Minimum should be zero'),
    }),
    onSubmit: async formValues => {
      if (formik.isValid) {
        try {
          const res = await GameService.createGameMatchRecord(
            {   
              ...toEditMatchRecord,
              ...formValues,
              match_team1_score: formValues.match_team1_score.toString(),
              match_team2_score: formValues.match_team2_score.toString(),
            },
            appState.authentication.accessToken ,
            team_id
          );

          onMatchRecordUpUpdated();
          formik.setValues(initialFormValues);

          enqueueSnackbar(
            res && res.data && res.data.message ? res.data.message : 'Match record created/edited successfully',
            { variant: 'success' }
          );
        } catch (err) {
          enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
        }
      }
    },
  });

  const deleteMatchRecord = () => {
    setDeleting(true);

    GameService.deleteGameMatchRecord(toEditMatchRecord.match_id, appState.authentication.accessToken)
      .then(() => {
        showSuccessMessage();
        onMatchRecordUpDeleted();
      })
      .catch(err => {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteMatchRecord,
    successMessage: 'Match record deleted successfully',
    confirmMessage: 'Match record will be deleted for good!',
    showOKButtonAfterSuccess: false,
  });

  const handleLineDelete = () => {
    showConfirmDialog();
  };

  useEffect(() => {
    if (toEditMatchRecord) formik.setValues(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toEditMatchRecord]);

  const { values, touched, errors, handleChange, handleBlur } = formik;

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.inputsContainer}>
          <div className={classes.teamInputsContainer}>
            <div className={classes.teamNameContainer}>
              <CustomInput
                error={errors.match_team1_name && touched.match_team1_name ? true : false}
                labelText="Team 1 *"
                id="match_team1_name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.match_team1_name,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: 'text',
                }}
              />

              {errors.match_team1_name && touched.match_team1_name ? (
                <label className={classes.errorLabel}>{errors.match_team1_name}</label>
              ) : null}
            </div>
            <div className={classes.teamScoreContainer}>
              <CustomInput
                error={errors.match_team1_score && touched.match_team1_score ? true : false}
                labelText="Score *"
                id="match_team1_score"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.match_team1_score,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: 'number',
                }}
              />

              {errors.match_team1_score && touched.match_team1_score ? (
                <label className={classes.errorLabel}>{errors.match_team1_score}</label>
              ) : null}
            </div>
          </div>
          <div className={classes.vsDivider}>VS</div>
          <div className={classes.teamInputsContainer}>
            <div className={classes.teamNameContainer}>
              <CustomInput
                error={errors.match_team1_name && touched.match_team1_name ? true : false}
                labelText="Team 2 *"
                id="match_team2_name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.match_team2_name,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: 'text',
                }}
              />

              {errors.match_team2_name && touched.match_team2_name ? (
                <label className={classes.errorLabel}>{errors.match_team2_name}</label>
              ) : null}
            </div>
            <div className={classes.teamScoreContainer}>
              <CustomInput
                error={errors.match_team2_score && touched.match_team2_score ? true : false}
                labelText="Score *"
                id="match_team2_score"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.match_team2_score,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: 'number',
                }}
              />

              {errors.match_team2_score && touched.match_team2_score ? (
                <label className={classes.errorLabel}>{errors.match_team2_score}</label>
              ) : null}
            </div>
          </div>
          <div className={classes.btnContainer}>
            <IconButton aria-label="save" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
              <SaveIcon color="primary" />
            </IconButton>

            {toEditMatchRecord ? (
              <IconButton aria-label="delete" disabled={deleting} onClick={handleLineDelete}>
                <DeleteIcon color="secondary" />
              </IconButton>
            ) : null}
          </div>
        </div>
      </form>

      {alert}
      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
