import React, { useRef, useState, FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { subYears, format } from "date-fns";
import {
  makeStyles,
  FormControl,
  Button,
  FormLabel,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { DatePicker } from "@material-ui/pickers";
import { useAppContext } from "@cenera/app-context";
import { MiscService } from "@cenera/services/api/misc";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CustomInput } from "@cenera/components/CustomInput/CustomInput";
import { Button as CustomButton } from "@cenera/components/Button/Button";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { Player } from "@cenera/models";
import configs from "@cenera/configs";
import { useFetchTeam } from "@cenera/common/hooks/api-hooks";
import { PlayerService } from "@cenera/services/api/players";

import { styles } from "./styles";

const useStyles = makeStyles(styles as any);

const convertNumber = (input: any) => {
  return parseInt(input.replace(/\D+/, ""), 10);
};

type Props = {
  onPlayerCreateOrEdit: () => void;
  onCancel: () => void;
  toEditPlayer?: Player;
  selectedClubTeam?: {
    clubId: number;
    teamId: number;
  };
};

const maxBirthday = subYears(new Date(), 3);
const minBirthday = subYears(new Date(), 90);

const vSchema = {
  club_id: Yup.number().moreThan(0, "* Please select a club"),
  team_id: Yup.number().moreThan(0, "* Please select a team"),
  firstname: Yup.string().required("* Required"),
  lastname: Yup.string().required("* Required"),
  // shirtnumber: Yup.number().moreThan(0, '* Required'),
  // weight: Yup.number()
  //   .required('* Required')
  //   .moreThan(0, '* Required'),
  // height: Yup.number()
  //   .required('* Required')
  //   .moreThan(0, '* Required')
  //   .lessThan(250, '* Height is not valid'),
  birthday: Yup.date()
    //.required('Required')
    .min(
      minBirthday,
      `Birthday can not be before ${format(minBirthday, "yyyy-MM-dd")}`
    )
    .max(
      maxBirthday,
      `Birthday can not be after ${format(maxBirthday, "yyyy-MM-dd")}`
    ),
};

export const CreateEditPlayer: FC<Props> = ({
  toEditPlayer,
  onPlayerCreateOrEdit,
  selectedClubTeam,
  onCancel,
}) => {
  const classes = useStyles();
  const [appState] = useAppContext();

  const playerPhotoRef = useRef<HTMLImageElement>(null);
  const [uploading, setUploading] = useState(false);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape(vSchema)
  );
  const [showSimplifiedForm, setShowSimplifiedForm] = useState(false);

  const { team, loading: teamLoading } = useFetchTeam(
    selectedClubTeam ? selectedClubTeam.teamId : null
  );


  const { enqueueSnackbar } = useSnackbar();

  const formInitialValues = {
    club_id: toEditPlayer ? toEditPlayer.club_id : selectedClubTeam.clubId,
    team_id: toEditPlayer ? toEditPlayer.team_id : selectedClubTeam.teamId,
    shirtnumber: toEditPlayer ? convertNumber(toEditPlayer.shirtnumber) : 0,
    firstname: toEditPlayer ? toEditPlayer.firstname : "",
    lastname: toEditPlayer ? toEditPlayer.lastname : "",
    weight: toEditPlayer ? convertNumber(toEditPlayer.weight) : 0,
    height: toEditPlayer ? convertNumber(toEditPlayer.height) : 0,
    player_nationality: toEditPlayer ? toEditPlayer.player_nationality : "",
    player_previousclub: toEditPlayer ? toEditPlayer.player_previousclub : "",
    birthday: toEditPlayer
      ? new Date(toEditPlayer.birthday)
      : new Date("2014-08-18"),
    position: toEditPlayer ? toEditPlayer.position : "",
    motherclub: toEditPlayer ? toEditPlayer.motherclub : "",
    textfield1: toEditPlayer ? toEditPlayer.textfield1 : "",
    textfield2: toEditPlayer ? toEditPlayer.textfield2 : "",
    textfield3: toEditPlayer ? toEditPlayer.textfield3 : "",
    textfield1_stat: toEditPlayer ? toEditPlayer.textfield1_stat : "",
    textfield2_stat: toEditPlayer ? toEditPlayer.textfield2_stat : "",
    textfield3_stat: toEditPlayer ? toEditPlayer.textfield3_stat : "",
    textfield4_stat: toEditPlayer ? toEditPlayer.textfield4_stat : "",
    textfield1_fun: toEditPlayer ? toEditPlayer.textfield1_fun : "",
    textfield2_fun: toEditPlayer ? toEditPlayer.textfield2_fun : "",
    textfield3_fun: toEditPlayer ? toEditPlayer.textfield3_fun : "",
    textfield4_fun: toEditPlayer ? toEditPlayer.textfield4_fun : "",
    player_image: toEditPlayer ? toEditPlayer.player_image : "",
  };

  const formik = useFormik({
    validationSchema,
    initialValues: formInitialValues,
    onSubmit: async (formValues) => {
      try {
        const player = toEditPlayer
          ? { ...toEditPlayer, ...formValues }
          : formValues;
        const res = await PlayerService.createOrEditPlayer(
          player,
          appState.authentication.accessToken
        );
        enqueueSnackbar(res.data.message, { variant: "success" });
        onPlayerCreateOrEdit();
        
       
        if(!toEditPlayer){
          formik.setValues( { ...formValues, firstname: "", lastname: "", shirtnumber: 0 }, false);
        }


      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur: formikHandleBlur,
  } = formik;

  const handleBlur = (a: any) => {
    if (a.nativeEvent) {
      formikHandleBlur(a.nativeEvent);
    } else {
      formikHandleBlur(a);
    }
  };

  const handlePlayerLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64Reader = new FileReader();
    const binaryReader = new FileReader();

    // Show the image on screen
    base64Reader.onloadend = (p: ProgressEvent<FileReader>) => {
      if (playerPhotoRef.current) {
        playerPhotoRef.current.src = p.target.result as any;
      }
    };

    // Upload the image to server
    binaryReader.onloadend = (p: ProgressEvent<FileReader>) => {
      setUploading(true);
      MiscService.uploadImage(p.target.result)
        .then((res) => {
          setUploading(false);

          if (res.data) {
            if (playerPhotoRef.current) {
              formik.setFieldValue("player_image", res.data.filename);
              playerPhotoRef.current.src = `${configs.app.imageServer}/${res.data.filename}`;
              //enqueueSnackbar('Successfully uploaded player image', { variant: 'success' });
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
        enqueueSnackbar(
          `Maximum image size is 1MB.  Yours was ${(
            file.size /
            (1024 * 1024)
          ).toFixed(1)}MBs`,
          {
            variant: "error",
          }
        );
      } else {
        base64Reader.readAsDataURL(file);
        binaryReader.readAsArrayBuffer(file);
      }
    }
  };

  useEffect(() => {
    if (!teamLoading && team) {
    

      if (team.team_type === "amateur") {
        setShowSimplifiedForm(true);

        const newSchema = { ...vSchema };
        //delete newSchema.weight;
        //delete newSchema.height;
        //delete newSchema.shirtnumber;
        setValidationSchema(Yup.object().shape(newSchema));
      } else if (team.team_type === "professional") {

        setShowSimplifiedForm(false);
        const newSchema = { ...vSchema };
        setValidationSchema(Yup.object().shape(newSchema));
      } else {
        setShowSimplifiedForm(false);
        setValidationSchema(Yup.object().shape(vSchema));
      }
    }
  }, [team, teamLoading]);

  const handleRemovePlayerImage = () => {
    formik.setFieldValue("player_image", "");
    if (playerPhotoRef.current) playerPhotoRef.current.src = "";
  };

  return (
    <Card>
      <CardHeader>
        <h4>
          {toEditPlayer ? (
            <>
              <span>Edit Player </span>
              <strong>
                {toEditPlayer.firstname} {toEditPlayer.lastname}
              </strong>
            </>
          ) : (
            <>
              <span>Create New Player on Team </span>
              <strong>{team ? team.team_name : "..."}</strong>
            </>
          )}
        </h4>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={4} md={4}>
              <CustomInput
                error={errors.firstname && touched.firstname ? true : false}
                labelText="Player First Name *"
                id="firstname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.firstname,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: "text",
                }}
              />

              {errors.firstname && touched.firstname ? (
                <label className={classes.errorLabel}>{errors.firstname}</label>
              ) : null}

              <CustomInput
                error={errors.lastname && touched.lastname ? true : false}
                labelText="Player Last Name *"
                id="lastname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.lastname,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: "text",
                }}
              />

              {errors.lastname && touched.lastname ? (
                <label className={classes.errorLabel}>{errors.lastname}</label>
              ) : null}

              <CustomInput
                error={errors.shirtnumber && touched.shirtnumber ? true : false}
                labelText={
                  !teamLoading && team.team_type === "amateur"
                    ? "Player Shirt Number"
                    : "Player Shirt Number"
                }
                id="shirtnumber"
                
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.shirtnumber,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: "number",
                  inputProps: {
                    min: 0,
                  },
                }}
              />

              {errors.shirtnumber && touched.shirtnumber ? (
                <label className={classes.errorLabel}>
                  {errors.shirtnumber}
                </label>
              ) : null}
              {!showSimplifiedForm ? (
                <>
                  <CustomInput
                    error={errors.weight && touched.weight ? true : false}
                    labelText="Weight (kg)"
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.weight,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "number",
                      inputProps: {
                        min: 0,
                      },
                    }}
                  />

                  {errors.weight && touched.weight ? (
                    <label className={classes.errorLabel}>
                      {errors.weight}
                    </label>
                  ) : null}

                  <CustomInput
                    error={errors.height && touched.height ? true : false}
                    labelText="Height (cm)"
                    id="height"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.height,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "number",
                      inputProps: {
                        min: 0,
                      },
                    }}
                  />

                  {errors.height && touched.height ? (
                    <label className={classes.errorLabel}>
                      {errors.height}
                    </label>
                  ) : null}

                  <CustomInput
                    error={errors.weight && touched.weight ? true : false}
                    labelText="Nationality"
                    id="player_nationality"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.player_nationality,
                      onChange: handleChange,
                      onBlur: handleBlur,
                    }}
                  />

                  <CustomInput
                    error={errors.weight && touched.weight ? true : false}
                    labelText="Previous Club"
                    id="player_previousclub"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.player_previousclub,
                      onChange: handleChange,
                      onBlur: handleBlur,
                    }}
                  />
                </>
              ) : (
                <>
                  <DatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Birthday"
                    value={values.birthday}
                    maxDate={maxBirthday}
                    minDate={minBirthday}
                    onChange={(date) =>
                      formik.setFieldValue("birthday", date, false)
                    }
                  />
                  {errors.birthday && touched.birthday ? (
                    <label className={classes.errorLabel}>
                      {errors.birthday}
                    </label>
                  ) : null}
                </>
              )}
            </GridItem>

            {!showSimplifiedForm ? (
              <>
                <GridItem xs={4} md={4}>
                  <CustomInput
                    error={
                      errors.motherclub && touched.motherclub ? true : false
                    }
                    labelText="Mother Club"
                    id="motherclub"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.motherclub,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <DatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Birthday"
                    value={values.birthday}
                    maxDate={maxBirthday}
                    minDate={minBirthday}
                    onChange={(date) =>
                      formik.setFieldValue("birthday", date, false)
                    }
                  />

                  {errors.birthday && touched.birthday ? (
                    <label className={classes.errorLabel}>
                      {errors.birthday}
                    </label>
                  ) : null}

                  <CustomInput
                    error={errors.position && touched.position ? true : false}
                    labelText="Position"
                    id="position"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.position,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield1 && touched.textfield1 ? true : false
                    }
                    labelText="Text Field 1"
                    id="textfield1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield1,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield2 && touched.textfield2 ? true : false
                    }
                    labelText="Text Field 2"
                    id="textfield2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield2,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />
                </GridItem>
                <GridItem xs={4} md={4}>
                  <CustomInput
                    error={
                      errors.textfield3 && touched.textfield3 ? true : false
                    }
                    labelText="Text Field 3"
                    id="textfield3"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield3,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield1_stat && touched.textfield1_stat
                        ? true
                        : false
                    }
                    labelText="Stat Field 1"
                    id="textfield1_stat"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield1_stat,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield2_stat && touched.textfield2_stat
                        ? true
                        : false
                    }
                    labelText="Stat Field 2"
                    id="textfield2_stat"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield2_stat,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield3_stat && touched.textfield3_stat
                        ? true
                        : false
                    }
                    labelText="Stat Field 3"
                    id="textfield3_stat"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield3_stat,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />

                  <CustomInput
                    error={
                      errors.textfield4_stat && touched.textfield4_stat
                        ? true
                        : false
                    }
                    labelText="Stat Field 4"
                    id="textfield4_stat"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: values.textfield4_stat,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      type: "text",
                    }}
                  />
                </GridItem>
              </>
            ) : null}
          </GridContainer>
          <GridContainer>
            <GridItem
              xs={6}
              md={6}
              xl={6}
              className={classes.playerImageContainer}
            >
              <div className={classes.imageUploadContainer}>
                <FormControl className={classes.fileUploadFormControl}>
                  <FormLabel
                    htmlFor="btnPlayerLogoFilePicker"
                    component="legend"
                  >
                    Player Photo
                  </FormLabel>

                  <div className={classes.imgBtnContainers}>
                    {formik.values.player_image ? (
                      <Button
                        variant="contained"
                        component="label"
                        onClick={handleRemovePlayerImage}
                      >
                        Remove Image
                      </Button>
                    ) : null}

                    <Button
                      id="btnPlayerLogoFilePicker"
                      variant="contained"
                      component="label"
                    >
                      Choose Image
                      <input
                        type="file"
                        onChange={handlePlayerLogoChange}
                        className={classes.fileInput}
                        accept=".jpg, .png, .jpeg, .gif, .bmp"
                      />
                    </Button>
                  </div>
                </FormControl>
                <img
                  alt=""
                  className={classes.playerImage}
                  ref={playerPhotoRef}
                  src={
                    toEditPlayer
                      ? `${configs.app.imageServer}/${toEditPlayer.player_image}`
                      : null
                  }
                />
              </div>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={6} md={6} xl={6} className={classes.btnContainer}>
              <CustomButton
                color="info"
                className={classes.btnSubmit}
                type="submit"
                disabled={formik.isSubmitting || uploading || !formik.isValid}
                disableRipple={
                  formik.isSubmitting || uploading || !formik.isValid
                }
                disableFocusRipple={
                  formik.isSubmitting || uploading || !formik.isValid
                }
              >
                {toEditPlayer ? "Edit Player " : "Create Player"}
              </CustomButton>

              <CustomButton
                color="danger"
                className={classes.btnSubmit}
                onClick={onCancel}
              >
                Cancel
              </CustomButton>
            </GridItem>
          </GridContainer>
        </form>
        <Backdrop
          className={classes.backdrop}
          open={
            uploading ||
            formik.isSubmitting ||
            (teamLoading && selectedClubTeam !== null)
          }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardBody>
    </Card>
  );
};
