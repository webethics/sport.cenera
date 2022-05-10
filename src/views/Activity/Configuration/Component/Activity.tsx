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
import {useFormik} from "formik"
import * as Yup from "yup";



  
const useStyles = makeStyles(configurationStyle as any);

const Activity = () => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    
    const [deleteConfig, setDeleteConfig] = useState(false);
    const [activity, setActivity] = useState([
        { id: 1, activity: "Match" },
        { id: 2, activity: "Birthday" },
        { id: 3, activity: "Training" },
      ]);
    


      const handleDelete = (id:any) => {
        setDeleteConfig(true)
        setTimeout(() => {
            setActivity(prev=>(prev.filter(res=>res.id !==id[0])))
           enqueueSnackbar("activity Deleted Successfully",  { variant: 'success' })
           setDeleteConfig(false)
        },1500)
   
     };

      const { alert, showConfirmDialog } = useShowConfirmDialog({
        onDeleteConfirmed: (id)=>{
            handleDelete(id)
        },
        successMessage: "activity deleted successfully",
        confirmMessage: "activity will be deleted for good!",
      });
    
  
    const formik = useFormik({
        initialValues:  {activity:""},
        validationSchema: Yup.object({
          activity:Yup.string().matches(/[a-z]/,"only letters not allowed").required("required"),
        }),
        onSubmit:(values)=>{
            const newactivity = {id:activity[activity.length-1].id+1 ,activity:values.activity}
            setActivity(prev=>([...prev,newactivity]))
        }
      })
    
      const {values, handleChange,handleSubmit} = formik;


  return (
      <>
    
        <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3">
                    Activity
                  </Typography>
                  <List>
                    {activity.map((res: { id: number; activity: string }) => (
                      <ListItem className={classes.listItem} key={res.id}>
                        <ListItemIcon className={classes.listIcon}>
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.listItemText}>
                          {res.activity}
                        </ListItemText>
                        <DeleteOutlineIcon 
                        className = {classes.deleteButton} 
                        onClick={() => showConfirmDialog(res.id)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <TextField
                    margin="dense"
                    id="activity"
                    label="Add New Activity"
                    variant="outlined"
                    value={values.activity}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    Add Activity
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
  )
}

export default Activity