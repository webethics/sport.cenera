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
const useStyles = makeStyles(styles as any);

export default function Editwardrobe(props: any) {
    const wardrobename = props.wardrobenname;
    const wardrobeid = props.wardrobenameid;
    const [appState] = useAppContext();
    const { enqueueSnackbar } = useSnackbar();
  console.log(props.wardrobenname,"wardrobe")
  console.log(wardrobename,"nameeeee")
    const { updateWardrobes } = ActivityService;
    console.log(updateWardrobes,"ChangeLocationChangeLocation")
    const classes = useStyles();

    const initialFormValues:any = {
        wardrobe: ""
       };
    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: async (formValues) => {
    
            const response = await updateWardrobes(
              appState.authentication.accessToken,
              appState.user.club_id,
              wardrobeid,
              formValues.wardrobe
            );
            if (response) {
              props.onClose();
              enqueueSnackbar("Wardrobe Edited Successfully", {
                variant: "success",
              });
            } else {
              enqueueSnackbar("err", { variant: "error" });
            }
           
           console.log(response,"okk")
        },
      });
  
       useEffect(() => {
         formik.setValues({...formik.values,wardrobe: wardrobename });
         
       }, [wardrobename]);
  
      const { values ,handleChange } = formik;
  return (
    <div>
      <Modal {...props}>
        <Box sx={editLocation}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Edit Wardrobe</h4>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => props.onClose()}
            />
          </Box>
          <Divider style={{ width: "100%", marginBottom: "15px" }} />

          <form>
            <GridContainer>

              <GridItem xs="12" sm="2" md="4" style={{ marginBottom: "15px" }}>
                <h5 style={{ fontSize: "14px" }}>Wardrobe</h5>
              </GridItem>
              <GridItem xs="12" sm="10" md="8" style={{ marginBottom: "15px" }}>
                <TextField
                //   className="desc_box"
                  id="wardrobe"
                  variant="outlined"
                  value={values.wardrobe}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
                
              </GridItem>
            </GridContainer>

            <div className={`btn-wrap ${classes.editBtnContainer}`}>
              <Button
                color="info"
                className={classes.editLocationBtn}
                type="button"
                onClick={formik.handleSubmit}
              >
                Edit Wardrobe
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
