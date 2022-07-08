import React, { useState, useEffect } from "react";
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
import { getFormatedData, getduraiton } from "@cenera/utils/services";
// import { color } from "@mui/system";
//,getFormatedReccuringDate,getduraiton

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
  const [newactivity, setNewactivity] = useState([]);

  const showDuration = (start: string, end: string) => {
    let startDate = moment(start).format("YYYY-MM-DD");
    let endDate = moment(end).format("YYYY-MM-DD");

    let endTime = moment(end).format("HH:mm");
    let finalEndTime = moment(startDate + " " + endTime);

    if (startDate === endDate) {
      return getduraiton(start, end);
    } else {
      return getduraiton(start, finalEndTime);
    }
  };

  const [numberofpage, setnumberofpage] = useState(5);

  useEffect(() => {
    if (activityList) {
      let temp = getFormatedData(activityList);
      setNewactivity(temp);
      setnumberofpage(5);
    }
  }, [activityList]);

  const Loadmorebtn = () => {
    setnumberofpage(numberofpage + 5);
  };

  const classes = useStyles();
  //
  const weekdays: any = [
    { eng: "Monday", norw: "Mandag" },
    { eng: "Tuesday", norw: "Tirsdag" },
    { eng: "Wednesday", norw: "Onsdag" },
    { eng: "Thursday", norw: "Torsdag" },
    { eng: "Friday", norw: "Fredag" },
    { eng: "Saturday", norw: "Lørdag" },
    { eng: "Sunday", norw: "Søndag" },
  ];

  const printnorwayformat = (date: any) => {
    let dateStr = date.toString();
    //console.log(dateStr.length, "datehere");

    let org_name = "";
    weekdays.forEach((res: any) => {
      //console.log(res.eng.length, "sssss");
      if (res.eng === dateStr) {
        //console.log(res.norw, "-----", dateStr);
        org_name = res.norw;
      }
    });

    return org_name;
  };
  //
  return (
    <div className={classes.bgContainer}>
      <Container className={classes.Container}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              className={`${classes.tableContainer}`}
            >
              {newactivity.slice(0, numberofpage).map((res: any) => (
                <Table
                  className={`${classes.table} table-layout-fixed`}
                  aria-label="customized table "
                >
                  {console.log(res, "res")}
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={6}>
                        <span style={{ paddingRight: "12px" }}>
                          {" "}
                          {res.recuring && res.recuring.length > 0 ? (
                            <>
                              {printnorwayformat(
                                moment(res.recuring[0].startTime).format("dddd")
                              )}
                            </>
                          ) : (
                            <>
                              {printnorwayformat(
                                moment(res.startTime).format("dddd")
                              )}
                            </>
                          )}{" "}
                        </span>

                        {/* <h1>
                          MM
                          {moment(res.recuring[0].startTime).format("dddd")}
                        </h1> */}
                        <span>
                          {res.recuring && res.recuring.length > 0
                            ? moment(res.recuring[0].startTime).format(
                                "DD-MM-YYYY"
                              )
                            : moment(res.startTime).format("DD-MM-YYYY")}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        Uke : {moment(res.startTime, "YYYYMMDD").week()}{" "}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow className={classes.customeTableRow}>
                      <StyledTableCell align="left">Start tid</StyledTableCell>
                      <StyledTableCell align="left"> Slutt tid</StyledTableCell>
                      <StyledTableCell align="left">Varighet</StyledTableCell>

                      <StyledTableCell align="left">Lag</StyledTableCell>
                      <StyledTableCell align="left">Lokasjon</StyledTableCell>
                      <StyledTableCell align="left">Garderobe</StyledTableCell>
                      <StyledTableCell align="left">Aktivitet</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {!res.recuring && (
                    <TableBody className="bodyWithChildrenItems">
                      <StyledTableRow>
                        <BodyTableCell scope="row">
                          {moment(res.startTime).format("HH:mm")}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {moment(res.endTime).format("HH:mm")}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {showDuration(res.startTime, res.endTime)}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {res.team || res.team_text}
                          {!res.team && !res.team_text && "NA"}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {res.location_name}
                        </BodyTableCell>
                        <BodyTableCell align="left">
                          {res.wardrobe_name}
                          {res.wardrobe_name === "" && "NA"}
                        </BodyTableCell>
                        {/* textEmphasisStyle: `${res.activity_type_textstyle}`, */}
                        {console.log(
                          res["activity_type_textcolor"],
                          "res.activity_type_textcolor"
                        )}
                        <BodyTableCell
                          style={{
                            color: `#${res.activity_type_textcolor}`,
                            fontWeight: `${res.activity_type_textstyle}`,
                          }}
                          align="left"
                        >
                          {res.activity_type}
                          {res.activity_type === "" && "NA"}
                        </BodyTableCell>
                      </StyledTableRow>

                      {res.activity_type === "Match" && (
                        <>
                          <StyledTableRow className={classes.bottomTableRow}>
                            <BodyTableCell scope="row"></BodyTableCell>
                            <BodyTableCell align="left"></BodyTableCell>
                            <BodyTableCell
                              className={classes.label}
                              align="left"
                            >
                              Bortelag
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {res.away_team_text}
                              {res.away_team_text === "" && "NA"}
                            </BodyTableCell>
                            <BodyTableCell
                              align="left"
                              className={classes.label}
                            >
                              Garderobe
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {res.wardrobe_name_away
                                ? res.wardrobe_name_away
                                : "NA"}
                            </BodyTableCell>
                            {/* <BodyTableCell align="left"></BodyTableCell> */}
                            <BodyTableCell align="left"></BodyTableCell>
                          </StyledTableRow>
                          <StyledTableRow className={classes.bottomTableRow}>
                            <BodyTableCell scope="row"></BodyTableCell>
                            <BodyTableCell align="left"></BodyTableCell>
                            <BodyTableCell
                              className={classes.label}
                              align="left"
                            ></BodyTableCell>
                            <BodyTableCell align="left"></BodyTableCell>
                            <BodyTableCell
                              align="left"
                              className={classes.label}
                            >
                              Dommer
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {res.wardrobe_name_referee
                                ? res.wardrobe_name_referee
                                : "NA"}
                            </BodyTableCell>
                            {/* <BodyTableCell align="left"></BodyTableCell> */}
                            <BodyTableCell align="left"></BodyTableCell>
                          </StyledTableRow>
                        </>
                      )}
                    </TableBody>
                  )}
                  {res.recuring &&
                    res.recuring.map((recuringValue: any) => (
                      <TableBody className="bodyWithChildrenItems">
                        <StyledTableRow>
                          <BodyTableCell scope="row">
                            {moment(recuringValue.startTime).format("HH:mm")}
                          </BodyTableCell>
                          <BodyTableCell align="left">
                            {moment(recuringValue.endTime).format("HH:mm")}
                          </BodyTableCell>
                          <BodyTableCell align="left">
                            {showDuration(
                              recuringValue.startTime,
                              recuringValue.endTime
                            )}
                          </BodyTableCell>
                          <BodyTableCell align="left">
                            {recuringValue.team || recuringValue.team_text}
                            {!recuringValue.team &&
                              !recuringValue.team_text &&
                              "NA"}
                          </BodyTableCell>
                          <BodyTableCell align="left">
                            {recuringValue.location_name}
                          </BodyTableCell>
                          <BodyTableCell align="left">
                            {recuringValue.wardrobe_name}
                            {recuringValue.wardrobe_name === "" && "NA"}
                          </BodyTableCell>
                          <BodyTableCell
                            // style={{ color: "red" }}
                            style={{
                              color: `#${recuringValue.activity_type_textcolor}`,
                              fontWeight: `${recuringValue.activity_type_textstyle}`,
                            }}
                            align="left"
                          >
                            {recuringValue.activity_type}
                            {recuringValue.activity_type === "" && "NA"}
                          </BodyTableCell>
                        </StyledTableRow>

                        {/* for away team  */}
                        {recuringValue.activity_type === "Match" && (
                          <>
                            <StyledTableRow className={classes.bottomTableRow}>
                              <BodyTableCell scope="row"></BodyTableCell>
                              <BodyTableCell align="left"></BodyTableCell>
                              <BodyTableCell
                                className={classes.label}
                                align="left"
                              >
                                Bortelag
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                {recuringValue.away_team_text}
                                {recuringValue.away_team_text === "" && "NA"}
                              </BodyTableCell>
                              <BodyTableCell
                                align="left"
                                className={classes.label}
                              >
                                Garderobe
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                {recuringValue.wardrobe_name_away
                                  ? recuringValue.wardrobe_name_away
                                  : "NA"}
                              </BodyTableCell>
                              {/* <BodyTableCell align="left"></BodyTableCell> */}
                              <BodyTableCell align="left"></BodyTableCell>
                            </StyledTableRow>
                            <StyledTableRow className={classes.bottomTableRow}>
                              <BodyTableCell scope="row"></BodyTableCell>
                              <BodyTableCell align="left"></BodyTableCell>
                              <BodyTableCell
                                className={classes.label}
                                align="left"
                              ></BodyTableCell>
                              <BodyTableCell align="left"></BodyTableCell>
                              <BodyTableCell
                                align="left"
                                className={classes.label}
                              >
                                Dommer
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                {recuringValue.wardrobe_name_referee
                                  ? recuringValue.wardrobe_name_referee
                                  : "NA"}
                              </BodyTableCell>
                              {/* <BodyTableCell align="left"></BodyTableCell> */}
                              <BodyTableCell align="left"></BodyTableCell>
                            </StyledTableRow>
                          </>
                        )}
                        {/* for away team end here */}
                      </TableBody>
                    ))}
                </Table>
              ))}
            </TableContainer>
          </Grid>
        </Grid>
        <span style={{ color: "red", marginLeft: "40%" }}>
          {activityList && activityList.length < 1 && "No Activity Found"}
        </span>
        <div
          className=""
          style={{ textAlign: "center", paddingBottom: "40px" }}
        >
          {numberofpage < newactivity.length && (
            <Button
              onClick={Loadmorebtn}
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
          )}
        </div>
      </Container>
    </div>
  );
}
