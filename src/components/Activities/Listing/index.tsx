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
import Clubimag1 from "@cenera/assets/images/clubimg1.png";
import Clubimag2 from "@cenera/assets/images/clubimg2.png";
import Clubimag3 from "@cenera/assets/images/clubimg3.png";
import Clubimag4 from "@cenera/assets/images/clubimg4.png";
import Clubimag5 from "@cenera/assets/images/clubimg5.png";
import Clubimag6 from "@cenera/assets/images/clubimg6.png";
import Clubimag7 from "@cenera/assets/images/clubimg7.png";
import Clubimag8 from "@cenera/assets/images/clubimg8.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles(listingStyle as any);

export default function Listing() {
  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <Container className={classes.listingContainer}>
        <Grid container alignItems="center" spacing={5}>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag1} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Oxigeno club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag2} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Football club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag3} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Basketball club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag4} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Real soccer
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag5} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Hockey club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag6} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Art Boxing Club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag7} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Sporty club
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link to="/activitiesdetail">
                  <CardMedia className={classes.media} image={Clubimag8} title="Club Image" />
                  <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                      Tennis Academy
                    </Typography>
                    <Typography className={classes.cardDecription} variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dui, bibendum eget vulputate purus gravida pharetra
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
