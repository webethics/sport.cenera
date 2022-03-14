import React, { useEffect, useState } from "react";
// import { GridContainer } from "@cenera/components/Grid";
import Grid from "@material-ui/core/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { makeStyles } from "@material-ui/core";
import { styles } from "./styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Button } from "@cenera/components/Button/Button";
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import EditActivityModal from "./EditActivityModal";
import Checkbox from "@material-ui/core/Checkbox";

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Filters from "./filters";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#0079BC",
      color: theme.palette.common.white,
      textTransform: "uppercase",
      whiteSpace: "nowrap",
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
      whiteSpace: "nowrap",
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

function createDataExpand(awayfield: string, awaydata: string, warderobefield: string, warderobedata: string) {
  return { awayfield, awaydata, warderobefield, warderobedata };
}

const rowsexpand = [createDataExpand("Away Team:", "Dataserver", "Warderobe B", "Room 2"), createDataExpand("Referee:", "", "Warderobe C", "Room 3")];

// const useStyles = makeStyles({

// });

const useStyles = makeStyles(styles as any);

const UpcomingActivities = () => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [modalshow, setModalshow] = useState(false);
  const [activityIdForEdit, setActivityIdForEdit] = useState<number | null>(null);
  const [activityIdForDelete, setActivityIdForDelete] = useState(null);
  const [bookedList, setBookedList] = useState([]);

  const deleteActivity = () => {
    setDeleting(true);
    console.log("Deleting");

    setTimeout(() => {
      setDeleting(false);
      console.log("activity deleted", "id", activityIdForDelete);
    }, 2000);
  };

  const { alert, showConfirmDialog } = useShowConfirmDialog({
    onDeleteConfirmed: deleteActivity,
    successMessage: "Activity deleted successfully",
    confirmMessage: "Activity will be deleted for good!",
  });

  const handleEditActivity = (id: number) => {
    setActivityIdForEdit(id);
    setModalshow(true);
  };

  const upcomingBookins = [
    {
      id: 1,
      team: "teamA",
      start: "20 march 2022 2:10 pm ",
      end: "20 march 2022 2:10 pm",
      location: "new york",
      Warderobe: "mens room 1",
      activity: "training",
    },
    {
      id: 2,
      team: "teamb",
      start: "23 march 2022 2:10 pm ",
      end: "21 march 2022 2:10 pm",
      location: "california",
      Warderobe: "new warderobe",
      activity: "match",
    },
    {
      id: 3,
      team: "teamA",
      start: "26 april 2022 2:10 pm ",
      end: "26 april 2022 5:10 pm",
      location: "new jersy",
      Warderobe: "new room",
      activity: "maintenance",
    },
    {
      id: 4,
      team: "teamb",
      start: "28 april 2022 2:10 pm ",
      end: "28 april 2022 1:10 pm",
      location: "tokyo",
      Warderobe: "room 2 box",
      activity: "training",
    },
    {
      id: 5,
      team: "teamb",
      start: "15 jan 2022 2:10 pm ",
      end: "15 jan May 2022 2:10 pm",
      location: "torronto",
      Warderobe: "men room 4",
      activity: "match",
    },
  ];

  useEffect(() => {
    const newArr = upcomingBookins.map((res) => {
      return { ...res, checked: false };
    });
    setBookedList(newArr);
  }, []);

  const handleCheckBox = (e: any) => {
    const temp = [...bookedList];
    temp.map((res, index) => {
      if (res.id == e.target.name) {
        temp[index].checked = e.target.checked;
      }
    });
    setBookedList(temp);

    const newArr = [...bookedList];
    const itemToBeDelte = newArr.filter((response) => response.checked === true);
    setActivityIdForDelete(itemToBeDelte);
  };

  const handleDeleteAll = () => {
    showConfirmDialog();
  };

  console.log("lll", activityIdForDelete);

  return (
    <div className="parent">
      {alert}
      <Backdrop className={classes.backdrop} open={deleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <EditActivityModal open={modalshow} onClose={() => setModalshow(false)} activityId={activityIdForEdit} />

      <Card>
        <CardHeader>
          <h4>Upcoming Activities</h4>
        </CardHeader>

        <CardBody>
          <Grid container>
            <Grid item xs={12}>
              <Filters />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={8}>Monday march 01, 2022</StyledTableCell>
                    </TableRow>
                    <TableRow className={classes.customeTableRow}>
                      {/* <StyledTableCell align="left">Duration</StyledTableCell> */}
                      <StyledTableCell>Start time</StyledTableCell>
                      <StyledTableCell align="left">End Time</StyledTableCell>

                      <StyledTableCell align="left">Team</StyledTableCell>
                      <StyledTableCell align="left">Location</StyledTableCell>
                      <StyledTableCell align="left">Warderobe</StyledTableCell>
                      <StyledTableCell align="left">Activity</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.startime}>
                        <BodyTableCell scope="row">{row.startime}</BodyTableCell>
                        <BodyTableCell align="left">{row.endtime}</BodyTableCell>

                        <BodyTableCell align="left">{row.team}</BodyTableCell>
                        <BodyTableCell align="left">{row.location}</BodyTableCell>
                        <BodyTableCell align="left">{row.warderobe}</BodyTableCell>
                        <BodyTableCell className={`${row.activity === "Match" && classes.matched}`} align="left">
                          {row.activity}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          <Button
                            color="info"
                            style={{
                              maxWidth: "100%",
                              margin: "auto",
                              display: "block",
                            }}
                            onClick={() => handleEditActivity(1)}
                          >
                            Edit
                          </Button>
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          <Checkbox style={{ color: "#00acc1" }} onChange={handleCheckBox} />
                        </BodyTableCell>
                      </StyledTableRow>
                    ))}
                    {rowsexpand.map((row) => (
                      <StyledTableRow className={classes.bottomTableRow} key={row.awayfield}>
                        <BodyTableCell scope="row"></BodyTableCell>
                        <BodyTableCell align="left"></BodyTableCell>
                        <BodyTableCell className={classes.label} align="left">
                          {row.awayfield}
                        </BodyTableCell>
                        <BodyTableCell align="left">{row.awaydata}</BodyTableCell>
                        <BodyTableCell align="left">{row.warderobefield}</BodyTableCell>
                        <BodyTableCell align="left">{row.warderobedata}</BodyTableCell>
                        {/* <BodyTableCell align="left"></BodyTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {/* <div className="" style={{ textAlign: "center", paddingBottom: "40px" }}>
              <Button variant="text" style={{backgroundColor: "#0079BC", color: "#ffffff", width: "150px", maxWidth: "100%"}}>See More</Button>
            </div> */}
          <div className="" style={{ textAlign: "center", paddingBottom: "40px" }}>
            <Button color="danger" style={{ maxWidth: "100%" }} onclick={handleDeleteAll}>
              Delete Selected Activities
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpcomingActivities;
