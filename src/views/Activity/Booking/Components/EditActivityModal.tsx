import React, { useEffect , useState } from "react";
import axios from "axios"
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
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { TextField, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(styles as any);

export default function EditActivityModal(props: any) {
  const classes = useStyles();
  const [selectedDate, SetselectedDate] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();

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

 
  const editActivityData = async ()=>{
   await  axios.get(`https://61ad9197d228a9001703ae3b.mockapi.io/detail/${props.activityId}`)
    .then(res=>{
      if(res.data){
        formik.setValues(res.data)
      }
    })
  }

    const initialFormValues = {
      team:  "",
      orTeam: "",
      start_date:  selectedDate,
      start_time:   selectedDate,
      end_date:selectedDate,
      end_time: selectedDate,
      location: "",
      warderobe: "",
      extWarBef15:  false,
      extWarBef30:  false,
      extWarAf15:   false,
      extWarAf30:  false,
      activity: "",
      description:  "",
      away_team:"",
      away_team_wardrobe: "",
      referee_wardrobe:"",
    };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (formValues) => {

        await axios.put(`https://61ad9197d228a9001703ae3b.mockapi.io/detail/${props.activityId}` , {...formValues})
         .then(res=>{
           if(res.data){
            props.onClose();
            enqueueSnackbar("Activity Edited Successfully",  { variant: 'success' })
            props.callUpcomingActivity();
           }
         }).catch(err=>{
          enqueueSnackbar(err,  { variant: 'error' })
         })
    }
  });
 
  const teamsdata = [{ name: "teamA" }, { name: "teamB" }];
  const locationdata = [{ name: "New york" }, { name: "Torronto" }];
  const wardrobe = [{ name: "wardrobe 1" }, { name: "wardrobe 2" }];
  const activitydata = [
    { name: "Match" },
    { name: "Training" },
    { name: "Maintenance" },
  ];

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

  useEffect(()=>{
    editActivityData();
  },[props.activityId])

  const { values, handleChange } = formik;

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
                  data={teamsdata}
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
              </GridItem>
              <GridItem xs="6" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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
              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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

              <GridItem xs="12" sm="5" md="3" style={{ marginBottom: "15px" }}>
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

              {values.activity == "Match" && (
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
                      data={wardrobe}
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
