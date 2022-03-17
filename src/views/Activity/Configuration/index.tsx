import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Location from "./Component/Location";
import Warderobe from "./Component/Warderobe";
import Activity from "./Component/Activity";

const Configuration = () => {
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <Location />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Warderobe />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Activity />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Configuration };
