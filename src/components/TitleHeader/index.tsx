import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { titleStyle } from "./styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(titleStyle as any);

export default function TitleHeader() {
  const classes = useStyles();

  return (
    <div className="sectionSpacer">
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Box textAlign="center" className={classes.titleHolder}>
              <h4 className={classes.titleSubHeader}>Featured Listing</h4>
              <h2 className={classes.titleHeader}>Top Sports Clubs</h2>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
