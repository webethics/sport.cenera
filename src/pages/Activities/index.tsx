import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import logo from "@cenera/assets/images/logo-frontend.png";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";
import Banner from "@cenera/components/Activities/Banner";
import Listing from "@cenera/components/Activities/Listing";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { activitiesPageStyle } from "./styles";
import TitleHeader from "@cenera/components/TitleHeader";
import { Link } from "react-router-dom";

const useStyles = makeStyles(activitiesPageStyle as any);

export default function Activities() {
  const classes = useStyles();

  return (
    <>
      <Box bgcolor="primary.contrastText">
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
        <TitleHeader />
        <Listing />
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
