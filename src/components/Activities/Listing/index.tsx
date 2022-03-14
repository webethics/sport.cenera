import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { listingStyle } from "./styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import SportClub from './sportsClubData';
import { Link } from "react-router-dom";

const useStyles = makeStyles(listingStyle as any);

export default function Listing() {
  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <Container className={classes.listingContainer}>
        <Grid container alignItems="center" spacing={5}>
          {
            SportClub && SportClub.sort((a:any,b:any)=>a.club.localeCompare(b.club)).map((res, index)=>(
            <Grid item lg={3} md={4} sm={6} key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia
                    className={classes.media}
                    image={res.clubImage}
                    title="Club Image"
                  />
                  <CardContent>
                    <Typography
                      className={classes.cardTitle}
                      gutterBottom
                      variant="h6"
                      component="h2"
                    >
                     {res.club}
                    </Typography>
                    <Typography
                      className={classes.cardDecription}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                     {res.clubDescription}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          ))
}
        </Grid>
      </Container>
    </div>
  );
}
