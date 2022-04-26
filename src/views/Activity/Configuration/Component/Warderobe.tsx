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
import {useFormik} from "formik"
import { useFetchWardrobes} from "@cenera/common/hooks/api-hooks/activity";
import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import * as Yup from "yup";


  
const useStyles = makeStyles(configurationStyle as any);

const Warderobe = () => {

    const classes = useStyles();
    const [appState] = useAppContext();
    const { enqueueSnackbar } = useSnackbar();
    const {Wardrobesdata, loading,error,revalidate}   = useFetchWardrobes();
    const {createWardrobes,deleteWardrobes} = ActivityService;
    const [adding , setAdding] = useState(false)
    const [deleteConfig, setDeleteConfig] = useState(false);

    const [warderobe, setWarderobe] = useState([]);


      const addWardrobes = async(values:any)=>{
        setAdding(true)
        try{
          let WardrobesAdded = warderobe.some(res=>res.wardrobe_name===values.warderobe)

          if(!WardrobesAdded){
            const resposne = await createWardrobes(appState.authentication.accessToken,appState.user.club_id,values.warderobe)
          
            if(resposne.data.message){
              await revalidate();

              setAdding(false)
              formik.setValues({warderobe: ""});
              enqueueSnackbar("Wardrobes Added Successfully",  { variant: 'success' })
   
            }
          }else{
            enqueueSnackbar("Wardrobes Already Exist",  { variant: 'warning' })
            setAdding(false)
          }
        }catch(err){
          setAdding(false)
          enqueueSnackbar(err, { variant: 'error' })
        }
      }


      const handleDelete = async(wardrobe_id:any) => {
        // console.log(wardrobe_id,'delete')
        setDeleteConfig(true)
           try{
          const response = await deleteWardrobes(appState.authentication.accessToken,appState.user.club_id,wardrobe_id[0])
          
          if(response){
            await revalidate();
            enqueueSnackbar("Wardrobes Deleted Successfully",  { variant: 'success' })
            setDeleteConfig(false)
  
          }
        }catch(err){
          enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
          setDeleteConfig(false)
        }
   
     };



      const { alert, showConfirmDialog } = useShowConfirmDialog({
        onDeleteConfirmed: (id)=>{
            handleDelete(id)

        },
        successMessage: "Wardrobe deleted successfully",
        confirmMessage: "Wardrobe will be deleted for good!",
      });

    
      const formik = useFormik({
        initialValues: { warderobe: "" },
        validationSchema: Yup.object({
          warderobe: Yup.string()
           
            .required("Wardrobe is required"),
        }),
        onSubmit: async(values:any,{resetForm}) => {
          addWardrobes(values)
          resetForm({values:""})
          
        },
      });
     
      useEffect(()=>{
        if(Wardrobesdata){
          setWarderobe(Wardrobesdata)
        }else if(error){
         enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
        }
      },[Wardrobesdata])
     
    const { values, handleChange, handleSubmit ,errors,touched} = formik;


  return (
      <>
    
        <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3">
                    Warderobe
                  </Typography>
                  <List>
                    {warderobe.map((res: { wardrobe_id: number; wardrobe_name: string }) => (
                      <ListItem className={classes.listItem} key={res.wardrobe_id}>
                        <ListItemIcon className={classes.listIcon}>
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.listItemText}>
                          {res.wardrobe_name}
                        </ListItemText>
                        <DeleteOutlineIcon 
                        className = {classes.deleteButton}
                        onClick={() => showConfirmDialog(res.wardrobe_id)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <TextField
                    margin="dense"
                    id="warderobe"
                    label="Add New Warderobe"
                    variant="outlined"
                    value={values.warderobe}
                    onChange={handleChange}
                  />
                  {errors.warderobe && touched.warderobe && <span className={classes.errorColor}>{errors.warderobe}</span>}
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: "#00ACC1" }}
                  >
                    Add Warderobe
                  </Button>
                </CardActions>
              </Card>
            </Paper>
    </form>
    {alert} 
      <Backdrop className={classes.backdrop} open={deleteConfig ||loading || adding}>
        <CircularProgress color="inherit" />
      </Backdrop>
  </>
  )
}

export default Warderobe