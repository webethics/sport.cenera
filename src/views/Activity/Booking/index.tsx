import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./styles";
import ItemPicker from "./Components/ItemPicker";
import RecurringPicker from "./Components/recurringPicker";
import { TextField, Divider } from "@material-ui/core";
import UpcomingActivities from "./Components/UpcomingActivities";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useSnackbar } from "notistack";
// import axios from "axios";
import { useFetchGetLocations } from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks";
import { useFetchWardrobes } from "@cenera/common/hooks/api-hooks/activity";
import { useFetchActivityType } from "@cenera/common/hooks/api-hooks/activity";
import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import moment from "moment";
import * as Yup from "yup";
import "rc-time-picker/assets/index.css";
import Box from "@mui/material/Box";

import { KeyboardTimePicker } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(styles as any);

export const Booking: FC = () => {
  const [week, setweek] = useState([]);
  const [monthDates, setMonthDates] = useState([]);
  const [appState] = useAppContext();
  const classes = useStyles();
  const [selectedDate, SetselectedDate] = useState(new Date());

  const [activitylist, setactivitylist] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { locationData } = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams } = useFetchTeams();
  const [teamsList, setTeamsList] = useState([]);
  const { activityType } = useFetchActivityType();
  const { Wardrobesdata } = useFetchWardrobes();
  const [wardrobes, setWardrobes] = useState([]);
  const { addActivity } = ActivityService;
  const [fetchupcoming, setFetchupcoming] = useState(0);
  const [startTimefield, handleStartTimefield] = useState(new Date());
  const [endTimefield, handleEndTimefield] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgMonth, setErrorMsgMonth] = useState("");
  const [errorMsgweekly, setErrorMsgweekly] = useState("");
  // const[weekerror,setweekerror]= useState(false);

  //Recurring
  const recurring = [
    { name: "Yes", id: 1 },
    { name: "No", id: 2 },
  ];

  const interval = [
    { name: "weekly", id: 1 },
    { name: "bi-weekly", id: 2 },
    { name: "monthly", id: 3 },
  ];

  const weekdays = [
    { name: "monday" },
    { name: "tuesday" },
    { name: "wednesday" },
    { name: "thursday" },
    { name: "friday" },
    { name: "saturday" },
    { name: "sunday" },
  ];
  let dates = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(i);
  }

  //end
  useEffect(() => {
    if (locationData) {
      const newArr = locationData.map((res: any) => ({
        id: res.location_id,
        name: res.location_name,
      }));
      setLocations(newArr);
    }
    if (teams) {
      const newTeam = teams.map((res: any) => ({
        id: res.team_id,
        name: res.team_name,
      }));
      setTeamsList(newTeam);
    }
    if (Wardrobesdata) {
      const newWardrobes = Wardrobesdata.map((res: any) => ({
        id: res.wardrobe_id,
        name: res.wardrobe_name,
      }));
      setWardrobes(newWardrobes);
    }
    if (activityType[0]) {
      const newactivityType = activityType[0].values.map(
        (res: any, index: number) => ({
          name: res.value,
          isMatch: res.isMatch,
          id: index + 1,
        })
      );
      setactivitylist(newactivityType);
    }
  }, [locationData, teams, Wardrobesdata, activityType]);

  const handleDateChange = (pickerType: string, value: any) => {
    SetselectedDate(value);

    const formikField = { ...formik.values };
    if (pickerType === "start_date") {
      formikField["start_date"] = value;
    } else if (pickerType === "end_date_recurring") {
      formikField["end_date_recurring"] = value;
    } else if (pickerType === "start_time") {
      formikField["start_time"] = value;
    } else if (pickerType === "end_date") {
      formikField["end_date"] = value;
    } else if (pickerType === "end_time") {
      formikField["end_time"] = value;
    }
    formik.setValues(formikField);
  };

  const initialFormValues = {
    team: "0",
    orTeam: "",
    start_date: selectedDate,
    start_time: "",
    end_date: selectedDate,
    end_time: "",
    location: "0",
    warderobe: "0",
    extWarBef15: false,
    extWarBef30: false,
    activity: "0",
    description: "",
    away_team: "",
    away_team_wardrobe: "",
    referee_wardrobe: "",
    show_public: true,
    recurring: 0,
    recurringby: 1,
    end_date_recurring: selectedDate,
    week_day: "",
    month_day: "",
  };

  const handledays1 = (el: string) => {
    if (week.some((elm) => elm === el)) {
      setweek(week.filter((elm) => elm !== el));
    } else {
      setweek((prevvalues) => [
        ...prevvalues,
        weekdays.find((element) => element.name === el).name,
      ]);
    }
  };

  const handledays2 = (el: number) => {
    if (monthDates.some((elm) => elm == el)) {
      setMonthDates(monthDates.filter((elm) => elm !== el));
    } else {
      setMonthDates((prevvalues) => [...prevvalues, el]);
    }
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      activity: Yup.number()
        .min(1, "Activity is required")
        .required("Activity is required"),

      end_date: Yup.date().min(
        Yup.ref("start_date"),
        "End date can't be before start date"
      ),
      start_time: Yup.string().required(
        "Start time could not be equal to end time"
      ),

      end_time: Yup.string()
        .required("End time could not be equal to start time")
        .test(
          "is-greater",
          "End time should be greater than start time",
          function(value) {
            const { start_time } = this.parent;
            return moment(value, "HH:mm").isSameOrAfter(
              moment(start_time, "HH:mm")
            );
          }
        ),

      location: Yup.number()
        .min(1, "Location is required")
        .required("Location is required"),
      start_date: Yup.date(),
      end_date_recurring: Yup.date().min(
        Yup.ref("start_date"),
        "Recuring End date has to be more than start date"
      ),
    }),

    onSubmit: async (formValues) => {
      const {
        start_date,
        start_time,
        end_time,
        end_date_recurring,
      } = formValues;
      const endrecurring_date = moment(end_date_recurring).format(
        "YYYY-MM-DDT00:00"
      );
      const newStartTime =
        moment(start_date).format("YYYY-MM-DDT") + start_time;
      const newEndTime = moment(start_date).format("YYYY-MM-DDT") + end_time;

      let activity: string;

      activitylist.forEach((res, index) => {
        let formVal = Number(formValues.activity) - 1;
        if (formVal === index) activity = res.name;
      });

      const newobj = {
        access_token: appState.authentication.accessToken,
        updateType: "create",
        club_id: appState.user.club_id,
        startTime: newStartTime,
        endTime: newEndTime,
        location_id: formValues.location,
        activity_type: activity,

        ...(formValues.recurring === 1
          ? { recurring_item: true }
          : { recurring_item: false }),

        ...(formValues.recurring === 1 &&
          formValues.recurringby === 1 && {
            recurring_details: `weekly:${week.toString()}`,
          }),
        ...(formValues.recurringby === 2 && {
          recurring_details: `bi-weekly:${week.toString()}`,
        }),
        ...(formValues.recurringby === 3 && {
          recurring_details: `monthly:${monthDates.toString()}`,
        }),
        ...(formValues.team > "0" && { team_id: formValues.team }),
        ...(formValues.orTeam !== "" && { team_text: formValues.orTeam }),
        away_team_text: formValues.away_team,
        wardrobe_id: formValues.warderobe,
        wardrobe_id_away: formValues.away_team_wardrobe,
        wardrobe_id_referee: formValues.referee_wardrobe,
        wardrobe_extra_time:
          (formValues.extWarBef15 && 15) || (formValues.extWarBef30 && 30),
        description: formValues.description,
        isPublic: formValues.show_public, //not added in front end+,
        ...(formValues.recurring == 1 && {
          recurring_endDate: endrecurring_date,
        }),
      };
      if (
        errorMsg.length < 1 &&
        errorMsgMonth.length < 1 &&
        errorMsgweekly.length < 1
      ) {
        try {
          let res = await addActivity(newobj);
          if (res) {
            enqueueSnackbar("Activity Added Successfully", {
              variant: "success",
            });
            setFetchupcoming(1);
          }
        } catch (err) {
          enqueueSnackbar("Failed to Add Activity", { variant: "error" });
        }
      }
    },
  });

  useEffect(() => {
    if (
      formik.values.recurring == 1 &&
      formik.values.recurringby == 2 &&
      week.length < 1
    ) {
      setErrorMsg("Please select week days");
    } else {
      setErrorMsg("");
    }
    if (
      formik.values.recurring == 1 &&
      formik.values.recurringby == 1 &&
      week.length < 1
    ) {
      setErrorMsgweekly("Please select week days");
    } else {
      setErrorMsgweekly("");
    }
    if (
      formik.values.recurring == 1 &&
      formik.values.recurringby == 3 &&
      monthDates.length < 1
    ) {
      setErrorMsgMonth("Please select month dates");
    } else {
      setErrorMsgMonth("");
    }
  }, [formik.values.recurring, formik.values.recurringby, monthDates, week]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      start_time: moment(startTimefield).format("HH:mm"), //if time change it will update formik
      end_time: moment(endTimefield).format("HH:mm"),
    });
  }, [startTimefield, endTimefield]);

  // useEffect(() => {
  //   if (formik.values.activity === "Match") {
  //     formik.setValues({
  //       ...formik.values,
  //       extWarBef30: true,
  //     });
  //   } else {
  //     formik.setValues({
  //       ...formik.values,
  //       extWarBef30: false,
  //     });
  //   }
  // }, [formik.values.activity]);

  const { values, handleChange, errors, touched } = formik;

  return (
    <div>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
          <Card>
            <CardHeader>
              <h4>Book Activity</h4>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs="12" sm="2" md="2" sx={{ mb: 3 }}>
                    <h5 style={{ fontSize: "14px" }}>Team</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={teamsList}
                      onChange={handleChange}
                      value={values.team}
                      disabled={values.orTeam && true}
                      id="team"
                    />
                  </GridItem>

                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: "60px",
                          marginRight: "5px",
                        }}
                      >
                        or
                      </Box>
                      <TextField
                        style={{ flex: "1" }}
                        className="desc_box "
                        id="orTeam"
                        variant="outlined"
                        value={values.orTeam}
                        disabled={values.team !== "0" && true}
                        onChange={handleChange}
                      />
                    </Box>
                  </GridItem>

                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" md="2" sx={{ mb: 3 }}>
                    <h5 style={{ fontSize: "14px" }}>Start *</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    {/* <DatePicker
                      className="datepicker"
                      label="Date"
                      disablePast
                      value={values.start_date}
                      format="dd/MM/yyyy"
                      onChange={(e) => handleDateChange("start_date", e)}
                      animateYearScrolling
                      id="start_date"
                    /> */}

                    <KeyboardDatePicker
                      id="start_date"
                      className="datepicker"
                      clearable
                      disablePast
                      value={values.start_date}
                      placeholder="10/10/2018"
                      onChange={(e) => handleDateChange("start_date", e)}
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                    />
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "60px",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: "60px",
                          marginRight: "5px",
                        }}
                      >
                        Time
                      </Box>

                      {/* <TimePicker
                        className="timepicker"
                        placement={"bottomLeft"}
                        defaultValue={moment()}
                        showSecond={false}
                        onChange={handleValueChange}
                      /> */}
                      <KeyboardTimePicker
                        ampm={false}
                        variant="inline"
                        value={startTimefield}
                        onChange={handleStartTimefield}
                      />
                    </Box>
                    {errors.start_time && touched.start_time && (
                      <span
                        className="time_error"
                        style={{
                          color: "red",
                          paddingLeft: "65px",
                          fontSize: "12px",
                        }}
                      >
                        {errors.start_time}
                      </span>
                    )}
                  </GridItem>

                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>End *</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    {/* <DatePicker
                      className="datepicker"
                      label="Date"
                      disablePast
                      value={values.end_date}
                      format="dd/MM/yyyy"
                      onChange={(e) => handleDateChange("end_date", e)}
                      animateYearScrolling
                      id="end_date"
                    /> */}
                    <KeyboardDatePicker
                      id="end_date"
                      className="datepicker"
                      clearable
                      disablePast
                      value={values.end_date}
                      placeholder="10/10/2018"
                      onChange={(e) => handleDateChange("end_date", e)}
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                    />
                    {errors.end_date && (
                      <span
                        className={classes.errorColor}
                        style={{
                          color: "red",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {errors.end_date}
                      </span>
                    )}
                  </GridItem>

                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "60px",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: "60px",
                          marginRight: "5px",
                        }}
                      >
                        Time
                      </Box>
                      {/* <TimePicker
                        className="timepicker"
                        defaultValue={moment()}
                        showSecond={false}
                        onChange={handleValueChangeend}
                      /> */}

                      <KeyboardTimePicker
                        ampm={false}
                        variant="inline"
                        value={endTimefield}
                        onChange={handleEndTimefield}
                      />
                    </Box>
                    {errors.end_time && touched.end_time && (
                      <span
                        className="time_error"
                        style={{
                          color: "red",
                          paddingLeft: "65px",
                          fontSize: "12px",
                        }}
                      >
                        {errors.end_time}
                      </span>
                    )}
                  </GridItem>
                  {/*Select Recurring Yes/No*/}
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Recurring</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={recurring}
                      value={values.recurring}
                      onChange={handleChange}
                      id="recurring"
                    />
                  </GridItem>

                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <Box
                      className="intervalFormControl"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "60px",
                      }}
                    >
                      {values.recurring == 1 && (
                        <>
                          <Box
                            component="span"
                            sx={{
                              minWidth: "60px",
                              marginRight: "5px",
                            }}
                          >
                            Interval
                          </Box>

                          <RecurringPicker
                            data={interval}
                            value={values.recurringby}
                            onChange={handleChange}
                            id="recurringby"
                          />
                        </>
                      )}
                    </Box>
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  {/*Select Recurring Days/Week*/}

                  {values.recurring == 1 && values.recurringby > 0 && (
                    <>
                      <GridItem
                        xs="12"
                        sm="2"
                        md="2"
                        style={{ marginBottom: "15px" }}
                      >
                        {(values.recurringby === 1 ||
                          values.recurringby === 2) && (
                          <h5
                            style={{ fontSize: "14px", marginBottom: "15px" }}
                          >
                            Select Recurring Days
                          </h5>
                        )}

                        {values.recurringby === 3 && (
                          <h5
                            style={{ fontSize: "14px", marginBottom: "15px" }}
                          >
                            Select Recurring Dates
                          </h5>
                        )}
                      </GridItem>
                      <GridItem
                        xs="6"
                        sm="5"
                        md="4"
                        style={{ marginBottom: "15px" }}
                      >
                        {values.recurringby === 3 && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            {dates.map((res: any) => (
                              <Button
                                style={{
                                  color: "none",
                                  background: "none",
                                  margin: "0px",
                                  width: "none",
                                  padding: "0px",
                                }}
                                onClick={() => handledays2(res)}
                              >
                                <Box
                                  className={
                                    monthDates.some((elm) => elm === res)
                                      ? "active_dates"
                                      : ""
                                  }
                                  component="span"
                                  sx={{
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #ddd",
                                    margin: "5px",
                                    borderRadius: "50%",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#565656",
                                    lineHeight: "0",
                                    "&.active_dates": {
                                      backgroundColor: "#00acc1",
                                      color: "#fff",
                                    },
                                  }}
                                >
                                  {res}
                                </Box>
                              </Button>
                            ))}

                            {errorMsgMonth && (
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "12px",
                                  fontSize: "12px",
                                }}
                              >
                                {errorMsgMonth}
                              </span>
                            )}
                          </Box>
                        )}
                        {(values.recurringby === 1 ||
                          values.recurringby === 2) && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            {weekdays.map((res) => (
                              //  <span onClick={()=>handledays(res.id)}>{res.name}</span>
                              <Button
                                style={{
                                  color: "none",
                                  background: "none",
                                  margin: "0px",
                                  width: "none",
                                  padding: "0px",
                                }}
                                onClick={() => handledays1(res.name)}
                              >
                                <Box
                                  className={
                                    week.some((elm) => elm === res.name)
                                      ? "active_day"
                                      : ""
                                  }
                                  component="span"
                                  sx={{
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #ddd",
                                    margin: "5px",
                                    borderRadius: "50%",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#565656",
                                    lineHeight: "0",

                                    "&.active_day": {
                                      backgroundColor: "#00acc1",
                                      color: "#fff",
                                    },
                                  }}
                                >
                                  {res.name.charAt(0)}
                                </Box>
                              </Button>
                            ))}
                            {(errorMsgweekly || errorMsg) && (
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "12px",
                                  fontSize: "12px",
                                }}
                              >
                                {errorMsgweekly || errorMsg}
                              </span>
                            )}
                          </Box>
                        )}
                      </GridItem>
                      <GridItem
                        xs="6"
                        sm="5"
                        md="4"
                        style={{ marginBottom: "15px" }}
                      ></GridItem>{" "}
                      <GridItem
                        xs="12"
                        md="2"
                        style={{ marginBottom: "15px" }}
                      ></GridItem>
                    </>
                  )}

                  {/* Start Recurring End Date */}
                  {values.recurring === 1 && values.recurringby > 0 && (
                    <>
                      <GridItem
                        xs="12"
                        sm="2"
                        md="2"
                        style={{ marginBottom: "15px" }}
                      >
                        <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>
                          Recurring End Date
                        </h5>
                      </GridItem>
                      <GridItem
                        xs="6"
                        sm="5"
                        md="4"
                        style={{ marginBottom: "15px" }}
                      >
                        {/* <DatePicker
                          className="datepicker"
                          disablePast
                          value={values.end_date_recurring}
                          format="dd/MM/yyyy"
                          onChange={(e) =>
                            handleDateChange("end_date_recurring", e)
                          }
                          animateYearScrolling
                          id="end_date_recurring"
                        /> */}
                        <KeyboardDatePicker
                          id="end_date_recurring"
                          className="datepicker"
                          clearable
                          disablePast
                          value={values.end_date_recurring}
                          placeholder="10/10/2018"
                          onChange={(e) =>
                            handleDateChange("end_date_recurring", e)
                          }
                          minDate={new Date()}
                          format="MM/dd/yyyy"
                        />

                        {errors.end_date_recurring &&
                          touched.end_date_recurring && (
                            <span
                              className={classes.errorColor}
                              style={{ color: "red", display: "inline-block" }}
                            >
                              {errors.end_date_recurring}
                            </span>
                          )}
                      </GridItem>
                      <GridItem
                        xs="6"
                        sm="5"
                        md="4"
                        style={{ marginBottom: "15px" }}
                      ></GridItem>{" "}
                      <GridItem
                        xs="12"
                        md="2"
                        style={{ marginBottom: "15px" }}
                      ></GridItem>
                    </>
                  )}
                  {/* End Recurring End Date */}

                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Location</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={locations}
                      value={values.location}
                      onChange={handleChange}
                      id="location"
                    />

                    {errors.location && touched.location && (
                      <span
                        className={classes.errorColor}
                        style={{
                          color: "red",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {errors.location}
                      </span>
                    )}
                  </GridItem>

                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Wardrobe</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={wardrobes}
                      value={values.warderobe}
                      onChange={handleChange}
                      id="warderobe"
                    />
                  </GridItem>

                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  {/* extra wadrobe time */}
                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Extra Warderobe Time</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    {/* <h5 style={{ fontSize: "14px" }}>Before</h5> */}

                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extWarBef15"
                          checked={values.extWarBef15}
                          style={{ color: "#00acc1" }}
                          onClick={(e) => {
                            formik.setValues({
                              ...formik.values,
                              extWarBef30: false,
                            });
                            handleChange(e);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              formik.setValues({
                                ...formik.values,
                                extWarBef15: !formik.values.extWarBef15,
                                extWarBef30: false,
                              });
                            }
                          }}
                        />
                      }
                      label="15 Min"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extWarBef30"
                          checked={values.extWarBef30}
                          style={{ color: "#00acc1" }}
                          onClick={(e) => {
                            formik.setValues({
                              ...formik.values,
                              extWarBef15: false,
                            });
                            handleChange(e);
                            // }
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              formik.setValues({
                                ...formik.values,
                                extWarBef30: !formik.values.extWarBef30,
                                extWarBef15: false,
                              });
                            }
                          }}
                        />
                      }
                      label="30 Min"
                    />
                  </GridItem>

                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    {/* <h5 style={{ fontSize: "14px" }}>After</h5> */}
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          id="extWarAf15"
                          checked={values.extWarAf15}
                          style={{ color: "#00acc1" }}
                          onChange={(e) => {
                            formik.setValues({
                              ...formik.values,
                              extWarAf30: false,
                            });
                            handleChange(e);
                          }}
                        />
                      }
                      label="15 Min"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="extWarAf30"
                          checked={values.extWarAf30}
                          style={{ color: "#00acc1" }}
                          onChange={(e) => {
                            formik.setValues({
                              ...formik.values,
                              extWarAf15: false,
                            });
                            handleChange(e);
                          }}
                        />
                      }
                      label="30 Min"
                    /> */}
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Activity</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <ItemPicker
                      data={activitylist}
                      value={values.activity}
                      onChange={handleChange}
                      id="activity"
                    />

                    {errors.activity && touched.activity && (
                      <span
                        className={classes.errorColor}
                        style={{
                          color: "red",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
                      >
                        {errors.activity}
                      </span>
                    )}
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem
                    xs="12"
                    sm="2"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  >
                    <h5 style={{ fontSize: "14px" }}>Description</h5>
                  </GridItem>
                  <GridItem
                    xs="12"
                    sm="10"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      className="desc_box"
                      id="description"
                      variant="outlined"
                      value={values.description}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem
                    xs="12"
                    md="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>
                      Show Activity In Public
                    </h5>
                  </GridItem>
                  <GridItem xs="12" sm="10" style={{ marginBottom: "15px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="show_public"
                          checked={values.show_public}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              formik.setValues({
                                ...formik.values,
                                show_public: !formik.values.show_public,
                              });
                            }
                          }}
                        />
                      }
                      label={
                        values.show_public
                          ? "Your Activity will show in Public page"
                          : ""
                      }
                    />
                  </GridItem>

                  {Number(values.activity) == 1 && (
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
                          data={wardrobes}
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
                          data={wardrobes}
                          value={values.referee_wardrobe}
                          onChange={handleChange}
                          id="referee_wardrobe"
                        />
                      </GridItem>
                    </>
                  )}
                </GridContainer>

                <div className={`btn-wrap ${classes.btnContainer}`}>
                  <Button
                    color="info"
                    className={classes.btnSubmit}
                    type="button"
                    onClick={formik.handleSubmit}
                  >
                    Book Activity
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}

      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
          <UpcomingActivities fetchupcomingactivity={fetchupcoming} />
        </GridItem>
      </GridContainer>

      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
