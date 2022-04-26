import React, { useEffect , useState } from "react";
// import axios from "axios"
import {
  Modal,
  Box,
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
import { DatePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSnackbar } from "notistack";
import { useFetchGetLocations} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from '@cenera/common/hooks/api-hooks';
import { useFetchWardrobes} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchEditActivities} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchActivities} from "@cenera/common/hooks/api-hooks/activity";
import { useAppContext } from "@cenera/app-context";
import { ActivityService } from "@cenera/services/api/activity";
import moment from "moment"
import * as Yup from "yup";
import { Input } from '@mui/material';
const useStyles = makeStyles(styles as any);

export default function EditActivityModal(props: any) {
  const editActivity = props.activityId;
  // const [locationname,setLocationname]= useState();
  const [appState] = useAppContext();
  const classes = useStyles();
  const [selectedDate, SetselectedDate] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const {locationData}   = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams} = useFetchTeams(); 
  const [teamsList, setTeamsList] = useState([]); 
  const {Wardrobesdata} = useFetchWardrobes();
  const [wardrobes, setWardrobes] = useState([]);
  const [acitivityList, setAcitivityList] = useState([]);


  const  newobj = {
    "access_token": appState.authentication.accessToken,
    "club_id": appState.user.club_id,
    "activity_id_list": [editActivity]
  };
 
  const {Activitydata}  = useFetchActivities(newobj);

  // const[currenteditactivity,setCurrenteditactivity] = useState(null)
  //data
  const { EditActivitydata }  = useFetchEditActivities(editActivity);
  const {addActivity} = ActivityService;


 

  useEffect(()=>{
    if(Activitydata){
      setAcitivityList(Activitydata)
    }
 
    if(locationData){
      const newArr = locationData.map((res:any)=>({id:res.location_id , name:res.location_name}))
      setLocations(newArr)
    }
    if(teams) {
      const newTeam = teams.map((res:any)=>({id:res.team_id, name:res.team_name}))
      setTeamsList(newTeam);
    }
    if(Wardrobesdata){
      const newWardrobes = Wardrobesdata.map((res:any)=>({id:res.wardrobe_id, name:res.wardrobe_name}))
      setWardrobes(newWardrobes);
      
    }
  },[Activitydata,locationData,teams,Wardrobesdata])



  

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

 
  // const editActivityData = async ()=>{
  //  await  axios.get(`https://61ad9197d228a9001703ae3b.mockapi.io/detail/`)
  //   .then(res=>{
  //     if(res.data){
  //       formik.setValues(res.data)
  //     }
  //   })
  // || EditActivitydata && teamsList.find(res=>res.team_id===EditActivitydata[0].team_id)

    const initialFormValues = {
      team: "",
      orTeam: "",
      start_date:  selectedDate ,
      start_time:   "13:30",
      end_date:selectedDate,
      end_time: "17:30",
      location: "" ,
      warderobe: "",
      extWarBef15:  false,
      extWarBef30:  false,
      // extWarAf15:   false,
      // extWarAf30:  false,
      activity: "",
      description:  "",
      away_team:"",
      away_team_wardrobe: "",
      referee_wardrobe:"",
      show_public:true
    };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
            location: Yup.string()
            .required("Location is Required"),
              start_date: Yup.date(),
              end_date: Yup.date().min(
                  Yup.ref('start_date'),
                  "End date can't be before start date"
                )
    
          }),

    onSubmit: async (formValues) => {
      const {start_date , start_time, end_date, end_time} = formValues;
      const newStartTime = moment(start_date).format('YYYY-MM-DDT')+start_time;
      const newEndTime = moment(end_date).format('YYYY-MM-DDT')+end_time;
        const  newobj = {
        "access_token": appState.authentication.accessToken,
        "updateType": "update",
        "club_id": appState.user.club_id,
        "activity_id": props.activityId,
        "startTime": newStartTime,
        "endTime":  newEndTime,
        "location_id":formValues.location,
        "activity_type": "training",
        "recurring_item": "", ////not added in form 
        "recurring_details":"", //not added in form 
        "recurring_exceptions":"", //not added in form 
        "team_id": formValues.team, 
        "team_text":formValues.team || formValues.orTeam,
        "away_team_text":formValues.away_team,
        "wardrobe_id": formValues.warderobe,
        "wardrobe_id_away": formValues.away_team_wardrobe,
        "wardrobe_id_referee": formValues.referee_wardrobe,
        "wardrobe_extra_time": formValues.extWarBef15 && 15 ||formValues.extWarBef30 && 30,
        "description":formValues.description,
        "isPublic": formValues.show_public //not added in front end+
        };
  
        let res =  addActivity(newobj);
        if(res){
              props.onClose();
              enqueueSnackbar("Activity Edited Successfully",  { variant: 'success' })
              props.callUpcomingActivity();
             }
             else{
              enqueueSnackbar('err',  { variant: 'error' })
             }
    }
  });
 

  const activitydata = [
    { name: "Match",id:1 },
    { name: "Training",id:2 },
    { name: "Maintenance",id:3 },
  ];

  
  useEffect(() => {
    if (formik.values.activity === "Match") {
      formik.setValues({
        ...formik.values,
        extWarBef30: true
        // extWarAf30: true,
      });
    } else {
      formik.setValues({
        ...formik.values,
        extWarBef30: false
        // extWarAf30: false,
      });
    }
     
    //  if(teamsList && EditActivitydata && EditActivitydata.length>0){
    //    const teamName = teamsList.find(res=>res.id===EditActivitydata[0].team_id)
    //    formik.setValues({...formik.values,team:teamName.team_id})

    //  } teamsList,EditActivitydata
     
   
  }, [formik.values.activity]);
 

  useEffect(()=>{
    if(teamsList && EditActivitydata && EditActivitydata.length>0){
      const teamName = teamsList.find(res=>res.id===EditActivitydata[0].team_id)
      
      if(teamName){
        formik.setValues({...formik.values,team:teamName.id})
      }
      

    } 
  },[teamsList,EditActivitydata])

  useEffect(()=>{

    if(acitivityList[0]){
      const starttime = acitivityList[0].startTime;
      const mstarttime = moment(starttime).format('HH:mm')
      const endtime = acitivityList[0].endTime;
      const mendtime = moment(endtime).format('HH:mm')

      console.log(mstarttime,mendtime,"starttime")
      formik.setValues({
        ...formik.values,
        warderobe: acitivityList[0].wardrobe_id,
        location: acitivityList[0].location_id,
        team: acitivityList[0].team_id,
        description: acitivityList[0].description,
        away_team: acitivityList[0].away_team_text,
        away_team_wardrobe: acitivityList[0].wardrobe_id_away,
        referee_wardrobe: acitivityList[0].wardrobe_id_referee,
        start_date: acitivityList[0].startTime,
        end_date: acitivityList[0].endTime,
        start_time: mstarttime,
        end_time: mendtime,
        extWarBef15: acitivityList[0].wardrobe_extra_time==15 && true,
        extWarBef30:  acitivityList[0].wardrobe_extra_time==30 && true
      })
    }
  },[acitivityList])
  if(acitivityList[0]){
    console.log('current')
  }
