import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { bannerStyle } from "./styles";
import Container from "@material-ui/core/Container";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(bannerStyle as any);

export default function Banner() {
  const classes = useStyles();
  let location = useLocation<any>();

  // const[name,setName] = useState()

  return (
    <div className={classes.banner}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <h1>Activity Calendar</h1>
            <h2>{location && location.state.name}</h2>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.bannerPattren}>
        <img src={grungePattren} alt="pattren" />
      </div>
    </div>
  );
}
