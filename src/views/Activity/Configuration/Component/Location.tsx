import React, { useState, useEffect } from "react";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { configurationStyle } from "../configurationStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useFetchGetLocations } from "@cenera/common/hooks/api-hooks/activity";
import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import * as Yup from "yup";

const useStyles = makeStyles(configurationStyle as any);

const Location = () => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const {locationData, loading,error,revalidate}   = useFetchGetLocations();
  const {UpdateLocation,deleteLocation} = ActivityService;

  const [deleteConfig, setDeleteConfig] = useState(false);
  const [adding , setAdding] = useState(false)
  const [locations, setLocations] = useState([]);


  const handleDelete = async (location_id:any) => {
    console.log(location_id)
     setDeleteConfig(true)
      try{
        const response = await deleteLocation(appState.authentication.accessToken,appState.user.club_id,location_id[0])
        if(response){
          await revalidate();
          enqueueSnackbar("Location Deleted Successfully",  { variant: 'success' })
          setDeleteConfig(false)

        }
      }catch(err){
        enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
        setDeleteConfig(false)
      }
  };


  const addLocation = async(values:any)=>{
    setAdding(true)
    try{
      let isLocationAdded = locations.some(res=>res.location_name===values.location)
      if(!isLocationAdded){
        const resposne = await UpdateLocation(appState.authentication.accessToken,appState.user.club_id,values.location)
        if(resposne.data.message){
          await revalidate();
          setAdding(false)
          enqueueSnackbar("Location Added Successfully",  { variant: 'success' })
        }
      }else{
        enqueueSnackbar("Location Already Exist",  { variant: 'warning' })
        setAdding(false)
      }
    }catch(err){
      setAdding(false)
      enqueueSnackbar(err, { variant: 'error' })
    }
  }



  const { alert, showConfirmDialog } = useShowConfirmDialog({
    onDeleteConfirmed: (id)=>{
        handleDelete(id)
    },
    successMessage: "Location deleted successfully",
    confirmMessage: "Location will be deleted for good!",
  });
  


  const formik = useFormik({
    initialValues: { location: "" },
    validationSchema: Yup.object({
      location: Yup.string()
        .matches(/[a-z]/, "only letters not allowed")
        .required("required"),
    }),
    onSubmit: async(values) => {
       addLocation(values)
    },
  });
   

   useEffect(()=>{
     if(locationData){
      setLocations(locationData)
     }else if(error){
      enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
     }
   },[locationData])


  const { values, handleChange, handleSubmit ,errors} = formik;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h3">
                Location
              </Typography>
              <List>
                {locations.map(res => (
                  <ListItem className={classes.listItem} key={res.location_id}>
                    <ListItemIcon className={classes.listIcon}>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.listItemText}>
                      {res.location_name}
                    </ListItemText>
                    <DeleteOutlineIcon
                      className={classes.deleteButton}
                      onClick={() => showConfirmDialog(res.location_id)}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <TextField
                margin="dense"
                id="location"
                label="Add New Location"
                variant="outlined"
                value={values.location}
                onChange={handleChange}
              />
              {errors.location && <span className={classes.errorColor}>{errors.location}</span>}
              <Button type="submit" variant="contained" color="secondary">
                Add Location
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </form>
      {alert}
      <Backdrop className={classes.backdrop} open={deleteConfig||loading || adding}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Location;
