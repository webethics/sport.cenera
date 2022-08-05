import React  from "react";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { landingStyle } from "./styles";
// import Container from "@material-ui/core/Container";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import login from "@cenera/assets/images/login.png";
import club from "@cenera/assets/images/club.png";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const useStyles = makeStyles(landingStyle as any);

export default function Landinglist() {

  const classes = useStyles();

  return (
    <div className={`${classes.listing} ${classes.homebanner}`}>
        <div className={classes.loginsection}>
            <div className={classes.loginsectionbox} >
              <img src={login} alt="login" className={classes.loginimg}/>
              <Box textAlign="center"  sx={{ width: '100%' }}>
              <Link
                  to='/login'>
                <Button variant="contained" className={classes.loginbutton}>Login</Button>
                </Link>
              </Box>
              </div>
        </div>
      <div className={classes.loginsection}>
          <div className={classes.loginsectionbox}>
              <img src={club} alt="club" className={classes.loginimg} />
              <Box textAlign="center"  sx={{ width: '100%' }}>
              <Link to='/booking'>
                <Button variant="contained" className={classes.loginbutton}>Clubs</Button>
                </Link>
              </Box>
              </div>
          </div>
    </div>
  );
}
