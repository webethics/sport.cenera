import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { listingStyle } from "./styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ActivityService } from "@cenera/services/api/activity";

const useStyles = makeStyles(listingStyle as any);

export default function Listing() {
  const { GetPublicClubs } = ActivityService;
  const [publicClubs, setPublicClubs] = useState([]);
  const [loading , setLoading] = useState(false);

  const fetchPublicClubs = async () => {
    setLoading(true);
    const { data } = await GetPublicClubs();
    if (data) {
      setLoading(false);
      setPublicClubs(data);
    }
  };


  useEffect(() => {
    fetchPublicClubs();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <Container className={classes.listingContainer}>
        <Grid container alignItems="center" spacing={5}>
          {publicClubs &&
            publicClubs.map((res) => (
              <Grid item lg={3} md={4} sm={6} key={res.club_id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <Link to={`/activitiesdetail/${res.club_id}/${res.club_name}`}>
                      <CardMedia
                        className={classes.media}
                        image={
                          `${process.env.REACT_APP_SERVER_IMAGE_URL}`+res.club_image
                        }
                        title="Club Image"
                      />
                      <CardContent>
                        <Typography
                          className={classes.cardTitle}
                          gutterBottom
                          variant="h6"
                          component="h2"
                        >
                          {res.club_name}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
       <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
