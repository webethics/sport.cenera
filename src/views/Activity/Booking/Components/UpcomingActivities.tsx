import React, { useEffect, useState } from "react";
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
// import axios from "axios"
import moment from "moment";
import {
  getFormatedData,
  getFormatedReccuringDate,
  getduraiton,
} from "@cenera/utils/services";

import { useFetchActivities } from "@cenera/common/hooks/api-hooks/activity";
import { ActivityService } from "@cenera/services/api/activity";
import { useAppContext } from "@cenera/app-context";
import { useSnackbar } from "notistack";

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

const useStyles = makeStyles(styles as any);

const UpcomingActivities = ({
  fetchupcomingactivity,
}: {
  fetchupcomingactivity: any;
}) => {
  const [filterActivity, setfilterActivity] = useState("0");
  const [filterdate, setFilterdate] = useState(7);
  const [successedit, setsuccessedit] = useState();

  const [data, setdata] = useState(null);
  const [searchtext, setSearchtext] = useState("");
  const [searchteam, setsearchteam] = useState(0);

  const [searchlocation, setsearchlocation] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [publish, setpublish] = useState(false);
  const [modalshow, setModalshow] = useState(false);
  const [activityIdForEdit, setActivityIdForEdit] = useState(null);
  const [activitystarttime, setactivitystarttime] = useState(null);
  const [acitivityList, setAcitivityList] = useState([]);
  const [appState] = useAppContext();
  const [revaldatestate, setrevaldate] = useState(null);
  const [deleteRecuring, setDeleteRecuring] = useState();
  const [deleteNonRecuring, setDeleteNonRecuring] = useState();
  var date = new Date();
  date.setDate(date.getDate() + filterdate);
  const nextdate = moment(date).format("YYYY-MM-DDTHH:MM");
  const currentdate = moment(Date()).format("YYYY-MM-DDTHH:MM");
  const newobj = {
    access_token: appState.authentication.accessToken,
    club_id: appState.user.club_id,
    ...(searchteam !== 0 && { team_id: searchteam }),
    ...(searchlocation !== 0 && { location_id: searchlocation }),
    // text_search: searchtext && searchtext,
    ...(searchtext !== "" && { text_search: searchtext }),
    ...(filterActivity !== "0" && { activity_type: filterActivity }),
    startTime: currentdate,
    endTime: nextdate,
  };

  const { Activitydata, loading, revalidate } = useFetchActivities(newobj);
  const {
    setActivitiesPublished,
    deleteMultipleActivities,
    deleteRecurringActivity,
  } = ActivityService;

  const deleteNonReccuring = async (deletesingleBooking: any) => {
    setDeleting(true);
    let params = {
      activity_id_list: deletesingleBooking.activity_id,
      deleteDates: deletesingleBooking.date,
    };
    const response = await deleteMultipleActivities(
      appState.authentication.accessToken,
      appState.user.club_id,
      params
    );

    if (response) {
      if (!deleteNonRecuring && !deleteRecuring) {
        await revalidate();
      }
      // setrevaldate(1);
      enqueueSnackbar("Activity Deleted Successfully", {
        variant: "success",
      });
      setDeleting(false);
    }
  };

  const deleteReccuring = async (deleteRecurenceBooking: any) => {
    let formatedDeleteDate = getFormatedReccuringDate(deleteRecurenceBooking);
    let deleteStatus: boolean = false;
    setDeleting(true);
    Promise.all(
      formatedDeleteDate.map(async (res: any) => {
        let params = { deleteDates: res.dateDeletes, activity_id: res.id };

        const response = await deleteRecurringActivity(
          appState.authentication.accessToken,
          params
        );
        if (response) {
          deleteStatus = true;
        }
      })
    ).then(async (res) => {
      console.log(res, "promise response");
      if (deleteStatus === true) {
        if (!deleteNonRecuring && !deleteRecuring) {
          await revalidate();
        }

        // setrevaldate(1);
        enqueueSnackbar("Activity Deleted Successfully", {
          variant: "success",
        });
        setDeleting(false);
      }
    });
  };

  const deleteAllSelected = async () => {
    await deleteNonReccuring(deleteNonRecuring);
    await deleteReccuring(deleteRecuring);
    await revalidate();
  };

  useEffect(() => {
    if (deleteNonRecuring && deleteRecuring) {
      deleteAllSelected();
    }
  }, [deleteNonRecuring, deleteRecuring]);

  const deleteActivity = () => {
    const nonRecuringDeleteDates: any = { activity_id: [], date: [] };
    const recuringDeleteDates: any = [];
    acitivityList.forEach((res) => {
      if (res.isSelected === true && res.recurring_item === true) {
        recuringDeleteDates.push(res);
      }
      if (res.isSelected === true && res.recurring_item === false) {
        nonRecuringDeleteDates.activity_id.push(res.activity_id);
        nonRecuringDeleteDates.date.push(
          moment(res.startTime).format("YYYY-MM-DD")
        );
      }
      if (res.recuring) {
        res.recuring.forEach((value: any) => {
          if (value.isSelected === true && value.recurring_item === true) {
            recuringDeleteDates.push(value);
          }
          if (value.isSelected === true && value.recurring_item === false) {
            nonRecuringDeleteDates.activity_id.push(value.activity_id);
            nonRecuringDeleteDates.date.push(
              moment(value.startTime).format("YYYY-MM-DD")
            );
          }
        });
      }
    });

    let multiRecDelete = recuringDeleteDates.map((res: any) => ({
      id: res.activity_id,
      dateDeletes: [moment(res.startTime).format("YYYY-MM-DD")],
    }));

    if (
      nonRecuringDeleteDates.activity_id.length > 0 &&
      multiRecDelete.length > 0
    ) {
      setDeleteRecuring(multiRecDelete);
      setDeleteNonRecuring(nonRecuringDeleteDates);
    } else {
      if (nonRecuringDeleteDates.activity_id.length > 0)
        deleteNonReccuring(nonRecuringDeleteDates);
      if (multiRecDelete.length > 0) deleteReccuring(multiRecDelete);
    }
  };

  const publishActivity = async () => {
    const itempublish = acitivityList
      .filter((res) => res.isSelected)
      .map((res) => res.activity_id);

    if (itempublish) {
      setpublish(true);
      const response = await setActivitiesPublished(
        appState.authentication.accessToken,
        appState.user.club_id,
        itempublish
      );
      if (response) {
        await revalidate();
        setrevaldate(1);
        enqueueSnackbar("Activity Publish Successfully", {
          variant: "success",
        });
        setpublish(false);
      }
    }
  };

  const { alert, showConfirmDialog } = useShowConfirmDialog({
    onDeleteConfirmed: deleteActivity,
    successMessage: "Activity deleted successfully",
    confirmMessage: "Activity will be deleted for good!",
  });
  const {
    alert: alertPublic,
    showConfirmDialog: showPublicDialoge,
  } = useShowConfirmDialog({
    onDeleteConfirmed: publishActivity,
    successMessage: "Activity publish successfully",
    confirmMessage: "Activity will be publish for good!",
  });

  const handleEditActivity = (id: number, sdate: any) => {
    setActivityIdForEdit(id);
    setactivitystarttime(sdate);
    setModalshow(true);
  };

  useEffect(() => {
    if (Activitydata) {
      let temp = getFormatedData(Activitydata);
      setAcitivityList(temp);
    }
    if (fetchupcomingactivity && fetchupcomingactivity == 1 && Activitydata) {
      revalidate();
      setdata(2);
    }
  }, [
    revaldatestate,
    deleting,
    loading,
    nextdate,
    searchtext,
    searchteam,
    fetchupcomingactivity,
    searchlocation,
  ]);

  useEffect(() => {
    if (data == 2) {
      let temp = getFormatedData(Activitydata);
      setAcitivityList(temp);
    }
    if (successedit) {
      revalidate();
      let temp = getFormatedData(Activitydata);
      setAcitivityList(temp);
 
    }
  }, [Activitydata, data, successedit]);

  const handleDeleteSelected = () => {
    let isSelectedForDelete = acitivityList.some((res) => {
      if (res.isSelected === true) {
        return res;
      }
      if (res.recuring) {
        return res.recuring.some((value: any) => value.isSelected === true);
      }
    });
    if (isSelectedForDelete) {
      showConfirmDialog();
    } else {
      enqueueSnackbar("Please Select Activity", {
        variant: "error",
      });
    }
  };

  const publishedActivity = () => {
    let isSelectedForpublish = acitivityList.some((res) => {
      if (res.isSelected === true) {
        return res;
      }
      if (res.recuring) {
        return res.recuring.some((value: any) => value.isSelected === true);
      }
    });
    if (isSelectedForpublish) {
      showPublicDialoge();
    }
  };

  const handleCheckBoxForDelete = (id: number) => {
    const newArr = [...acitivityList];
    newArr.forEach((res, index) => {
      if (res.randomId == id) {
        newArr[index] = { ...res, isSelected: !res.isSelected };
      }

      if (res.recuring && res.recuring.length > 0) {
        res.recuring.forEach((recVal: any, i: any) => {
          if (recVal.randomId == id) {
            newArr[index].recuring[i] = {
              ...recVal,
              isSelected: !recVal.isSelected,
            };
          }
        });
      }
    });
    setAcitivityList([...newArr]);
  };

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

  return (
    <div className="parent">
      {alert}
      {alertPublic}

      <Backdrop
        className={classes.backdrop}
        open={deleting || loading || publish}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <EditActivityModal
        open={modalshow}
        onClose={() => setModalshow(false)}
        callupcoming={(v: any) => setsuccessedit(v)}
        activityid={activityIdForEdit}
        activitystarttime={activitystarttime}
      />
      <Card>
        <CardHeader>
          <h4>Upcoming Activities</h4>
        </CardHeader>

        <CardBody>
          <Grid container>
            <Grid item xs={12}>
              {acitivityList && (
                <>
                  <Filters
                    onFilter={(res: any) => {
                      setFilterdate(res);
                    }}
                    searchingtext={(res: any) => {
                      setSearchtext(res);
                    }}
                    setteamid={(res: any) => {
                      if (res === 0) {
                        setsearchteam(0);
                      } else {
                        setsearchteam(res);
                      }
                    }}
                    setlocationid={(res: any) => {
                      if (res === 0) {
                        setsearchlocation(0);
                      } else {
                        setsearchlocation(res);
                      }
                    }}
                    Filterdate={filterdate}
                    Textvalue={searchtext}
                    setActivitytype={(res: any) => {
                      if (res === 0) {
                        setfilterActivity("0");
                      } else {
                        setfilterActivity(res);
                      }
                    }}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                {/* {Activitydata  searchingtext
      .filter((res:any) => res.startTime !== res.endTime)
      .map((res:any) => (
            <h1>{res.recurring_exceptions}</h1>
          ))} */}

                {acitivityList.length === 0 && (
                  <h5 style={{ color: "red", textAlign: "center" }}>
                    No Activities Found
                  </h5>
                )}
                {acitivityList &&
                  acitivityList.map((res: any) => (
                    <Table
                      className={`${classes.table} upcoming-tables`}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell colSpan={9}>
                            {res.recuring && res.recuring.length > 0
                              ? moment(res.recuring[0].startTime).format(
                                  "DD-MM-YYYY"
                                )
                              : moment(res.startTime).format("DD-MM-YYYY")}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow className={classes.customeTableRow}>
                          <StyledTableCell>Start time</StyledTableCell>
                          <StyledTableCell align="left">
                            End Time
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Duration
                          </StyledTableCell>

                          <StyledTableCell align="left">Team</StyledTableCell>
                          <StyledTableCell align="left">
                            Location
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Warderobe
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Activity
                          </StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
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

                            <BodyTableCell
                              className={`${res.activity_type === "Match" &&
                                classes.matched}`}
                              align="left"
                            >
                              {res.activity_type}
                              {res.activity_type === "" && "NA"}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              <Button
                                color="info"
                                style={{
                                  maxWidth: "100%",
                                  margin: "auto",
                                  display: "block",
                                }}
                                onClick={() =>
                                  handleEditActivity(
                                    res.activity_id,
                                    res.startTime
                                  )
                                }
                              >
                                Edit
                              </Button>
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              <Checkbox
                                style={{ color: "#00acc1" }}
                                name={res.id}
                                checked={res.isSelected}
                                onChange={() =>
                                  handleCheckBoxForDelete(res.randomId)
                                }
                              />
                            </BodyTableCell>
                          </StyledTableRow>

                          {/* for away team  */}
                          {res.activity_type === "Match" && (
                            <>
                              <StyledTableRow
                                className={classes.bottomTableRow}
                              >
                                <BodyTableCell scope="row"></BodyTableCell>
                                <BodyTableCell align="left"></BodyTableCell>
                                <BodyTableCell
                                  className={classes.label}
                                  align="left"
                                >
                                  Away Team
                                </BodyTableCell>
                                <BodyTableCell align="left">
                                  {res.away_team_text}
                                  {res.away_team_text === "" && "NA"}
                                </BodyTableCell>
                                <BodyTableCell
                                  align="left"
                                  className={classes.label}
                                >
                                  Warderobe
                                </BodyTableCell>
                                <BodyTableCell align="left">
                                  {res.wardrobe_name_away
                                    ? res.wardrobe_name_away
                                    : "NA"}
                                </BodyTableCell>
                                {/* <BodyTableCell align="left"></BodyTableCell> */}
                                <BodyTableCell align="left"></BodyTableCell>
                                <BodyTableCell align="left"></BodyTableCell>
                                <BodyTableCell align="left"></BodyTableCell>
                              </StyledTableRow>
                              <StyledTableRow
                                className={classes.bottomTableRow}
                              >
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
                                  Referee
                                </BodyTableCell>
                                <BodyTableCell align="left">
                                  {res.wardrobe_name_referee
                                    ? res.wardrobe_name_referee
                                    : "NA"}
                                </BodyTableCell>
                                {/* <BodyTableCell align="left"></BodyTableCell> */}
                                <BodyTableCell align="left"></BodyTableCell>
                                <BodyTableCell align="left"></BodyTableCell>
                                <BodyTableCell align="left"></BodyTableCell>
                              </StyledTableRow>
                            </>
                          )}
                          {/* for away team end here */}
                        </TableBody>
                      )}

                      {res.recuring &&
                        res.recuring.map((recuringValue: any) => (
                          <TableBody className="bodyWithChildrenItems">
                            <StyledTableRow>
                              <BodyTableCell scope="row">
                                {moment(recuringValue.startTime).format(
                                  "HH:mm"
                                )}
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
                                className={`${recuringValue.activity_type ===
                                  "Match" && classes.matched}`}
                                align="left"
                              >
                                {recuringValue.activity_type}
                                {recuringValue.activity_type === "" && "NA"}
                              </BodyTableCell>

                              <BodyTableCell align="left">
                                <Button
                                  color="info"
                                  style={{
                                    maxWidth: "100%",
                                    margin: "auto",
                                    display: "block",
                                  }}
                                  onClick={() =>
                                    handleEditActivity(
                                      recuringValue.activity_id,
                                      recuringValue.startTime
                                    )
                                  }
                                >
                                  Edit
                                </Button>
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                <Checkbox
                                  style={{ color: "#00acc1" }}
                                  name={recuringValue.id}
                                  checked={recuringValue.isSelected}
                                  onChange={() =>
                                    handleCheckBoxForDelete(
                                      recuringValue.randomId
                                    )
                                  }
                                />
                              </BodyTableCell>
                            </StyledTableRow>

                            {/* for away team  */}
                            {recuringValue.activity_type === "Match" && (
                              <>
                                <StyledTableRow
                                  className={classes.bottomTableRow}
                                >
                                  <BodyTableCell scope="row"></BodyTableCell>
                                  <BodyTableCell align="left"></BodyTableCell>
                                  <BodyTableCell
                                    className={classes.label}
                                    align="left"
                                  >
                                    Away Team
                                  </BodyTableCell>
                                  <BodyTableCell align="left">
                                    {recuringValue.away_team_text}
                                    {recuringValue.away_team_text === "" &&
                                      "NA"}
                                  </BodyTableCell>
                                  <BodyTableCell
                                    align="left"
                                    className={classes.label}
                                  >
                                    Warderobe
                                  </BodyTableCell>
                                  <BodyTableCell align="left">
                                    {recuringValue.wardrobe_name_away
                                      ? recuringValue.wardrobe_name_away
                                      : "NA"}
                                  </BodyTableCell>
                                  {/* <BodyTableCell align="left"></BodyTableCell> */}
                                  <BodyTableCell align="left"></BodyTableCell>
                                  <BodyTableCell align="left"></BodyTableCell>
                                  <BodyTableCell align="left"></BodyTableCell>
                                </StyledTableRow>
                                <StyledTableRow
                                  className={classes.bottomTableRow}
                                >
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
                                    Referee
                                  </BodyTableCell>
                                  <BodyTableCell align="left">
                                    {recuringValue.wardrobe_name_referee
                                      ? recuringValue.wardrobe_name_referee
                                      : "NA"}
                                  </BodyTableCell>
                                  {/* <BodyTableCell align="left"></BodyTableCell> */}
                                  <BodyTableCell align="left"></BodyTableCell>
                                  <BodyTableCell align="left"></BodyTableCell>
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
          {/* <div className="" style={{ textAlign: "center", paddingBottom: "40px" }}>
                <Button variant="text" style={{backgroundColor: "#0079BC", color: "#ffffff", width: "150px", maxWidth: "100%"}}>See More</Button>
              </div> */}
          {acitivityList.length > 0 && (
            <div
              className=""
              style={{ textAlign: "center", paddingBottom: "40px" }}
            >
              <Button
                color="danger"
                style={{ maxWidth: "100%" }}
                onClick={handleDeleteSelected}
              >
                Delete Selected Activities
              </Button>
              <Button
                color="danger"
                style={{ maxWidth: "100%", display: "none" }}
                onClick={publishedActivity}
              >
                Published Selected Activities
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UpcomingActivities;
