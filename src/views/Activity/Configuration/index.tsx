import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { configurationStyle } from "./configurationStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(configurationStyle as any);

const Configuration = () => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3">
                    Location
                  </Typography>
                  <List>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        New York
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        France
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Jaipur
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Ajmer
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <TextField
                    margin="dense"
                    id="outlined-basic"
                    label="Add New Location"
                    variant="outlined"
                  />
                  <Button variant="contained" color="secondary">
                    Add Location
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3">
                    Warderobe
                  </Typography>
                  <List>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        New York
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        France
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Jaipur
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Ajmer
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <TextField
                    margin="dense"
                    id="outlined-basic"
                    label="Add New Warderobe"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: "#00ACC1" }}
                  >
                    Add Warderobe
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3">
                    Activity
                  </Typography>
                  <List>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        New York
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        France
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Jaipur
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listIcon}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.listItemText}>
                        Ajmer
                      </ListItemText>
                      <DeleteOutlineIcon />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <TextField
                    margin="dense"
                    id="outlined-basic"
                    label="Add New Activity"
                    variant="outlined"
                  />
                  <Button variant="contained" color="secondary">
                    Add Activity
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Configuration };
