import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import logo from "@cenera/assets/images/logo-frontend.png";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";
import Banner from "@cenera/components/ActivitiesDetail/Banner";
import Table from "@cenera/components/ActivitiesDetail/Table";
import Filters from "@cenera/components/ActivitiesDetail/Filters";
import Grid from "@material-ui/core/Grid";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { activitiesDetailStyle } from "./styles";
import { Link ,useParams} from "react-router-dom";
import { useFetchGetActivites} from "@cenera/common/hooks/api-hooks/activity";


const useStyles = makeStyles(activitiesDetailStyle as any);

export default function ActivitiesDetail() {
  
  const classes = useStyles();
  const {id} = useParams<any>();
  const {acitivityData,loading,revalidate,error} = useFetchGetActivites({"club_id":id}); 
  const [activityList , setActivityList] = useState(null);

 
   useEffect(() => {
    if(acitivityData){
      setActivityList(acitivityData);
    }
   
   },[acitivityData,loading,revalidate,error])

   console.log(activityList);

  return (
    <>
      <Box bgcolor="primary.contrastText" className={classes.wrapper}>
        <AppBar position="static" className={classes.appbar}>
          <Box className={classes.justifyContentCenter}>
            <div className={classes.logoHolder}>
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
          </Box>
          <div className={classes.headerPattren}>
            <img src={grungePattren} alt="pattren" />
          </div>
        </AppBar>
        <Banner />

        
        {activityList && activityList.length>0 &&
        (<>
         <Filters onFilter={(res:any)=>{
           console.log(res);
         }} />
         <Table activityList={activityList} /> 
        </>) }

         {activityList && activityList.length<1 && "No Activity Found"}
        
      
        
        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs={12}>
              <Box color="white" textAlign="center">
                © Copyright 2022 CENERA SPORTS
              </Box>
            </Grid>
          </Grid>
        </footer>
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
