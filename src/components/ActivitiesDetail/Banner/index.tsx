import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { bannerStyle } from "./styles";
import Container from "@material-ui/core/Container";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";

const useStyles = makeStyles(bannerStyle as any);

export default function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <h1>Activity Calendar</h1>
            <h2>Indian Ice Hockey</h2>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.bannerPattren}>
        <img src={grungePattren} alt="pattren" />
      </div>
    </div>
  );
}
