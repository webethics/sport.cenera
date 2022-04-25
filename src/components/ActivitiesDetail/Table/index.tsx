import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { blackColor, sectionSpacer } from "@cenera/common/styles/common-styles";
import dotpattrenV from "@cenera/assets/images/dotpattren-v.svg";
import Button from "@material-ui/core/Button";
import moment from "moment";

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

// function createData(
//   startime: string,
//   endtime: string,
//   duration: string,
//   team: string,
//   location: string,
//   warderobe: string,
//   activity: string
// ) {
//   return { startime, endtime, duration, team, location, warderobe, activity };
//   // return { startime, endtime, team, location, warderobe, activity };
// }

// const rows = [
//   createData(
//     "12:00",
//     "14:00",
//     "2:00",
//     "Art Boxing Club",
//     "United Kingdom",
//     "Ingen",
//     "Training"
//   ),
//   createData("16:00", "17:00", "1:00", "Monaco", "Spain", "Ingen", "Training"),
//   createData(
//     "17:00",
//     "19:00",
//     "2:00",
//     "Real Soccer",
//     "Italy",
//     "Ingen",
//     "Training"
//   ),
//   createData(
//     "19:00",
//     "21:00",
//     "2:00",
//     "Oxigeno club",
//     "Germany",
//     "Ingen",
//     "Match"
//   ),
// ];

function createDataExpand(
  awayfield: string,
  awaydata: string,
  warderobefield: string,
  warderobedata: string
) {
  return { awayfield, awaydata, warderobefield, warderobedata };
}

const rowsexpand = [
  createDataExpand("Away Team:", "Dataserver", "Warderobe B", "Room 2"),
  createDataExpand("Referee:", "", "Warderobe C", "Room 3"),
];

const useStyles = makeStyles({
  bgContainer: {
    position: "relative",
    zIndex: 1,
    "&:before": {
      content: '""',
      display: "block",
      backgroundImage: `url(${dotpattrenV})`,
      width: "94px",
      height: "324px",
      position: "absolute",
      top: "15%",
      left: "50px",
      zIndex: -1,
      "@media(max-width:767px)": {
        display: "none",
      },
    },
    "&:after": {
      content: '""',
      display: "block",
      backgroundImage: `url(${dotpattrenV})`,
      width: "94px",
      height: "324px",
      position: "absolute",
      bottom: "15%",
      right: "50px",
      zIndex: -1,
      "@media(max-width:767px)": {
        display: "none",
      },
    },
  },

  Container: {
    "@media (min-width: 1280px)": {
      maxWidth: "1392px",
    },
  },

  tableContainer: {
    ...sectionSpacer,
  },
  table: {
    minWidth: 700,
    "& td": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "#484848",
      "@media(max-width:767px)": {
        whiteSpace: "nowrap",
        padding: "10px",
        fontSize: "10px",
      },
    },
    "& th": {
      "@media(max-width:767px)": {
        whiteSpace: "nowrap",
        padding: "10px 5px",
        fontSize: "10px",
      },
    },
  },

  label: {
    fontWeight: "bold",
    color: blackColor,
  },
  customeTableRow: {
    "& th": {
      backgroundColor: "#F7F5F5",
      color: blackColor,
    },
    "& td": {
      backgroundColor: "#F7F5F5",
      color: blackColor,
      fontWeight: "500",
      lineHeight: "1.5rem",
    },
  },

  topTableRow: {
    backgroundColor: "#0079BC",
    textTransform: "uppercase",
    "& td": {
      backgroundColor: "#0079BC",
      textTransform: "uppercase",
      color: "#ffffff",
      fontWeight: "500",
    },
  },
  matched: {
    fontWeight: 500,
    color: "#0079BC",
  },
  bottomTableRow: {
    "& td": {
      border: "none",
    },
  },
});

export default function CustomizedTables({
  activityList,
}: {
  activityList: any;
}) {
  console.log(activityList,'list');

  const duraiton = (t1:any, t2:any) => {
    let a = moment(t1);
    let b = moment(t2);

    const milliseconds =  b.diff(a);
    const  minutes =  (milliseconds / (1000*60)) % 60;
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return  `${hours}:${minutes} h`
    
  }

  const  showDuration = (start:string,end:string) =>{
    let startDate = moment(start).format("YYYY-MM-DD");
    let endDate = moment(end).format("YYYY-MM-DD");

    let endTime=moment(end).format("HH:mm");
    let finalEndTime = moment(startDate + " " + endTime);
    
    if(startDate===endDate){
     return  duraiton(start,end)
    }else{
     return duraiton(start,finalEndTime)
    }
                                  
  }



  const classes = useStyles();
  return (
    <div className={classes.bgContainer}>
      <Container className={classes.Container}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              {activityList.map((res: any) => (
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={7}>
                        Monday march 01, 2022
                      </StyledTableCell>
                    </TableRow>
                    <TableRow className={classes.customeTableRow}>
                      <StyledTableCell>Start Time</StyledTableCell>
                      <StyledTableCell align="left">End Time</StyledTableCell>
                      <StyledTableCell align="left">Duration</StyledTableCell>

                      <StyledTableCell align="left">Team</StyledTableCell>
                      <StyledTableCell align="left">Location</StyledTableCell>
                      <StyledTableCell align="left">Warderobe</StyledTableCell>
                      <StyledTableCell align="left">Activity</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
               
                      <StyledTableRow>
                        <BodyTableCell scope="row">
                          {moment(res.startTime).format("HH:mm")}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {moment(res.endTime).format("HH:mm")}
                        </BodyTableCell> 
                        <BodyTableCell align="left">{showDuration(res.startTime,res.endTime)}</BodyTableCell>
                        <BodyTableCell align="left">{res.team} {res.team_text}</BodyTableCell>
                        <BodyTableCell align="left">
                           {res.location_name}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                           {res.wardrobe_name}
                        </BodyTableCell>
                        <BodyTableCell
                          className={`${res.activity === "Match" &&
                            classes.matched}`}
                          align="left"
                        >
                          {res.activity_type_name}
                        </BodyTableCell>
                      </StyledTableRow>
             
                    {rowsexpand.map((row) => (
                      <StyledTableRow
                        className={classes.bottomTableRow}
                        key={row.awayfield}
                      >
                        <BodyTableCell scope="row"></BodyTableCell>
                        <BodyTableCell align="left"></BodyTableCell>
                        <BodyTableCell className={classes.label} align="left">
                          {row.awayfield}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {row.awaydata}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {row.warderobefield}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {row.warderobedata}
                        </BodyTableCell>
                        {/* <BodyTableCell align="left"></BodyTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}
            </TableContainer>
          </Grid>
        </Grid>
        <div
          className=""
          style={{ textAlign: "center", paddingBottom: "40px" }}
        >
          <Button
            variant="text"
            style={{
              backgroundColor: "#0079BC",
              color: "#ffffff",
              width: "150px",
              maxWidth: "100%",
            }}
          >
            See More
          </Button>
        </div>
      </Container>
    </div>
  );
}
