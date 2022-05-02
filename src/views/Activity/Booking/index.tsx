import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./styles";
import ItemPicker from "./Components/ItemPicker";
import { DatePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import UpcomingActivities from "./Components/UpcomingActivities";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useSnackbar } from "notistack";
// import axios from "axios";
import { useFetchGetLocations} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from '@cenera/common/hooks/api-hooks';
import { useFetchWardrobes } from "@cenera/common/hooks/api-hooks/activity";
import {  useFetchActivityType} from "@cenera/common/hooks/api-hooks/activity";
import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import moment from "moment"
import * as Yup from "yup";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Box from "@mui/material/Box";


const useStyles = makeStyles(styles as any);

export const Booking: FC = () => {
  // const [recurringtype, setrecurringtype] = React.useState('');
  const [week,setweek]= useState([]);
  const [monthDates,setMonthDates]= useState([]);
  const [appState] = useAppContext();
  const classes = useStyles();
  const [selectedDate, SetselectedDate] = useState(new Date());
  const [activitylist,setactivitylist] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {locationData}   = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams} = useFetchTeams(); 
  const [teamsList, setTeamsList] = useState([]); 
  const{ activityType } = useFetchActivityType();
  const {Wardrobesdata} = useFetchWardrobes();
  const [wardrobes, setWardrobes] = useState([]);
  const {addActivity } = ActivityService;
  const[fetchupcoming,setFetchupcoming]=useState(0)


  //Recurring
  const recurring = [
    { name: "Yes",id:1 },
    { name: "No",id:2 },
  ];

  
  const recurringby = [
    { name: "Weekly",id:1 },
    { name: "bi-weekly",id:2 },
    { name: "monthly",id:3 }
 
  ];


const weekdays = [
  { name: "Monday"  },
  { name: "Tuesday"  },
  { name: "Wednesday"},
  { name: "Thursday"},
  { name: "Friday" },
  { name: "Saturday"},
  { name: "Sunday"}

];
let dates=[];
for(let i=1;i<=31;i++){
  dates.push(i);
}



const handledays1 = (el:string)=>{
  console.log(week.some((elm)=>(elm.name)===el))
  if(week.some((elm)=>(elm)===(el))){
    setweek(week.filter((elm)=>elm!==el))
  }else{
    setweek((prevvalues)=>[...prevvalues,weekdays.find(element => element.name === el).name])
  }
 
}

const handledays2 = (el:number)=>{
  
  if(monthDates.some((elm)=>(elm)==(el))){
    console.log('ran');
    setMonthDates(monthDates.filter((elm)=>elm!==el))
  }else{
    setMonthDates((prevvalues)=>[...prevvalues,el])
  }
 
}

