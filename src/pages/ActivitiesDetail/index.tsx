import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import logo from "@cenera/assets/images/logo-frontend.png";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";
import Banner from "@cenera/components/ActivitiesDetail/Banner";
import Table from "@cenera/components/ActivitiesDetail/Table";
import Filters from "@cenera/components/ActivitiesDetail/Filters";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { activitiesDetailStyle } from "./styles";

const useStyles = makeStyles(activitiesDetailStyle as any);

export default function ActivitiesDetail() {
  const classes = useStyles();

  return (
    <>
      <Box bgcolor="primary.contrastText" className={classes.wrapper}>
        <AppBar position="static" className={classes.appbar}>
          <Box className={classes.justifyContentCenter}>
            <div className={classes.logoHolder}>
              <img src={logo} alt="Logo" />
            </div>
          </Box>
          <div className={classes.headerPattren}>
            <img src={grungePattren} alt="pattren" />
          </div>
        </AppBar>
        <Banner />
        <Filters />
        <Table />
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
    </>
  );
}
