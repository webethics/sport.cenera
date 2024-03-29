import React, { useEffect, useState } from "react";
// import axios from "axios"
import {
  Modal,
  makeStyles,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { useFormik } from "formik";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "../styles";
import { modalStyle } from "./styles";
import ItemPicker from "./ItemPicker";
import RecurringPicker from "./recurringPicker";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSnackbar } from "notistack";
import { useFetchGetLocations } from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks";
import { useFetchWardrobes } from "@cenera/common/hooks/api-hooks/activity";
import { useFetchEditActivities } from "@cenera/common/hooks/api-hooks/activity";
import { useAppContext } from "@cenera/app-context";
import { ActivityService } from "@cenera/services/api/activity";
import moment from "moment";
import * as Yup from "yup";
import { useFetchActivityType } from "@cenera/common/hooks/api-hooks/activity";
import "rc-time-picker/assets/index.css";
import Autocomplete from "@mui/material/Autocomplete";

import Box from "@mui/material/Box";
import { KeyboardTimePicker } from "@material-ui/pickers";
const useStyles = makeStyles(styles as any);

export default function EditActivityModal(props: any) {
  //

  const [initialteam, setinitialteam] = useState(null);
  const [initiallocation, setinitiallocation] = useState(null);
  const [initialwardrobe, setinitialwardrobe] = useState(null);
  const [activitytype, setactivitytype] = useState(null);

  //
  const editActivity = props.activityid;
  const editActivitystarttime = props.activitystarttime;
  const [week, setweek] = useState([]);
  const [monthDates, setMonthDates] = useState([]);
  const [appState] = useAppContext();
  const classes = useStyles();
  const [selectedDate, SetselectedDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();
  const { locationData } = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams } = useFetchTeams();
  const [teamsList, setTeamsList] = useState([]);
  const { Wardrobesdata } = useFetchWardrobes();
  const [wardrobes, setWardrobes] = useState([]);
  const [activitylist, setactivitylist] = useState([]);

  const [startTimefield, handleStartTimefield] = useState<any>(new Date());
  const [endTimefield, handleEndTimefield] = useState(new Date());

  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgMonth, setErrorMsgMonth] = useState("");
  const [errorMsgweekly, setErrorMsgweekly] = useState("");

  const { activityType } = useFetchActivityType();
  // function addHoursToDate(date: Date, hours: number): Date {
  //   return new Date(new Date(date).setHours(date.getHours() + hours));
  // }

  //Recurring
  const recurring = [
    { name: "Ingen", id: 1 },
    { name: "valgt", id: 2 },
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
  let dates: any = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(i);
  }

  const { EditActivitydata, loading } = useFetchEditActivities(
    editActivity,
    editActivitystarttime,
    editActivitystarttime
  );

  const { addActivity } = ActivityService;

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
    start_date: "",
    start_time: "",
    end_date: selectedDate,
    end_time: "",
    location: "0",
    warderobe: "0",
    extWarBef15: false,
    extWarBef30: false,
    activity: "2",
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
        .min(1, "Activity is Required")
        .required("Activity is Required"),

      // end_date: Yup.date().min(
      //   Yup.ref("start_date"),
      //   "End date can't be before start date"
      // ),

      start_time: Yup.string().required(""),
      end_time: Yup.string()
        .required("Time is Required")
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
        .min(1, "Location is Required")
        .required("Location is Required"),

      recurring: Yup.number(),
      // end_date_recurring: Yup.date().when("recurring", {
      //   is: 1,
      //   then: Yup.date().min(
      //     Yup.ref("start_date"),
      //     "Recuring End date has to be more than start date"
      //   ),
      // }),
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
        updateType: "update",
        club_id: appState.user.club_id,
        activity_id: props.activityid,
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
        ...(formValues.team !== "" && { team_id: formValues.team }),
        ...(formValues.orTeam !== "" && { team_text: formValues.orTeam }),
        ...(formValues.activity == "1" && { away_team_text: formValues.away_team }),
        // away_team_text: formValues.away_team,

        wardrobe_id: formValues.warderobe,

        ...(formValues.activity == "1" && { wardrobe_id_away: formValues.away_team_wardrobe }),
        // wardrobe_id_away: formValues.away_team_wardrobe,

        ...(formValues.activity == "1" && { wardrobe_id_referee: formValues.referee_wardrobe }),
        // wardrobe_id_referee: formValues.referee_wardrobe,
        
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
        let res = await addActivity(newobj);
        if (res.data.message) {
          props.onClose();
          props.callupcoming(props.activityid);
          //  props.updatedsuccess()
          enqueueSnackbar("Activity Edited Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("err", { variant: "error" });
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
      setErrorMsgMonth("please select month dates");
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
  //   if (startTimefield) {
  //     handleEndTimefield(addHoursToDate(startTimefield, 1));
  //   }
  // }, [startTimefield]);


  const[activitytypeis,setactivitytypeis]=useState()
  useEffect(() => {
    if (EditActivitydata[0]) {
      handleStartTimefield(
        moment(EditActivitydata[0].startTime, "YYYY-MM-DDTHH:mm:ss.SSS")
          // .format()
          .toDate()
      );
      // const start =  {moment(startdate).format("Do")}
      // const end = new Date(EditActivitydata[0].endTime.toString());

      // const end = new Date(EditActivitydata[0].endTime.toString());
      handleEndTimefield(
        moment(EditActivitydata[0].endTime, "YYYY-MM-DDTHH:mm:ss.SSS")
          // .format()
          .toDate()
      );

      const starttime = EditActivitydata[0].startTime;
      const mstarttime = moment(starttime).format("HH:mm");
      const endtime = EditActivitydata[0].endTime;
      const mendtime = moment(endtime).format("HH:mm");
      let newActivity: any = 0;

      weekdays.forEach((res) => {
        if (EditActivitydata[0].recurring_details.includes(res.name)) {
          setweek((prev) => [...prev, res.name]);
        }
      });

      let selectedDate = EditActivitydata[0].recurring_details
        .slice(EditActivitydata[0].recurring_details.indexOf(":") + 1)
        .split(",");
      selectedDate.forEach((date: number) => {
        setMonthDates((prev) => [...prev, Number(date)]);
      });

      if (EditActivitydata && EditActivitydata[0]) {
        activitylist.forEach((res) => {
          if (res.name == EditActivitydata[0].activity_type.toLowerCase()) {
            newActivity = res.id;
            setactivitytype(newActivity);
            setactivitytypeis(newActivity)
          }
        });

        formik.setValues({
          ...formik.values,
          orTeam:
            EditActivitydata[0].team_id == null
              ? EditActivitydata[0].team_text
              : "",
          warderobe: EditActivitydata[0].wardrobe_id,
          location: EditActivitydata[0].location_id,

          activity: newActivity,
          description: EditActivitydata[0].description,
          away_team: EditActivitydata[0].away_team_text,
          away_team_wardrobe: EditActivitydata[0].wardrobe_id_away,
          referee_wardrobe: EditActivitydata[0].wardrobe_id_referee,
          start_date: moment(EditActivitydata[0].startTime).format(
            "MM/DD/YYYY"
          ),
          end_date: EditActivitydata[0] && EditActivitydata[0].endTime,
          start_time: mstarttime,
          end_time: mendtime,
          extWarBef15: EditActivitydata[0].wardrobe_extra_time == 15 && true,
          extWarBef30: EditActivitydata[0].wardrobe_extra_time == 30 && true,
          recurring: EditActivitydata[0].recurring_item == true ? 1 : 0,
          recurringby:
            (EditActivitydata[0].recurring_details.includes("weekly") && 1) ||
            (EditActivitydata[0].recurring_details.includes("bi-weekly") &&
              2) ||
            (EditActivitydata[0].recurring_details.includes("monthly") && 3) ||
            (!EditActivitydata[0].recurring_details && 1),
          end_date_recurring: EditActivitydata[0].recurring_endDate,
          show_public: EditActivitydata[0].isPublic,
        });
      }
    }
  }, [EditActivitydata]);

  // if (EditActivitydata[0] && EditActivitydata[0]) {
  //   console.log(EditActivitydata[0], "current edit");
  // }
  useEffect(() => {
    if (EditActivitydata[0]) {
      setinitialteam(
        EditActivitydata[0].team_id !== null
          ? EditActivitydata[0].team_id.toString()
          : ""
      );
      //formik.setValues({ ...formik.values,team: EditActivitydata[0].team_id !== null ? EditActivitydata[0].team_id.toString() : "" });
      setinitiallocation(EditActivitydata[0].location_id.toString());
      setinitialwardrobe(EditActivitydata[0].wardrobe_id.toString());
    }
  }, [EditActivitydata]);
  // console.log(typeof initialteam, "hhhhh"); orTeam
  const { values, handleChange, errors, touched } = formik;


  useEffect(() => {
    if (initialteam) {
      formik.setValues({ ...formik.values,team: initialteam});
    }
  }, [initialteam]);

  return (
    <div>
      <Modal {...props}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit aktiviteter</h4>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => props.onClose()}
            />
          </Box>
          <Divider style={{ width: "100%", marginBottom: "15px" }} />

          <form>
            <GridContainer>
              <GridItem xs="12" sm="2" md="2" sx={{ mb: 3 }}>
                <h5 style={{ fontSize: "14px" }}>Start *</h5>
              </GridItem>
              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
                <KeyboardDatePicker
                  id="start_date"
                  className="datepicker"
                  clearable
                  disablePast
                  value={values.start_date}
                  placeholder="10/10/2018"
                  onChange={(e) => handleDateChange("start_date", e)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                />
              </GridItem>
              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
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
                    Tid
                  </Box>
                  {/* 
                  <TimePicker
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
                {errors.start_time && (
                  <span
                    className="time_error"
                    style={{
                      color: "red",
                      paddingLeft: "65px",
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
              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>End *</h5>
              </GridItem>
              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
                <KeyboardDatePicker
                  id="end_date"
                  className="datepicker"
                  clearable
                  disablePast
                  value={values.start_date}
                  placeholder="10/10/2018"
                  onChange={(e) => handleDateChange("start_date", e)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                />
                {errors.end_date && (
                  <span
                    className={classes.errorColor}
                    style={{ color: "red", display: "inline-block" }}
                  >
                    {errors.end_date}
                  </span>
                )}
              </GridItem>

              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
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
                    Tid
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
                    }}
                  >
                    {errors.end_time}
                  </span>
                )}
              </GridItem>

              <GridItem
                xs="12"
                md="2"
                style={{ marginBottom: "15px" }}
              ></GridItem>
              <GridItem xs="12" sm="2" md="2" sx={{ mb: 3 }}>
                <h5 style={{ fontSize: "14px" }}>Lag</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
                {/* <ItemPicker
                  data={teamsList}
                  onChange={handleChange}
                  value={values.team}
                  disabled={values.orTeam && true}
                  id="team"
                /> */}

                <Autocomplete
                  style={{ width: "75%" }}
                  disabled={values.orTeam && true}
                  //disablePortal

                  value={
                    initialteam && teamsList.find((o) => o.id == initialteam )
                  }
                  id="team"
                  onChange={(e, obj) => {
                    if (obj !== null) {
                      formik.setValues({
                        ...formik.values,
                        team: obj.id,
                      });
                    } else {
                      formik.setValues({
                        ...formik.values,
                        team: "0",
                      });
                    }
                    console.log(e);
                  }}
                  options={teamsList}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Velg Lag" />
                  )}
                />
              </GridItem>

              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
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
                    eller
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

              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Lokasjon</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
                {/* <ItemPicker
                  data={locations}
                  value={values.location}
                  onChange={handleChange}
                  id="location"
                /> */}
                <Autocomplete
                  // disablePortal
                  style={{ width: "75%" }}
                  value={
                    initiallocation &&
                    locations.find((o) => o.id == initiallocation)
                  }
                  id="location"
                  onChange={(e, obj) => {
                    if (obj !== null) {
                      formik.setValues({
                        ...formik.values,
                        location: obj.id,
                      });
                    } else {
                      formik.setValues({
                        ...formik.values,
                        location: "0",
                      });
                    }
                    console.log(e);
                  }}
                  options={locations}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Velg Lokasjon" />
                  )}
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

              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Aktivitet</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
                {/* <ItemPicker
                  data={activitylist}
                  value={values.activity}
                  onChange={handleChange}
                  id="activity"
                /> */}
                <Autocomplete
                  //disablePortal
                  style={{ width: "75%" }}
                  id="activity"
                  // value={"2"}
                  value={
                    activitytype &&
                    activitylist.find((o) => o.id == activitytypeis)
                  }
                  onChange={(e, obj) => {
                    if (obj !== null) {
                      setactivitytypeis(obj.id)
                      formik.setValues({
                        ...formik.values,
                        activity: obj.id,
                      });
                    } else {
                      formik.setValues({
                        ...formik.values,
                        activity: "0",
                      });
                    }
                 
                    console.log(e);

                  }}
                  options={activitylist}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Velg Aktivitet" />
                  )}
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

              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Garderobe</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
                {/* <ItemPicker
                  data={wardrobes}
                  value={values.warderobe}
                  onChange={handleChange}
                  id="warderobe"
                /> */}
                <Autocomplete
                  //disablePortal
                  style={{ width: "75%" }}
                  id="warderobe"
                  value={
                    initialwardrobe &&
                    wardrobes.find((o) => o.id == initialwardrobe)
                  }
                  onChange={(e, obj) => {
                    if (obj !== null) {
                      formik.setValues({
                        ...formik.values,
                        warderobe: obj.id,
                      });
                    } else {
                      formik.setValues({
                        ...formik.values,
                        warderobe: "0",
                      });
                    }
                    console.log(e);
                  }}
                  options={wardrobes}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Velg Gardrobe" />
                  )}
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
              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Ekstra tid Garderobe</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="4" style={{ marginBottom: "15px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="extWarBef15"
                      checked={values.extWarBef15}
                      style={{ color: "#00acc1" }}
                      onChange={(e) => {
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
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          extWarBef15: false,
                        });
                        handleChange(e);
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
              ></GridItem>
              <GridItem
                xs="12"
                md="2"
                style={{ marginBottom: "15px" }}
              ></GridItem>

              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>
                  Beskrivelse(blir ikke publisert)
                </h5>
              </GridItem>
              <GridItem xs="12" sm="10" md="4" style={{ marginBottom: "15px" }}>
                <TextField
                  className="desc_box"
                  id="description"
                  variant="outlined"
                  value={values.description}
                  onChange={handleChange}
                  style={{ width: "75%" }}
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
              {/*Select Recurring Yes/No*/}
              <GridItem xs="12" sm="2" md="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Gjentagende</h5>
              </GridItem>
              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
                <ItemPicker
                  data={recurring}
                  value={values.recurring}
                  onChange={handleChange}
                  id="recurring"
                />
              </GridItem>

              <GridItem xs="6" sm="5" md="4" style={{ marginBottom: "15px" }}>
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
                        Intervall
                      </Box>
                      {/* <ItemPicker
                            placeholder="selectType"
                            data={recurringby}
                            value={values.recurringby}
                            onChange={handleChange}
                            id="recurringby"     
                          /> */}
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
                    {(values.recurringby === 1 || values.recurringby === 2) && (
                      <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>
                        Velg ukedager for gjentagende
                      </h5>
                    )}

                    {values.recurringby === 3 && (
                      <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>
                        Velg ukedager for gjentagende
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
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {dates.map((res: any) => (
                            <Button
                              onClick={() => handledays2(res)}
                              className={
                                monthDates.some((elm) => elm === res)
                                  ? `${classes.dateButton} active_dates`
                                  : classes.dateButton
                              }
                              disableRipple
                            >
                              {res}
                            </Button>
                          ))}
                        </Box>
                        <Box>
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
                      </>
                    )}
                    {(values.recurringby === 1 || values.recurringby === 2) && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {weekdays.map((res) => (
                          <Button
                            onClick={() => handledays1(res.name)}
                            className={
                              week.some((elm) => elm === res.name)
                                ? `${classes.dateButton} active_dates`
                                : classes.dateButton
                            }
                            disableRipple
                          >
                            {res.name.charAt(0).toUpperCase()}
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
                      Gjentagende aktivitet
                    </h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  >
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
                      format="dd/MM/yyyy"
                    />
                    {errors.end_date_recurring && (
                      <span
                        className={classes.errorColor}
                        style={{
                          color: "red",
                          display: "inline-block",
                          fontSize: "12px",
                        }}
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
              <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Publiser aktivitet</h5>
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
                  <Divider
                    style={{
                      width: "100%",
                      marginBottom: "15px",
                      marginTop: "15px",
                    }}
                  />
                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Bortelag</h5>
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
                    <h5 style={{ fontSize: "14px" }}>Garderobe</h5>
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
                  <Divider style={{ width: "100%", marginBottom: "15px" }} />

                  {/* for referee */}
                  <GridItem
                    xs="12"
                    sm="2"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="3" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Dommer</h5>
                  </GridItem>

                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Garderobe</h5>
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
                Edit aktivitet
              </Button>
            </div>
          </form>
          <Backdrop
            className={classes.backdrop}
            open={formik.isSubmitting || loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