//end
useEffect(()=>{

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
  if(activityType[0]){
    const newactivityType = activityType[0].values.map((res:any,index:number)=>({name:res.value, isMatch:res.isMatch,id:index}))
    setactivitylist(newactivityType)
  }
},[locationData,teams,Wardrobesdata,activityType])


  const handleDateChange = (pickerType: string, value: any) => {
  
    SetselectedDate(value);
  
    const formikField = { ...formik.values };
    if (pickerType === "start_date") {
      formikField["start_date"] = value;
    } 
    else if (pickerType === "end_date_recurring") {
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
    team: "",
    orTeam: "",
    start_date: selectedDate,
    start_time: "13:30",
    end_date: selectedDate,
    end_time: "18:30",
    location: "",
    warderobe: "",
    extWarBef15: false,
    extWarBef30: false,
    extWarAf15: false,
    extWarAf30: false,
    activity: "0.5",
    description: "",
    away_team: "",
    away_team_wardrobe: "",
    referee_wardrobe: "",
    show_public:true,
    recurring:0,
    recurringby:0,
    end_date_recurring: selectedDate,
    recurringtype: ""
  };

  const handleValueChange = (value:any) => {
    console.log(value && value.format('HH:mm'),"start");
 
  };

    //weeks


  const handleValueChangeend = (value:any) => {
    console.log(value && value.format('HH:mm'));
    formik.setValues({
      ...formik.values,
      end_time: value && value.format('HH:mm')})
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
            ),


      }),

  
    onSubmit: async (formValues) => { 
      console.log(formValues,'formValues')
      const {start_date , start_time, end_date, end_time} = formValues;
      const newStartTime = moment(start_date).format('YYYY-MM-DDT')+start_time
      const newEndTime = moment(end_date).format('YYYY-MM-DDT')+end_time 
      const recurringstartdate = moment(start_date).format('YYYY-MM-DD')
      const recurringenddate = moment(end_date).format('YYYY-MM-DD')
      
    
      var getDaysBetweenDates = function(startDate:any, endDate:any) {
        var now = moment(startDate).clone(),dates = [];
        while (now.isSameOrBefore(endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'days');
        }
        return dates.toString();
    };
 
    let recuringDateList:any=false
    if(recurringstartdate !== recurringenddate){
      recuringDateList = getDaysBetweenDates(recurringstartdate, recurringenddate);
    }
    let activity:string;
     if(formValues.activity=="0"){
      activity = "match";
    }
    else if(formValues.activity=="1"){
      activity = "training";
    }
    else if(formValues.activity=="2"){
      activity = "maintenance";
    }
    else if(formValues.activity=="3"){
      activity = "rental";
    }
    else if(formValues.activity=="0.5"){
      activity = "";
    }
    
   // ...(formValues.team!=="0" && {"team_id": formValues.team}),
   
      const  newobj = {
              "access_token": appState.authentication.accessToken,
              "updateType": "create",
              "club_id": appState.user.club_id,
              "startTime": newStartTime,
              "endTime":  newEndTime,
              "location_id":formValues.location,
              "activity_type": activity,
              "recurring_item": recuringDateList.length>0? true : "", ////not added in form 
  
              // "recurring_details": formValues.recurringby==1 && "", //not added in form 
              ...(formValues.recurringby==1 && {"recurring_details": `weekly:${week.toString()}`}),
              ...(formValues.recurringby==2 && {"recurring_details": `bi-weekly:${week.toString()}`}),
              ...(formValues.recurringby==3 && {"recurring_details": `monthly:${monthDates.toString()}`}),
              ...(formValues.team.length && {"team_id": formValues.team}),
              "team_text":formValues.orTeam,
              "away_team_text":formValues.away_team,
              "wardrobe_id": formValues.warderobe,
              "wardrobe_id_away": formValues.away_team_wardrobe,
              "wardrobe_id_referee": formValues.referee_wardrobe,
              "wardrobe_extra_time": formValues.extWarBef15 && 15 ||formValues.extWarBef30 && 30,
              "description":formValues.description,
              "isPublic": formValues.show_public, //not added in front end+,
              "fetchupcoming": fetchupcoming
            };     
      try{
        let res = await addActivity(newobj);
        if(res){
        enqueueSnackbar("Activity Added Successfully",  { variant: 'success' })
        setFetchupcoming(1)
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

 


  const { values, handleChange, errors ,touched} = formik;



  return (
    <div>
     {console.log(monthDates)}
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
                  {/* <TextField
                    id="start_time"
                    label="clock"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    value={values.start_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  /> */}
                     {/* <input
                      placeholder="time"
                      id="start_time"
                      type="time"
                      value={values.start_time}
                      
                      onChange={handleChange}
                    />  */} 
                    <div>
                     <TimePicker className="timepicker"  defaultValue={moment()} showSecond={false}  onChange={handleValueChange} />
                    </div>
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
                    {errors.end_date && <span className={classes.errorColor} style={{color:'red',display: 'inline-block'}}>{errors.end_date}</span>}

                  </GridItem>
        
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <TimePicker className="timepicker"  defaultValue={moment()} showSecond={false}  onChange={handleValueChangeend} />

                  </GridItem>
  {/* // recurring======================================= */}
                  <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                    <h5 style={{ fontSize: "14px" }}>Recurring</h5>
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.recurring}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>None</MenuItem>
                          <MenuItem value={1}>Yes</MenuItem>
                          <MenuItem value={2}>No</MenuItem>
                      </Select>
                  </FormControl> */}

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
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                     {values.recurring==1 && 

                     <ItemPicker
                     placeholder="selectType"
                     data={recurringby}
                     value={values.recurringby}
                     onChange={handleChange}
                     id="recurringby"
                     />

                     }
                </GridItem>
               {console.log(values.recurringby,"values.recurringby")}
                
             
{/* //recurring========================================================================= */}

  {/* 11111111111111111111*/}

             {values.recurringby>0 && <>
                <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                  
                   {values.recurringby===1&& <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>Select Days</h5>}
                   {values.recurringby===2&& <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>Select Days</h5>}
                   {values.recurringby===3&& <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>Select Dates</h5>}
                   
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >

                 {values.recurringby===3&&
                   <Box
                   sx={{
                     display:"flex",
                     alignItems:"center",
                     flexWrap:"wrap",
                   }}
                   >
                {dates.map((res:any)=>(
                  //  <span onClick={()=>handledays(res.id)}>{res.name}</span>
                   <Box 
                   className={(monthDates.some((elm)=>(elm)===res))?'active_dates':''}
                   component="span"
                   sx={{
                    width:"32px",
                    height:"32px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    border:"1px solid #ddd",
                    margin:"5px",
                    borderRadius:"50%",
                    fontSize:"12px",
                    fontWeight:"600",
                    color:"#000",
                    "&.active_dates":{
                    backgroundColor:"#00acc1",
                    color:"#fff"
                    }
                  }}
                   onClick={()=>handledays2(res)}>{res}</Box>
                
                ))}
          
              
                </Box>
                 }
                  {values.recurringby===1&& 
                
                  <Box
                     sx={{
                       display:"flex",
                       alignItems:"center"
                     }}
                     >
                  {weekdays.map((res)=>(
                    //  <span onClick={()=>handledays(res.id)}>{res.name}</span>
                     <Box 
                     className={(week.some((elm)=>(elm)===res.name))?'active_day':''}
                     component="span"
                     sx={{
                      width:"32px",
                      height:"32px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      border:"1px solid #ddd",
                      margin:"0 5px",
                      borderRadius:"50%",
                      fontSize:"12px",
                      fontWeight:"600",
                      color:"#000",
                      "&.active_day":{
                        backgroundColor:"#00acc1",
                        color:"#fff"
                      }
                    }}
                     onClick={()=>handledays1(res.name)}>{res.name.charAt(0)}</Box>
                  
                  ))}
            
                
                  </Box>
                   }

              {values.recurringby===2&& 
                <Box
                   sx={{
                     display:"flex",
                     alignItems:"center"
                   }}
                   >
                {weekdays.map((res)=>(

                   <Box 
                   className={(week.some((elm)=>(elm)===res.name))?'active_day':''}
                   component="span"
                   sx={{
                    width:"32px",
                    height:"32px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    border:"1px solid #ddd",
                    margin:"0 5px",
                    borderRadius:"50%",
                    fontSize:"12px",
                    fontWeight:"600",
                    color:"#000",
                    "&.active_day":{
                      backgroundColor:"#00acc1",
                      color:"#fff"
                    }
                  }}
                   onClick={()=>handledays1(res.name)}>{res.name.charAt(0)}</Box>
                
                ))}

                </Box>
                 }

                  </GridItem>
                  {console.log(week.toString(),"week")}
        
                 <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    

                </GridItem> </>}

               
                
                     
{/* 1111111111111111111111111111111111111111111111111111111111111111111111111 */}
{/* eeeeeeeeeeeeeenddddddddddddddddddddddd */}

    {values.recurringby>0 && <>
                <GridItem
                    xs="12"
                    md="4"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" style={{ marginBottom: "15px" }}>
                  
                   <h5 style={{ fontSize: "14px", marginBottom: "15px" }}>Select Recurring End Date</h5>
                   
                  </GridItem>
                  <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    <DatePicker
                      className="datepicker"
                     
                      disablePast
                      value={values.end_date_recurring}
                      format="dd/MM/yyyy"
                      onChange={(e) => handleDateChange("end_date_recurring", e)}
                      animateYearScrolling
                      id="end_date_recurring"
                    />

                  </GridItem>
        
                 <GridItem
                    xs="6"
                    sm="5"
                    md="3"
                    style={{ marginBottom: "15px" }}
                  >
                    
                </GridItem> </>}
{/* ddddddddddddddddddddaaaaaaaaaaaaaaaaaaaateeeeeeeeeeeeeeeeeeeeeeeeeeee*/}

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
                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
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

                  <GridItem
                    xs="12"
                    sm="5"
                    md="3"
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
                      data={activitylist}
                      value={values.activity}
                      onChange={handleChange}
                      id="activity"
                    />
                    {/* {console.log(values.activity,'gggggg')} */}
                     {/* <ItemPicker
                      data={locations}
                      value={values.location}
                      onChange={handleChange}
                      id="location"

                    /> */}
                    {console.log(values.activity,"values.activity")}
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

                  
                  {Number(values.activity) == 0 && (
                   
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
          <UpcomingActivities fetchupcomingactivity={fetchupcoming} />
        </GridItem>
      </GridContainer>

      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};


