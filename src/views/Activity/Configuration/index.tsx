import React from "react";
import { GridContainer } from "@cenera/components/Grid";
import Grid from "@material-ui/core/Grid";
import { Card, CardBody } from "@cenera/components/Card";
import { makeStyles } from "@material-ui/core";
import { styles } from "./configurationStyles";
// import { Button } from "@cenera/components/Button/Button";
// import Checkbox from "@material-ui/core/Checkbox";

import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#0079BC",
      color: theme.palette.common.white,
      textTransform: "uppercase",
    },
    body: {
      fontSize: 14,
    },

    row: {
      fontSize: 0,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white,
    },
  })
)(TableRow);

const BodyTableCell = withStyles(() =>
  createStyles({
    root: {
      color: "#767676",
    },
  })
)(TableCell);

function createData(
  startime: string,
  endtime: string,
  // duration: string,
  team: string,
  location: string,
  warderobe: string,
  activity: string
) {
  // return { startime, endtime, duration, team, location, warderobe, activity };
  return { startime, endtime, team, location, warderobe, activity };
}

const rows = [
  createData(
    "10:00am",
    "05:00am",
    // "2:00 hrs", for duration 
    "Art Boxing Club",
    "United Kingdom",
    "Ingen",
    "Training"
  ),
  createData(
    "10:00am",
    "05:00am",
    // "2:00 hrs",
    "Monaco",
    "Spain",
    "Ingen",
    "Training"
  ),
  createData(
    "10:00am",
    "05:00am",
    // "2:00 hrs",
    "Real Soccer",
    "Italy",
    "Ingen",
    "Training"
  ),
  createData(
    "Cupcake",
    "05:00am",
    // "2:00 hrs",
    "Oxigeno club",
    "Germany",
    "Ingen",
    "Match"
  ),
];

// function createDataExpand(
//   awayfield: string,
//   awaydata: string,
//   warderobefield: string,
//   warderobedata: string
// ) {
//   return { awayfield, awaydata, warderobefield, warderobedata };
// }

// const rowsexpand = [
//   createDataExpand("Away Team:", "Dataserver", "Warderobe B", "Room 2"),
//   createDataExpand("Referee:", "", "Warderobe C", "Room 3"),
// ];

const useStyles = makeStyles(styles as any);

const Configuration = () => {
  const classes = useStyles();
  return (
    <div className="parent">
    <GridContainer>
    </GridContainer>
    <div className={classes.Container}>
      <Card>
        {/* <CardHeader><h4>Locations</h4></CardHeader> */}
        <CardBody>
          <Grid container>
            <Grid item xs={12}>
              <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={8}>Locations</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.startime}>
                        <BodyTableCell scope="row">
                          {row.location}
                        </BodyTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {/* <div className="" style={{ textAlign: "center", paddingBottom: "40px" }}>
            <Button color="danger" style={{maxWidth: "100%"}}>Delete Selected Activities</Button>
          </div> */}
        </CardBody>
      </Card>
    </div>
  </div>
  )
}

export {Configuration}
