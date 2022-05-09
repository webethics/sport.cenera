import React, { FC, useEffect, useState, useRef, useContext } from "react";
import { useFormik } from "formik";
import { makeStyles, CircularProgress, Backdrop, FormLabel, FormControl } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useAppContext, appContext } from "@cenera/app-context";
import { GameService } from "@cenera/services/api/game";
import { MiscService } from "@cenera/services/api/misc";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { useFetchAwayTeamInfo } from "@cenera/common/hooks/api-hooks/away-team";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks"; // new
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { CustomInput } from "@cenera/components/CustomInput/CustomInput";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./styles";
import Teampicker from "@cenera/views/Games/TeamPicker/TeamPicker";

const useStyles = makeStyles(styles as any);

export const AwayTeam: FC = () => {
  const [showDropDown, setshowDropDown] = useState(false); // for showing drop down
  const [uploading, setUploading] = useState(false); // for image upload
  const teamLogoImgRef = useRef<HTMLImageElement>(null); // for image upload
  const teamImageImgRef = useRef<HTMLImageElement>(null);

  const classes = useStyles();
  const [appState] = useAppContext();
  const [teamsList, setTeamsList] = useState(null); //new
  const [teamId, setTeamId] = useState<any>(appState.teamId ? appState.teamId : ""); //new
  const [deleting, setDeleting] = useState(false);

  const { awayTeamInfo, loading, revalidate } = useFetchAwayTeamInfo(teamId);

  const { teams, loading: loadingTeam } = useFetchTeams(); // new

  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(appContext); //use SetTeamId

  const deleteAwayTeam = () => {
    setDeleting(true);

    GameService.deleteGameAwayTeam(appState.authentication.accessToken, teamId)
      .then(() => {
        showSuccessMessage();
        revalidate();
      })
      .catch((err) => {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      })
      .finally(() => {
        setDeleting(false);
      });
    showConfirmDialog();
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteAwayTeam,
    successMessage: "Game Info deleted successfully",
    confirmMessage: "Game Info will be deleted for good!",
  });

  const initialFormValues = {
    name: awayTeamInfo ? awayTeamInfo.awayTeam_name : "",
    description: awayTeamInfo ? awayTeamInfo.awayTeam_description : "",
    away_team_image_logo: awayTeamInfo ? awayTeamInfo.awayTeam_image : "",
    player1: awayTeamInfo ? awayTeamInfo.awayTeam_player1 : "",
    player2: awayTeamInfo ? awayTeamInfo.awayTeam_player2 : "",
    player3: awayTeamInfo ? awayTeamInfo.awayTeam_player3 : "",
    player4: awayTeamInfo ? awayTeamInfo.awayTeam_player4 : "",
    player5: awayTeamInfo ? awayTeamInfo.awayTeam_player5 : "",
    player6: awayTeamInfo ? awayTeamInfo.awayTeam_player6 : "",
    player7: awayTeamInfo ? awayTeamInfo.awayTeam_player7 : "",
    player8: awayTeamInfo ? awayTeamInfo.awayTeam_player8 : "",
    player9: awayTeamInfo ? awayTeamInfo.awayTeam_player9 : "",
    player10: awayTeamInfo ? awayTeamInfo.awayTeam_player10 : "",
    player11: awayTeamInfo ? awayTeamInfo.awayTeam_player11 : "",
    player12: awayTeamInfo ? awayTeamInfo.awayTeam_player12 : "",
    player13: awayTeamInfo ? awayTeamInfo.awayTeam_player13 : "",
    player14: awayTeamInfo ? awayTeamInfo.awayTeam_player14 : "",
    player15: awayTeamInfo ? awayTeamInfo.awayTeam_player15 : "",
    player16: awayTeamInfo ? awayTeamInfo.awayTeam_player16 : "",
    player17: awayTeamInfo ? awayTeamInfo.awayTeam_player17 : "",
    player18: awayTeamInfo ? awayTeamInfo.awayTeam_player18 : "",
    player19: awayTeamInfo ? awayTeamInfo.awayTeam_player19 : "",
    player20: awayTeamInfo ? awayTeamInfo.awayTeam_player20 : "",
    player21: awayTeamInfo ? awayTeamInfo.awayTeam_player21 : "",
    player22: awayTeamInfo ? awayTeamInfo.awayTeam_player22 : "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (formValues) => {
      try {
        const result = await GameService.updateGameAwayTeam({
          access_token: appState.authentication.accessToken,
          team_id: teamId,
          awayTeam_name: formValues.name,
          awayTeam_description: formValues.description,
          awayTeam_image: formValues.away_team_image_logo,
          awayTeam_player1: formValues.player1,
          awayTeam_player2: formValues.player2,
          awayTeam_player3: formValues.player3,
          awayTeam_player4: formValues.player4,
          awayTeam_player5: formValues.player5,
          awayTeam_player6: formValues.player6,
          awayTeam_player7: formValues.player7,
          awayTeam_player8: formValues.player8,
          awayTeam_player9: formValues.player9,
          awayTeam_player10: formValues.player10,
          awayTeam_player11: formValues.player11,
          awayTeam_player12: formValues.player12,
          awayTeam_player13: formValues.player13,
          awayTeam_player14: formValues.player14,
          awayTeam_player15: formValues.player15,
          awayTeam_player16: formValues.player16,
          awayTeam_player17: formValues.player17,
          awayTeam_player18: formValues.player18,
          awayTeam_player19: formValues.player19,
          awayTeam_player20: formValues.player20,
          awayTeam_player21: formValues.player21,
          awayTeam_player22: formValues.player22,
        });

        enqueueSnackbar(result.data.message, { variant: "success" });
        revalidate();
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    },
  });

  // Update formplayers when we previous fresh data from server
  useEffect(() => {
    if (!loading && awayTeamInfo) {
      formik.setValues({
        name: awayTeamInfo.awayTeam_name,
        description: awayTeamInfo.awayTeam_description,
        away_team_image_logo: awayTeamInfo && awayTeamInfo.awayTeam_image !== "" ? `${awayTeamInfo.awayTeam_image}` : "",
        player1: awayTeamInfo.awayTeam_player1,
        player2: awayTeamInfo.awayTeam_player2,
        player3: awayTeamInfo.awayTeam_player3,
        player4: awayTeamInfo.awayTeam_player4,
        player5: awayTeamInfo.awayTeam_player5,
        player6: awayTeamInfo.awayTeam_player6,
        player7: awayTeamInfo.awayTeam_player7,
        player8: awayTeamInfo.awayTeam_player8,
        player9: awayTeamInfo.awayTeam_player9,
        player10: awayTeamInfo.awayTeam_player10,
        player11: awayTeamInfo.awayTeam_player11,
        player12: awayTeamInfo.awayTeam_player12,
        player13: awayTeamInfo.awayTeam_player13,
        player14: awayTeamInfo.awayTeam_player14,
        player15: awayTeamInfo.awayTeam_player15,
        player16: awayTeamInfo.awayTeam_player16,
        player17: awayTeamInfo.awayTeam_player17,
        player18: awayTeamInfo.awayTeam_player18,
        player19: awayTeamInfo.awayTeam_player19,
        player20: awayTeamInfo.awayTeam_player20,
        player21: awayTeamInfo.awayTeam_player21,
        player22: awayTeamInfo.awayTeam_player22,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, awayTeamInfo, teamId]);

  useEffect(() => {
    if (!loadingTeam && teams) {
      setTeamsList(teams);
      if (teamsList) {
        if (appState.teamId != null) setTeamId(appState.teamId);
        else setTeamId(teamsList[0].team_id); //setting team id for showing default game info of first team
        let a = teams.find((res) => res.team_id === teamId);
        dispatch({ type: "TEAM_NAME", payload: a && a.team_name });
      }
    }
  }, [loadingTeam, teams, teamsList, teamId]);

  useEffect(() => {
    if (appState.user.user_type === "clubAdmin" && teamsList !== null) {
      setshowDropDown(true);
    } else {
      setshowDropDown(false);
      setTeamId(null);
    }
  }, [teamsList]);

  function handleTeamChange(e: any): void {
    //new
    setTeamId(e.target.value);
    dispatch({ type: "APP_LINEUP_TEAMID", payload: e.target.value }); //setteamid
  }

  const handleRemoveTeamLogo = () => {
    formik.setFieldValue("away_team_image_logo", "");
    if (teamLogoImgRef.current) teamLogoImgRef.current.src = "";
  };

  const handleTeamLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const base64Reader = new FileReader();
    const binaryReader = new FileReader();

    // Show the image on screen
    base64Reader.onloadend = (p: ProgressEvent<FileReader>) => {
      if (id === "teamLogoInput" && teamLogoImgRef.current) {
        teamLogoImgRef.current.src = p.target.result as any;
      } else if (teamImageImgRef.current) {
        teamImageImgRef.current.src = p.target.result as any;
      }

      formik.setFieldValue("away_team_image_logo", p.target.result); //For remove button show
    };

    // Upload the image to server
    binaryReader.onloadend = (p: ProgressEvent<FileReader>) => {
      setUploading(true);
      MiscService.uploadImage(p.target.result)
        .then((res) => {
          setUploading(false);
          if (res.data) {
            if (id === "teamLogoInput" && teamLogoImgRef.current) {
              formik.setFieldValue("away_team_image_logo", res.data.filename);
              //enqueueSnackbar('Successfully uploaded team logo', { variant: 'success' });
            } else if (teamImageImgRef.current) {
              formik.setFieldValue("team_image", res.data.filename);
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
          variant: "error",
        });
      } else {
        base64Reader.readAsDataURL(file);
        binaryReader.readAsArrayBuffer(file);
      }
    }
  };

  const { values, touched, errors, handleChange, handleBlur } = formik;
  return (
    <div>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={10} className={classes.container}>
          {showDropDown ? teamsList && <Teampicker teamList={teamsList} onChange={handleTeamChange} value={teamId} id={"test"} /> : ""}
          <Card>
            <CardHeader>
              <h4>Away Team</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <GridContainer>
                  <GridItem xs={4} md={4}>
                    <CustomInput
                      error={touched.name && errors.name ? true : false}
                      labelText="Name"
                      id="name" // id shoud be same as value
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.name,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} md={4}>
                    <CustomInput
                      error={touched.description && errors.description ? true : false}
                      labelText="Discription"
                      id="description"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.description,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} md={4}>
                    <FormControl className={classes.fileUploadFormControl}>
                      <FormLabel htmlFor="btnTeamLogoFilePicker" component="legend">
                        Team Logo
                      </FormLabel>

                      <div className={classes.imgBtnContainers}>
                        {formik.values.away_team_image_logo ? (
                          <Button variant="contained" component="label" onClick={handleRemoveTeamLogo}>
                            Remove Image
                          </Button>
                        ) : null}

                        <Button id="btnTeamLogoFilePicker" variant="contained" component="label" disabled={formik.isSubmitting || uploading}>
                          Choose Image
                          {/*disable button conditionalyy image uploading*/}
                          <input type="file" id="teamLogoInput" onChange={handleTeamLogoChange} className={classes.fileInput} accept=".jpg, .png, .jpeg, .gif, .bmp" />
                        </Button>
                      </div>
                    </FormControl>
                    <img alt="" className={classes.teamLogo} ref={teamLogoImgRef} src={values.away_team_image_logo ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${values.away_team_image_logo}` : ""} />
                  </GridItem>

                  <GridItem xs={4} md={4}>
                    <CustomInput
                      error={touched.player1 && errors.player1 ? true : false}
                      labelText="Player1"
                      id="player1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player1,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                    <CustomInput
                      error={touched.player2 && errors.player2 ? true : false}
                      labelText="Player2"
                      id="player2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player2,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                    <CustomInput
                      error={touched.player3 && errors.player3 ? true : false}
                      labelText="Player3"
                      id="player3"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player3,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player4 && errors.player4 ? true : false}
                      labelText="Player4"
                      id="player4"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player4,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player5 && errors.player5 ? true : false}
                      labelText="Player5"
                      id="player5"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player5,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player6 && errors.player6 ? true : false}
                      labelText="Player6"
                      id="player6"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player6,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player7 && errors.player7 ? true : false}
                      labelText="Player7"
                      id="player7"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player7, // message 1 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player8 && errors.player8 ? true : false}
                      labelText="Player8"
                      id="player8"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player8, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} md={4}>
                    <CustomInput
                      error={touched.player9 && errors.player9 ? true : false}
                      labelText="Player9"
                      id="player9"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player9, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                    <CustomInput
                      error={touched.player10 && errors.player10 ? true : false}
                      labelText="Player10"
                      id="player10"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player10, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player11 && errors.player11 ? true : false}
                      labelText="Player11"
                      id="player11"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player11, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    {/* row 1 end here */}

                    <CustomInput
                      error={touched.player12 && errors.player12 ? true : false}
                      labelText="Player12"
                      id="player12"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player12, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player13 && errors.player13 ? true : false}
                      labelText="Player13"
                      id="player13"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player13, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player14 && errors.player14 ? true : false}
                      labelText="Player14"
                      id="player14"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player14, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                    <CustomInput
                      error={touched.player15 && errors.player15 ? true : false}
                      labelText="Player15"
                      id="player15"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player15, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player16 && errors.player16 ? true : false}
                      labelText="Player16"
                      id="player16"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player16, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} md={4}>
                    <CustomInput
                      error={touched.player17 && errors.player17 ? true : false}
                      labelText="Player17"
                      id="player17"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player17, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player18 && errors.player18 ? true : false}
                      labelText="Player18"
                      id="player18"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player18, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player19 && errors.player19 ? true : false}
                      labelText="Player19"
                      id="player19"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player19, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player20 && errors.player20 ? true : false}
                      labelText="Player20"
                      id="player20"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player20, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player21 && errors.player21 ? true : false}
                      labelText="Player21"
                      id="player21"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player21, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />

                    <CustomInput
                      error={touched.player22 && errors.player22 ? true : false}
                      labelText="Player22"
                      id="player22"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.player22, // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: "text",
                      }}
                    />
                  </GridItem>

                  {/* row 2 end here */}
                </GridContainer>

                <div className={classes.btnContainer}>
                  <Button color="info" className={classes.btnSubmit} type="submit" disabled={formik.isSubmitting || !formik.isValid} disableRipple={formik.isSubmitting || !formik.isValid} disableFocusRipple={formik.isSubmitting || !formik.isValid}>
                    Edit Information
                  </Button>

                  <Button color="warning" onClick={showConfirmDialog} className={classes.btnDelete} disabled={deleting} disableRipple={deleting} disableFocusRipple={deleting}>
                    Delete Game Info
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
      <Backdrop className={classes.backdrop} open={formik.isSubmitting || loading || deleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
