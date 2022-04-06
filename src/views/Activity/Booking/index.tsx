import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./styles";
import ItemPicker from "./Components/ItemPicker";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import UpcomingActivities from "./Components/UpcomingActivities";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useFetchGetLocations} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from '@cenera/common/hooks/api-hooks';
import { useAppContext } from "@cenera/app-context";

const useStyles = makeStyles(styles as any);

export const Booking: FC = () => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [selectedDate, SetselectedDate] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const {locationData,error}   = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams} = useFetchTeams(); 
  const [teamsList, setTeamsList] = useState([]); 

  useEffect(()=>{
    if(locationData){
      const newArr = locationData.map((res:any)=>({id:res.location_id , name:res.location_name}))
      setLocations(newArr)
  
    }else if(error){
     enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
    }

    if(teams) {
      const newTeam = teams.map((res:any)=>({id:res.team_id, name:res.team_name}))
      setTeamsList(newTeam);
    }

    console.log(appState.user.club_id,'apppp')
  },[locationData,teams])
 



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


  const initialFormValues = {
    team: "",
    orTeam: "",
    start_date: selectedDate,
    start_time: selectedDate,
    end_date: selectedDate,
    end_time: selectedDate,
    location: "",
    warderobe: "",
    extWarBef15: false,
    extWarBef30: false,
    extWarAf15: false,
    extWarAf30: false,
    activity: "",
    description: "",
    away_team: "",
    away_team_wardrobe: "",
    referee_wardrobe: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (formValues) => {

      try{
        let {data} = await axios.post("https://61ad9197d228a9001703ae3b.mockapi.io/detail",{...formValues})
        if(data){
        enqueueSnackbar("Activity Added Successfully",  { variant: 'success' })
        }
      }catch(err){
        enqueueSnackbar("Failed to Add Activity",  { variant: 'error' })
      }
      
    },
  });

  useEffect(() => {
    if (formik.values.activity === "Match") {
      formik.setValues({
        ...formik.values,
        extWarBef30: true,
        extWarAf30: true,
      });
    } else {
      formik.setValues({
        ...formik.values,
        extWarBef30: false,
        extWarAf30: false,
      });
    }
  }, [formik.values.activity]);

 
  const wardrobe = [{ name: "wardrobe 1" }, { name: "wardrobe 2" }];
  const activitydata = [
    { name: "Match" },
    { name: "Training" },
    { name: "Maintenance" },
  ];

  const { values, handleChange } = formik;
  return (
    <div>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
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
                      data={locations}
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

                <div className={`btn-wrap ${classes.btnContainer}`}>
                  <Button
                    color="info"
                    className={classes.btnSubmit}
                    type="submit"
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
          <UpcomingActivities loadUpcomingActivities={formik.isSubmitting} />
        </GridItem>
      </GridContainer>

      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
