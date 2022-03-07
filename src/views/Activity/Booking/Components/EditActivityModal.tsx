import * as React from 'react';
import { Modal,Box , makeStyles , CircularProgress, Backdrop} from "@material-ui/core";
import { useFormik } from "formik";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { Button } from "@cenera/components/Button/Button";
import { styles } from "./../styles";
import {modalStyle} from "./styles"
import ItemPicker from "./ItemPicker";
import { DatePicker, TimePicker  } from "@material-ui/pickers";
import { TextField,Divider} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'; 

const useStyles = makeStyles(styles as any);

export default function EditActivityModal(props:any) {

 console.log(props.activityId);
 const classes = useStyles();
 const [selectedDate, SetselectedDate] = React.useState(new Date());

  
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
    team: "teamB",
    start_date: selectedDate,
    start_time: selectedDate,
    end_date: selectedDate,
    end_time: selectedDate,
    location: "Torronto",
    warderobe: "wardrobe 2",
    activity: "Training",
    description: "this is simple description",
    away_team: "",
    away_team_wardrobe: "wardrobe 2", 
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

  const { values, handleChange } = formik;

  const teamsdata = [{ name: "teamA" }, { name: "teamB" }];
  const locationdata = [{ name: "New york" }, { name: "Torronto" }];
  const wardrobe = [{ name: "wardrobe 1" }, { name: "wardrobe 2" }];
  const activitydata = [{ name: "Match" }, { name: "Training" }, {name: "Maintenance"}];

  return (
    <div>
      <Modal {...props} >   
        <Box sx={modalStyle}>
          {/* {showDropDown? (teamsList && <Teampicker teamList={teamsList} onChange={handleTeamChange} value={teamId} id={'test'} /> ): ""} */}
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}><h4>Edit Activity</h4><CloseIcon style={{cursor:"pointer"}} onClick={()=>props.onClose()} /></Box> 
            <Divider style={{width:'100%' , marginBottom:"15px"}} />
         
              <form onSubmit={formik.handleSubmit}>
                <GridContainer >
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
                      id="team"
                    />
                  </GridItem>
                  <GridItem
                    xs="12"
                    md="7"
                    style={{ marginBottom: "15px" }}
                  ></GridItem>
                  <GridItem xs="12" sm="2" sx={{ mb: 3 }}>
                    <h5 style={{ fontSize: "14px" }}>Start</h5>
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
                    <h5 style={{ fontSize: "14px" }}>End</h5>
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
                     <Divider style={{width:'100%' , marginBottom:"15px" , marginTop: "15px"}} />
                      <GridItem xs="12" sm="2" style={{ marginBottom: "15px"}}>
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
                      <Divider style={{width:'100%' , marginBottom:"15px"}} />
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
                    Edit Activity
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
      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}