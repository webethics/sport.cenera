import React, { useState } from "react";
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
import * as Yup from "yup";


const useStyles = makeStyles(configurationStyle as any);

const Location = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [deleteConfig, setDeleteConfig] = useState(false);
  const [locations, setLocations] = useState([
    { id: 1, location: "New Jersy" },
    { id: 2, location: "tokyo" },
    { id: 3, location: "New York" },
  ]);


  const handleDelete = (id:any) => {
     setDeleteConfig(true)

     setTimeout(() => {
        setLocations(prev=>(prev.filter(res=>res.id !==id[0])))
        enqueueSnackbar("Location Deleted Successfully",  { variant: 'success' })
        setDeleteConfig(false)
     },1500)

  };

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
    onSubmit: (values) => {
      const newLocation = {id:locations[locations.length-1].id+1 ,location:values.location}
      setLocations(prev=>([...prev,newLocation]))
    },
  });

  console.log(formik);
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
                {locations.map((res: { id: number; location: string }) => (
                  <ListItem className={classes.listItem} key={res.id}>
                    <ListItemIcon className={classes.listIcon}>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.listItemText}>
                      {res.location}
                    </ListItemText>
                    <DeleteOutlineIcon
                      className={classes.deleteButton}
                      onClick={() => showConfirmDialog(res.id)}
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
      <Backdrop className={classes.backdrop} open={deleteConfig}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Location;
