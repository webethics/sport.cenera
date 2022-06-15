import React, { useEffect } from "react";
import {
  Modal,
  makeStyles,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { editLocation } from "../../Booking/Components/styles";
import { styles } from "../../Booking/styles";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@mui/material/Box";
import { ActivityService } from "@cenera/services/api/activity";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { Button } from "@cenera/components/Button/Button";
import { TextField, Divider } from "@material-ui/core";
import { useFormik } from "formik";
import { useAppContext } from "@cenera/app-context";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
const useStyles = makeStyles(styles as any);

export default function Editlocation(props: any) {

  console.log(props.locationname,"propsssssssss")
    const { enqueueSnackbar } = useSnackbar();
    const [appState] = useAppContext();
    const locationid = props.locationnameid;
    const { ChangeLocation } = ActivityService;
    console.log(ChangeLocation,"ChangeLocationChangeLocation",locationid)
    const classes = useStyles();
    const initialFormValues:any = {
     location: ""
    };
  
    const formik = useFormik({
      initialValues: initialFormValues,
      validationSchema: Yup.object({
        location: Yup.string()
          .matches(/[a-z]/, "only letters not allowed")
          .required("Location is Required"),
      }),
      onSubmit: async (formValues) => {
        
          const response = await ChangeLocation(
            appState.authentication.accessToken,
            appState.user.club_id,
            formValues.location,
            locationid,
          );
          if (response) {
            props.onClose();
            props.callupcoming(props.locationname);
            enqueueSnackbar("Location Edited Successfully", {
              variant: "success",
            });
          } else {
            enqueueSnackbar("err", { variant: "error" });
          }
         
        //  console.log(response,"okk")
      },
    });

    useEffect(() => {
      formik.setValues({...formik.values,location: props.locationname });
       
    }, [props]);

    const { values, handleChange,errors, touched } = formik;
  return (
    <div>
      <Modal {...props}>
        <Box sx={editLocation}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit Location</h4>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => props.onClose()}
            />
          </Box>
          <Divider style={{ width: "100%", marginBottom: "15px" }} />

          <form>
            <GridContainer>
              <GridItem xs="12" sm="2" md="4" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Location</h5>
              </GridItem>
              <GridItem xs="12" sm="10" md="8" style={{ marginBottom: "15px" }}>
                <TextField
                  className="desc_box"
                  id="location"
                  variant="outlined"
                  value={values.location}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
                {errors.location && touched.location && (
                <span className={classes.errorColor} style={{color:"red"}}>{errors.location}</span>
              )}
              </GridItem>
            </GridContainer>

            <div className={`btn-wrap ${classes.editBtnContainer}`}>
              <Button
                color="info"
                className={classes.editLocationBtn}
                type="button"
                onClick={formik.handleSubmit}
              >
                Edit Location
              </Button>
            </div>
          </form>
          <Backdrop
            className={classes.backdrop}
            open={false}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
