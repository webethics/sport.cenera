import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
// import { useSnackbar } from "notistack";
// import { useAppContext, appContext } from "@cenera/app-context";
// import { getErrorMessage } from "@cenera/common/utils/error-helper";
// import { useFetchTeams } from "@cenera/common/hooks/api-hooks"; // new
// import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./styles";
import ItemPicker from "./Components/ItemPicker";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import UpcomingActivities from "./Components/UpcomingActivities";
// import Filters from "./Components/UpcomingActivities/filters";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// import Teampicker from '@cenera/views/Games/TeamPicker/TeamPicker';

const useStyles = makeStyles(styles as any);

export const Booking: FC = () => {
  const classes = useStyles();

  // const [appState] = useAppContext();
  // const [teamsList, setTeamsList] = useState(null); //new
  // const [teamId, setTeamId] = useState<any>(
  //   appState.teamId ? appState.teamId : ""
  // ); //new
  // const [deleting, setDeleting] = useState(false);

  const [selectedDate, SetselectedDate] = useState(new Date());

  // const { teams, loading: loadingTeam } = useFetchTeams(); // new

  // const { enqueueSnackbar } = useSnackbar();
  // const { dispatch } = useContext(appContext); //use SetTeamId

  // const deleteAwayTeam = () => {
  //   setDeleting(true);

  //   GameService.deleteGameAwayTeam(appState.authentication.accessToken, teamId)
  //     .then(() => {
  //       showSuccessMessage();
  //       revalidate();
  //     })
  //     .catch((err) => {
  //       enqueueSnackbar(getErrorMessage(err), { variant: "error" });
  //     })
  //     .finally(() => {
  //       setDeleting(false);
  //     });
  //   showConfirmDialog();
  // };

  // const { alert, showConfirmDialog } = useShowConfirmDialog({
  //   onDeleteConfirmed: deleteAwayTeam,
  //   successMessage: "Game Info deleted successfully",
  //   confirmMessage: "Game Info will be deleted for good!",
  // });

  const initialFormValues = {
    team: "",
    orTeam: "",
    start_date: selectedDate,
    start_time: selectedDate,
    end_date: selectedDate,
    end_time: selectedDate,
    location: "",
    warderobe: "",
    extra_wardrobe_time_before_15: false,
    extra_wardrobe_time_before_30: false,
    extra_wardrobe_time_after_15: false,
    extra_wardrobe_time_after_30: false,
    activity: "",
    description: "",
    away_team: "",
    away_team_wardrobe: "",
    referee_wardrobe: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (formValues) => {
      await fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
      console.log("form value after submit", formValues);
    },
  });

  const handleDateChange = (pickerType: string, value: any) => {
    SetselectedDate(value);
    const formikField = { ...formik.values };
    if (pickerType === "start_date") {
      formikField["start_date"] = value;
    } else if (pickerType === "start_time") {
      formikField["start_time"] = value;
    } else if (pickerType === "end_date") {
      formikField["end_date"] = value;
    } else if (pickerType === "end_time") {
      formikField["end_time"] = value;
    }
    formik.setValues(formikField);
  };

  useEffect(() => {
    if (formik.values.activity === "Match") {
      formik.setValues({
        ...formik.values,
        extra_wardrobe_time_before_30: true,
        extra_wardrobe_time_after_30: true,
      });
    } else {
      formik.setValues({
        ...formik.values,
        extra_wardrobe_time_before_30: false,
        extra_wardrobe_time_after_30: false,
      });
    }
  }, [formik.values.activity]);

  console.log(formik, "-----");

  // Update formplayers when we previous fresh data from server
  // useEffect(() => {
  //   if (!loading && awayTeamInfo) {
  //     formik.setValues({
  //       name: awayTeamInfo.awayTeam_name,
  //       description: awayTeamInfo.awayTeam_description,
  //       player1: awayTeamInfo.awayTeam_player1,
  //       player2: awayTeamInfo.awayTeam_player2,
  //       player3: awayTeamInfo.awayTeam_player3,
  //       player4: awayTeamInfo.awayTeam_player4,
  //       player5: awayTeamInfo.awayTeam_player5,
  //       player6: awayTeamInfo.awayTeam_player6,
  //       player7: awayTeamInfo.awayTeam_player7,
  //       player8: awayTeamInfo.awayTeam_player8,
  //       player9: awayTeamInfo.awayTeam_player9,
  //       player10: awayTeamInfo.awayTeam_player10,
  //       player11: awayTeamInfo.awayTeam_player11,
  //       player12: awayTeamInfo.awayTeam_player12,
  //       player13: awayTeamInfo.awayTeam_player13,
  //       player14: awayTeamInfo.awayTeam_player14,
  //       player15: awayTeamInfo.awayTeam_player15,
  //       player16: awayTeamInfo.awayTeam_player16,
  //       player17: awayTeamInfo.awayTeam_player17,
  //       player18: awayTeamInfo.awayTeam_player18,
  //       player19: awayTeamInfo.awayTeam_player19,
  //       player20: awayTeamInfo.awayTeam_player20,
  //       player21: awayTeamInfo.awayTeam_player21,
  //       player22: awayTeamInfo.awayTeam_player22,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading, awayTeamInfo, teamId]);

  // useEffect(() => {
  //   if (!loadingTeam && teams) {
  //     setTeamsList(teams);
  //     if (teamsList) {
  //       if (appState.teamId != null) setTeamId(appState.teamId);
  //       else setTeamId(teamsList[0].team_id); //setting team id for showing default game info of first team
  //       let a = teams.find((res) => res.team_id === teamId);
  //       dispatch({ type: "TEAM_NAME", payload: a && a.team_name });
  //     }
  //   }
  // }, [loadingTeam, teams, teamsList, teamId]);

  const { values, handleChange } = formik;

  const teamsdata = [{ name: "teamA" }, { name: "teamB" }];
  const locationdata = [{ name: "New york" }, { name: "Torronto" }];
  const wardrobe = [{ name: "wardrobe 1" }, { name: "wardrobe 2" }];
  const activitydata = [
    { name: "Match" },
    { name: "Training" },
    { name: "Maintenance" },
  ];

  return (
    <div>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
          {/* {showDropDown? (teamsList && <Teampicker teamList={teamsList} onChange={handleTeamChange} value={teamId} id={'test'} /> ): ""} */}
          <Card>
            <CardHeader>
              <h4>Book Activity</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <GridContainer>
                  <GridItem xs="12" sm="2" sx={{ mb: 3 }}>
                    <h5 style={{ fontSize: "14px" }}>Team</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={teamsdata}
                      onChange={handleChange}
                      value={values.team}
                      disabled={values.orTeam && true}
                      id="team"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5
                      style={{
                        fontSize: "14px",
                        display: "inline-block",
                        marginRight: "10px",
                        marginTop: "0",
                        lineHeight: "50px",
                      }}
                    >
                      or
                    </h5>
                    <TextField
                      style={{ width: "80%" }}
                      className="desc_box "
                      id="orTeam"
                      variant="outlined"
                      value={values.orTeam}
                      disabled={values.team && true}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" sx={{ mb: 3 }}>
                    <h5 style={{ fontSize: "14px" }}>Start *</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <DatePicker
                      className="datepicker"
                      label="Date"
                      disablePast
                      value={values.start_date}
                      format="dd/MM/yyyy"
                      onChange={(e) => handleDateChange("start_date", e)}
                      animateYearScrolling
                      id="start_date"
                    />
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <TimePicker
                      className="datepicker"
                      autoOk
                      label="Time"
                      value={values.start_time}
                      onChange={(e) => handleDateChange("start_time", e)}
                      id="start_time"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>End *</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <DatePicker
                      className="datepicker"
                      label="Date"
                      disablePast
                      value={values.end_date}
                      format="dd/MM/yyyy"
                      onChange={(e) => handleDateChange("end_date", e)}
                      animateYearScrolling
                      id="end_date"
                    />
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <TimePicker
                      className="datepicker"
                      autoOk
                      label="Time"
                      value={values.end_time}
                      onChange={(e) => handleDateChange("end_time", e)}
                      id="end_time"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Location</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={locationdata}
                      value={values.location}
                      onChange={handleChange}
                      id="location"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="7"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Warderobe</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={wardrobe}
                      value={values.warderobe}
                      onChange={handleChange}
                      id="warderobe"
                    />
                  </GridItem>

                  <GridItem
                    xs="12"
                    md="7"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  {/* extra wadrobe time */}
                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Extra Warderobe Time</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Before</h5>

                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extra_wardrobe_time_before_15"
                          checked={values.extra_wardrobe_time_before_15}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                          disabled={
                            values.extra_wardrobe_time_before_30 && true
                          }
                        />
                      }
                      label="15 Min"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extra_wardrobe_time_before_30"
                          checked={values.extra_wardrobe_time_before_30}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                          disabled={
                            values.extra_wardrobe_time_before_15 && true
                          }
                        />
                      }
                      label="30 Min"
                    />
                  </GridItem>

                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>After</h5>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extra_wardrobe_time_after_15"
                          checked={values.extra_wardrobe_time_after_15}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                          disabled={values.extra_wardrobe_time_after_30 && true}
                        />
                      }
                      label="15 Min"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extra_wardrobe_time_after_30"
                          checked={values.extra_wardrobe_time_after_30}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                          disabled={values.extra_wardrobe_time_after_15 && true}
                        />
                      }
                      label="30 Min"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Activity</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={activitydata}
                      value={values.activity}
                      onChange={handleChange}
                      id="activity"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="7"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Description</h5>
                  </GridItem>
                  <GridItem xs="12" sm="10" style={{ marginBottom: "15px" }}>
                    <TextField
                      className="desc_box"
                      id="description"
                      variant="outlined"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </GridItem>

                  {values.activity == "Match" && (
                    <>
                      {/* for away team */}
                      <Divider
                        style={{
                          width: "100%",
                          marginBottom: "15px",
                          marginTop: "15px",
                        }}
                      />
                      <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                        <h5 style={{ fontSize: "14px" }}>Away Team</h5>
                      </GridItem>
                      <GridItem xs="12" sm="3" style={{ marginBottom: "15px" }}>
                        <TextField
                          className="desc_box2"
                          id="away_team"
                          variant="outlined"
                          value={values.away_team}
                          onChange={handleChange}
                        />
                      </GridItem>

                      <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                        <h5 style={{ fontSize: "14px" }}>Warderobe</h5>
                      </GridItem>
                      <GridItem xs="12" sm="3" style={{ marginBottom: "15px" }}>
                        <ItemPicker
                          className="datepicker"
                          data={wardrobe}
                          value={values.away_team_wardrobe}
                          onChange={handleChange}
                          id="away_team_wardrobe"
                        />
                      </GridItem>
                      <Divider
                        style={{ width: "100%", marginBottom: "15px" }}
                      />

                      {/* for referee */}
                      <GridItem
                        xs="12"
                        sm="2"
                        style={{ marginBottom: "15px" }}
                      ></GridItem>
                      <GridItem xs="12" sm="3" style={{ marginBottom: "15px" }}>
                        <h5 style={{ fontSize: "14px" }}>Referee</h5>
                      </GridItem>

                      <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                        <h5 style={{ fontSize: "14px" }}>Warderobe</h5>
                      </GridItem>
                      <GridItem xs="12" sm="3" style={{ marginBottom: "15px" }}>
                        <ItemPicker
                          data={wardrobe}
                          value={values.referee_wardrobe}
                          onChange={handleChange}
                          id="referee_wardrobe"
                        />
                      </GridItem>
                    </>
                  )}
                </GridContainer>
                {/*               
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
                /> */}

                {/* row 2 end here */}

                <div className={`btn-wrap ${classes.btnContainer}`}>
                  <Button
                    color="info"
                    className={classes.btnSubmit}
                    type="submit"
                  >
                    Book Activity
                  </Button>

                  {/* <Button
                    color="warning"
                    onClick={showConfirmDialog}
                    className={classes.btnDelete}
                    disabled={deleting}
                    disableRipple={deleting}
                    disableFocusRipple={deleting}
                  >
                    Delete Activity
                  </Button> */}
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}

      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
        <UpcomingActivities />
          </GridItem>
          </GridContainer>
  
      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