//startTime
//moment(res.startTime).format("HH:mm")

  const { values, handleChange, errors, touched } = formik;

  return (
    <div>
      <Modal {...props}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit Activity</h4>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => props.onClose()}
            />
          </Box>
          <Divider style={{ width: "100%", marginBottom: "15px" }} />

          <form onSubmit={formik.handleSubmit}>
            
            <GridContainer>
              <GridItem xs="12" sm="2" sx={{ mb: 3 }}>
                <h5 style={{ fontSize: "14px" }}>Team</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
                <ItemPicker
                  data={teamsList}
                  onChange={handleChange}
                  value={values.team}
                  id="team"
                />
              </GridItem>

              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
                <h5 style={{ fontSize: "14px" }}>Start</h5>
              </GridItem>
              <GridItem xs="6" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
                {errors.end_date && <span className={classes.errorColor} style={{color:'red',display: 'inline-block'}}>{errors.end_date}</span>}

              </GridItem>
              <GridItem xs="6" sm="5" md="3" style={{ marginBottom: "15px" }}>
                    <Input
                      placeholder="time"
                      id="start_time"
                      type="time"
                      value={values.start_time}
                      onChange={handleChange}
                    /> 
              </GridItem>
              <GridItem
                xs="12"
                md="4"
                style={{ marginBottom: "15px" }}
              ></GridItem>

              <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>End</h5>
              </GridItem>
              <GridItem xs="6" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
              <GridItem xs="6" sm="5" md="3" style={{ marginBottom: "15px" }}>
                   <Input
                      placeholder="time"
                      id="end_time"
                      type="time"
                      value={values.end_time}
                      onChange={handleChange}
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
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
                <ItemPicker
                  data={locations}
                  value={values.location}
                  onChange={handleChange}
                  id="location"
                />
                {errors.location && touched.location && <span className={classes.errorColor} style={{color:'red',display: 'inline-block'}}>{errors.location}</span>}
              </GridItem>
              <GridItem
                xs="12"
                md="7"
                style={{ marginBottom: "15px" }}
              ></GridItem>

              <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Warderobe</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
                <ItemPicker
                  data={wardrobes}
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
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
                {/* <h5 style={{ fontSize: "14px" }}>Before</h5> */}

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

              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
     
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
                /> */}
{/* 
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
              {/* extra wadrobe time end here */}
              <GridItem
                xs="12"
                md="4"
                style={{ marginBottom: "15px" }}
              ></GridItem>

              <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Activity</h5>
              </GridItem>
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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


                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Show Activity In Public</h5>
                  </GridItem>
                  <GridItem xs="12" sm="10" style={{ marginBottom: "15px" }}>
                  <FormControlLabel
                      control={
                        <Checkbox
                          id="show_public"
                          checked={values.show_public}
                          style={{ color: "#00acc1" }}
                          onChange={handleChange}
                        />
                      }
                      label={values.show_public?"Your Activity will show in Public page" : ""}
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
                  <Divider style={{ width: "100%", marginBottom: "15px" }} />

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
              <Button color="info" className={classes.btnSubmit} type="submit">
                Edit Activity
              </Button>
            </div>
          </form>
          <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
