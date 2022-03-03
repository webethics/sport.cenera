import React, { useRef, useState, FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormLabel,
  Backdrop,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useAppContext } from '@cenera/app-context';
import { MiscService } from '@cenera/services/api/misc';
import { CardHeader, Card, CardBody } from '@cenera/components/Card';
import { GridContainer, GridItem } from '@cenera/components/Grid';
import { CustomInput } from '@cenera/components/CustomInput/CustomInput';
import { Button as CustomButton } from '@cenera/components/Button/Button';
import { getErrorMessage } from '@cenera/common/utils/error-helper';
import { Team } from '@cenera/models';
import configs from '@cenera/configs';

import { styles } from './styles';
import { TeamService } from '@cenera/services/api/teams';

const useStyles = makeStyles(styles as any);

type Props = {
  toEditTeam?: Team;
  selectedClubId: number;
  onTeamCreateOrEdit: () => void;
  onEditCancel: () => void;
};

export const CreateEditTeam: FC<Props> = ({ toEditTeam, selectedClubId, onTeamCreateOrEdit, onEditCancel }) => {
  const classes = useStyles();
  const [appState] = useAppContext();

  const teamLogoImgRef = useRef<HTMLImageElement>(null);
  const teamImageImgRef = useRef<HTMLImageElement>(null);
  const [uploading, setUploading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues = {
    team_name: toEditTeam ? toEditTeam.team_name : '',
    club_id: toEditTeam ? toEditTeam.club_id : selectedClubId,
    team_type: toEditTeam ? toEditTeam.team_type : '',
    team_image_logo: toEditTeam ? toEditTeam.team_image_logo : '',
    team_image: toEditTeam ? toEditTeam.team_image : '',
    textfield1: toEditTeam ? toEditTeam.textfield1 : '',
    textfield2: toEditTeam ? toEditTeam.textfield2 : '',
    textfield3: toEditTeam ? toEditTeam.textfield3 : '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      team_name: Yup.string().required('* Required'),
      team_type: Yup.string().required('* Please select a team type'),
    }),
    onSubmit: async formValues => {
      try {
        const team = toEditTeam ? { ...toEditTeam, ...formValues } : formValues;
        const res = await TeamService.createOrEditTeam(team, appState.authentication.accessToken);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        onTeamCreateOrEdit();
        //formik.setValues(initialFormValues);
        if(!toEditTeam){
          formik.setValues({ ...formValues, team_name: '', team_type: '',textfield1: '', textfield2: '' , textfield3: ''}, false);
        }
       
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      }
    },
  });

  const handleTeamLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const base64Reader = new FileReader();
    const binaryReader = new FileReader();

    // Show the image on screen
    base64Reader.onloadend = (p: ProgressEvent<FileReader>) => {
      if (id === 'teamLogoInput' && teamLogoImgRef.current) {
        teamLogoImgRef.current.src = p.target.result as any;
      } else if (teamImageImgRef.current) {
        teamImageImgRef.current.src = p.target.result as any;
      }
    };

    // Upload the image to server
    binaryReader.onloadend = (p: ProgressEvent<FileReader>) => {
      setUploading(true);
      MiscService.uploadImage(p.target.result)
        .then(res => {
          setUploading(false);

          if (res.data) {
            if (id === 'teamLogoInput' && teamLogoImgRef.current) {
              formik.setFieldValue('team_image_logo', res.data.filename);
              //enqueueSnackbar('Successfully uploaded team logo', { variant: 'success' });
            } else if (teamImageImgRef.current) {
              formik.setFieldValue('team_image', res.data.filename);
              //enqueueSnackbar('Successfully uploaded team image', { variant: 'success' });
            }
          }
        })
        .catch(() => {
          setUploading(false);
          //enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
        });
    };

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
        enqueueSnackbar(`Maximum image size is 1MB.  Yours was ${(file.size / (1024 * 1024)).toFixed(1)}MBs`, {
          variant: 'error',
        });
      } else {
        base64Reader.readAsDataURL(file);
        binaryReader.readAsArrayBuffer(file);
      }
    }
  };


  

  const { touched, errors, values, handleChange, handleBlur: formikHandleBlur } = formik;

  const handleBlur = (a: any) => {
    if (a.nativeEvent) {
      formikHandleBlur(a.nativeEvent);
    } else {
      formikHandleBlur(a);
    }
  };

  const handleRemoveTeamLogo = () => {
    formik.setFieldValue('team_image_logo', '');
    if (teamLogoImgRef.current) teamLogoImgRef.current.src = '';
  };

  const handleRemoveTeamImage = () => {
    formik.setFieldValue('team_image', '');
    if (teamImageImgRef.current) teamImageImgRef.current.src = '';
  };

  return (
    <Card>
      <CardHeader>
        <h4>{toEditTeam ? `Edit Team ${toEditTeam.team_name}` : 'Create New Team'}</h4>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} xl={4} >
              <CustomInput
                error={errors.team_name ? true : false}
                labelText="Team Name *"
                id="team_name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.team_name,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: 'text',
                }}
              />

              {errors.team_name && touched.team_name ? (
                <label className={classes.errorLabel}>{errors.team_name}</label>
              ) : null}

              {errors.club_id && touched.club_id ? (
                <label className={classes.errorLabel}>{errors.club_id}</label>
              ) : null}

              <FormControl fullWidth={true} className={classes.selectFormControl}>
                <InputLabel htmlFor="team_type" className={classes.selectLabel}>
                  Choose Team Type *
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={values.team_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.team_type && touched.team_type ? true : false}
                  id="team_type"
                  inputProps={{
                    name: 'team_type',
                    id: 'team_type',
                  }}>
                  <MenuItem
                    disabled={true}
                    classes={{
                      root: classes.selectMenuItem,
                    }}>
                    Choose Team Type *
                  </MenuItem>
                  {appState.appTypes.teamTypes.map(teamType => (
                    <MenuItem
                      key={teamType}
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={teamType}>
                      {teamType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {errors.team_type && touched.team_type ? (
                <label className={classes.errorLabel}>{errors.team_type}</label>
              ) : null}

              <CustomInput
                error={errors.textfield1 ? true : false}
                labelText="Team Text 1"
                id="textfield1"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.textfield1,
                  onChange: handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={errors.textfield2 ? true : false}
                labelText="Team Text 2"
                id="textfield2"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.textfield2,
                  onChange: handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={errors.textfield3 ? true : false}
                labelText="Team Text 3"
                id="textfield3"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.textfield3,
                  onChange: handleChange,
                  type: 'text',
                }}
              />
            </GridItem>
            <GridItem xs={12} xl={8}  className={classes.rightFormContainer}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={12} lg={6}>
                  <div className={classes.imageUploadContainer}>
                    <Paper elevation={2} style={{ padding: '24px', marginBottom: '24px' }}>
                      <FormControl className={`${classes.fileUploadFormControl} ${classes.imagesUpload}`}>
                        <FormLabel htmlFor="btnTeamLogoFilePicker" component="legend">
                          Team Logo
                        </FormLabel>

                        <div className={classes.imgBtnContainers}>
                          {formik.values.team_image_logo ? (
                            <Button variant="contained" component="label" onClick={handleRemoveTeamLogo}>
                              Remove Image
                            </Button>
                         ) : null} 

                          <Button id="btnTeamLogoFilePicker" variant="contained" component="label">
                            Choose Image
                            <input
                              type="file"
                              id="teamLogoInput"
                              onChange={handleTeamLogoChange}
                              className={classes.fileInput}
                              accept=".jpg, .png, .jpeg, .gif, .bmp"
                            />
                          </Button>
                        </div>
                      </FormControl>
                      <img
                        alt=""
                        className={classes.teamLogo}
                        ref={teamLogoImgRef}
                        src={toEditTeam ? `${configs.app.imageServer}/${toEditTeam.team_image_logo}` : null}
                      />
                    </Paper>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={6} md={12} lg={6}>
                  <div className={classes.imageUploadContainer}>
                    <Paper elevation={2} style={{ padding: '24px', marginBottom: '24px' }}>
                      <FormControl className={`${classes.fileUploadFormControl} ${classes.imagesUpload}`} >
                        <FormLabel htmlFor="btnTeamImageFilePicker" component="legend">
                          Team Image
                        </FormLabel>

                        <div className={classes.imgBtnContainers}>
                          {formik.values.team_image ? (
                            <Button variant="contained" component="label" onClick={handleRemoveTeamImage}>
                              Remove Image
                            </Button>
                          ) : null} 

                          <Button id="btnTeamImageFilePicker" variant="contained" component="label">
                            Choose Image
                            <input
                              type="file"
                              id="teamImageInput"
                              onChange={handleTeamLogoChange}
                              className={classes.fileInput}
                              accept=".jpg, .png, .jpeg, .gif, .bmp"
                            />
                          </Button>
                        </div>
                      </FormControl>
                      <img
                        alt=""
                        className={classes.teamLogo}
                        ref={teamImageImgRef}
                        src={toEditTeam ? `${configs.app.imageServer}/${toEditTeam.team_image}` : null}
                      />
                    </Paper>
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <div className={classes.btnContainer}>
            <CustomButton
              color="info"
              className={classes.btnSubmit}
              type="submit"
              disabled={formik.isSubmitting || uploading}>
              {toEditTeam ? 'Edit Team' : 'Create Team'}
            </CustomButton>

            <CustomButton
              color="danger"
              className={classes.btnSubmit}
              disabled={formik.isSubmitting || uploading}
              onClick={onEditCancel}>
              Cancel
            </CustomButton>
          </div>
        </form>
        <Backdrop className={classes.backdrop} open={uploading || formik.isSubmitting}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardBody>
    </Card>
  );
};
