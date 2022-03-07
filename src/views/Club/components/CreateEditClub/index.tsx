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
import { Club } from '@cenera/models';
import configs from '@cenera/configs';

import { styles } from './styles';
import { ClubService } from '@cenera/services/api/clubs';

const useStyles = makeStyles(styles as any);

type Props = {
  onClubCreateOrEdit: () => void;
  onEditCancel: () => void;
  toEditClub?: Club;
};

export const CreateEditClub: FC<Props> = ({ toEditClub, onClubCreateOrEdit, onEditCancel }) => {
  const classes = useStyles();
  const [appState] = useAppContext();

  const clubLogoImgRef = useRef<HTMLImageElement>(null);
  const clubImageImgRef = useRef<HTMLImageElement>(null);
  const [uploading, setUploading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues = {
    club_name: toEditClub ? toEditClub.club_name : '',
    club_sportstype: toEditClub ? toEditClub.club_sportstype : '',
    club_image_logo: toEditClub ? toEditClub.club_image_logo : '',
    club_image: toEditClub ? toEditClub.club_image : '',
    textfield1: toEditClub ? toEditClub.textfield1 : '',
    textfield2: toEditClub ? toEditClub.textfield2 : '',
    textfield3: toEditClub ? toEditClub.textfield3 : '',
    textfield4: toEditClub ? toEditClub.textfield4 : '',
    textfield5: toEditClub ? toEditClub.textfield5 : '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      club_name: Yup.string().required('Required'),
      club_sportstype: Yup.string().required('Required'),
    }),
    onSubmit: async values => {
      try {
        const club = toEditClub ? { ...toEditClub, ...values } : values;
        const res = await ClubService.createOrEditClub(club, appState.authentication.accessToken);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        onClubCreateOrEdit();
        formik.setValues(initialFormValues);
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      }
    },
  });

  const handleClubLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const base64Reader = new FileReader();
    const binaryReader = new FileReader();

    // Show the image on screen
     base64Reader.onloadend = (p: ProgressEvent<FileReader>) => {
      if (id === 'clubLogoInput' && clubLogoImgRef.current) {
        clubLogoImgRef.current.src = p.target.result as any;
      } else if (clubImageImgRef.current) {
        clubImageImgRef.current.src = p.target.result as any;
      }
    };

    // Upload the image to server
    binaryReader.onloadend = (p: ProgressEvent<FileReader>) => {
      setUploading(true);
      MiscService.uploadImage(p.target.result)
        .then(res => {
          setUploading(false);
          if (res.data) {
            if (id === 'clubLogoInput' && clubLogoImgRef.current) {
            
              formik.setFieldValue('club_image_logo', res.data.filename);
               clubLogoImgRef.current.src = `${configs.app.imageServer}/${res.data.filename}`;
              //enqueueSnackbar('Successfully uploaded club logo', { variant: 'success' });

            } else if (clubImageImgRef.current) {
              formik.setFieldValue('club_image', res.data.filename);
              clubImageImgRef.current.src = `${configs.app.imageServer}/${res.data.filename}`;
              
              //enqueueSnackbar('Successfully uploaded club image', { variant: 'success' });
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
      console.log("file", e.target.files[0].name)
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

  

  const handleRemoveClubLogo = () => {
    formik.setFieldValue('club_image_logo', '');
    if (clubLogoImgRef.current) clubLogoImgRef.current.src = '';
  };

  const handleRemoveClubImage = () => {
    formik.setFieldValue('club_image', '');
    if (clubImageImgRef.current) clubImageImgRef.current.src = '';
  };
  
 

  return (
    <Card>
      <CardHeader>
        <h4>{toEditClub ? `Edit Club ${toEditClub.club_name}` : 'Create New Club'}</h4>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} xl={4}>
              <CustomInput
                error={formik.errors.club_name ? true : false}
                labelText="Club Name *"
                id="club_name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.club_name,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />

              <FormControl fullWidth={true} className={classes.selectFormControl}>
                <InputLabel htmlFor="club_sportstype" className={classes.selectLabel}>
                  Choose Sports Type
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={formik.values.club_sportstype}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.club_sportstype ? true : false}
                  inputProps={{
                    name: 'club_sportstype',
                    id: 'club_sportstype',
                  }}>
                  <MenuItem
                    disabled={true}
                    classes={{
                      root: classes.selectMenuItem,
                    }}>
                    Choose Club Type
                  </MenuItem>
                  {appState.appTypes.clubSportsTypes.map(sportsType => (
                    <MenuItem
                      key={sportsType}
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={sportsType}>
                      {sportsType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CustomInput
                error={formik.errors.textfield1 ? true : false}
                labelText="Club Text 1"
                id="textfield1"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.textfield1,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={formik.errors.textfield2 ? true : false}
                labelText="Club Text 2"
                id="textfield2"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.textfield2,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={formik.errors.textfield3 ? true : false}
                labelText="Club Text 3"
                id="textfield3"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.textfield3,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={formik.errors.textfield4 ? true : false}
                labelText="Club Text 4"
                id="textfield4"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.textfield4,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />

              <CustomInput
                error={formik.errors.textfield5 ? true : false}
                labelText="Club Text 5"
                id="textfield5"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: formik.values.textfield5,
                  onChange: formik.handleChange,
                  type: 'text',
                }}
              />
            </GridItem>
            <GridItem xs={12} xl={8} className={classes.rightFormContainer}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={12} lg={6}>
                  <div className={classes.imageUploadContainer}>
                    <Paper elevation={2} style={{ padding: '24px', marginBottom: '24px' }}>
                      <FormControl className={classes.fileUploadFormControl}>
                        <FormLabel htmlFor="btnClubLogoFilePicker" component="legend">
                          Club Logo
                        </FormLabel>

                        <div className={classes.imgBtnContainers}>
                        
                          {formik.values.club_image_logo ? (
                            <Button variant="contained" component="label" onClick={handleRemoveClubLogo}>
                              Remove Image
                            </Button>
                          ) : null}

                          <Button id="btnClubLogoFilePicker" variant="contained" component="label">
                            Choose Image
                            <input
                              type="file"
                              id="clubLogoInput"
                              onChange={handleClubLogoChange}
                              className={classes.fileInput}
                              accept=".jpg, .png, .jpeg, .gif, .bmp"
                            />
                          </Button>
                        </div>
                      </FormControl>
                      {toEditClub && toEditClub.club_image_logo ? (
                      <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${configs.app.imageServer}/${toEditClub.club_image_logo}`}>
                          <img
                            alt=""
                            className={classes.clubLogo}
                            ref={clubLogoImgRef}
                            src={`${configs.app.imageServer}/${toEditClub.club_image_logo}`}
                          />
                      </a>
                      ) : (
                           <img alt="" className={classes.clubLogo} ref={clubLogoImgRef} src="" />
                      )}
                    </Paper>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={12} lg={6}>
                  <div className={classes.imageUploadContainer}>
                    <Paper elevation={2} style={{ padding: '24px', marginBottom: '24px' }}>
                      <FormControl className={`${classes.fileUploadFormControl} ${classes.imagesUpload}`}>
                        <FormLabel htmlFor="btnClubImageFilePicker" component="legend">
                          Club Image
                        </FormLabel>

                        <div className={classes.imgBtnContainers}>
                          {formik.values.club_image ? (
                            <Button variant="contained" component="label" onClick={handleRemoveClubImage}>
                              Remove Image
                            </Button>
                          ) : null}

                          <Button id="btnClubImageFilePicker" variant="contained" component="label">
                            Choose Image
                            <input
                              type="file"
                              id="clubImageInput"
                              onChange={handleClubLogoChange}
                              className={classes.fileInput}
                              accept=".jpg, .png, .jpeg, .gif, .bmp"
                            />
                          </Button>
                        </div>
                      </FormControl>
                      {toEditClub && toEditClub.club_image ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${configs.app.imageServer}/${toEditClub.club_image}`}>
                          <img
                            alt=""
                            className={classes.clubLogo}
                            ref={clubImageImgRef}
                            src={`${configs.app.imageServer}/${toEditClub.club_image}`}
                          />
                        </a>
                      ) : (
                        <img alt="" className={classes.clubLogo} ref={clubImageImgRef} />
                      )}
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
              {toEditClub ? 'Edit Club' : 'Create Club'}
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
