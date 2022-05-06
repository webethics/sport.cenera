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
import { getFormatedData } from "@cenera/utils/services";

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
  const [filterdate, setFilterdate] = useState(7);
  const [successedit, setsuccessedit] = useState(true);
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
  const [acitivityList, setAcitivityList] = useState([]);
  const [appState] = useAppContext();
  const [revaldatestate, setrevaldate] = useState(null);
  var date = new Date();
  date.setDate(date.getDate() + filterdate);
  const nextdate = moment(date).format("YYYY-MM-DDTHH:MM");
  const currentdate = moment(Date()).format("YYYY-MM-DDTHH:MM");
  const newobj = {
    access_token: appState.authentication.accessToken,
    club_id: appState.user.club_id,
    ...(searchteam !== 0 && { team_id: searchteam }),
    ...(searchlocation !== 0 && { location_id: searchlocation }),
    text_search: searchtext && searchtext,
    startTime: currentdate,
    endTime: nextdate,
  };

  const { Activitydata, loading, revalidate } = useFetchActivities(newobj);
  const { deleteMultipleActivities, setActivitiesPublished } = ActivityService;

  const deleteActivity = async () => {
    const itemDelete = acitivityList
      .filter((res) => res.isSelected)
      .map((res) => res.activity_id);

    if (itemDelete) {
      setDeleting(true);
      const response = await deleteMultipleActivities(
        appState.authentication.accessToken,
        appState.user.club_id,
        itemDelete
      );
      if (response) {
        await revalidate();
        setrevaldate(1);
        enqueueSnackbar("Activity Deleted Successfully", {
          variant: "success",
        });
        setDeleting(false);
      }
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
      console.log(response, "dataaa");
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

  const handleEditActivity = (id: number) => {
    setActivityIdForEdit(id);
    setModalshow(true);
  };

  useEffect(() => {
    if (Activitydata) {
      let temp = getFormatedData(Activitydata);
      setAcitivityList(temp);
    }
    if (fetchupcomingactivity == 1 && Activitydata) {
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
    if (successedit === false) {
      revalidate();
      let temp = getFormatedData(Activitydata);
      setAcitivityList(temp);
    }
  }, [Activitydata, data, successedit]);

  // console.log(acitivityList,'fetchupcomingactivity989898')

  const handleDeleteSelected = () => {
    let isSelectedForDelete = acitivityList.some(
      (res) => res.isSelected === true
    );

    if (isSelectedForDelete) {
      showConfirmDialog();
    }
  };

  const publishedActivity = () => {
    let isSelectedForpublish = acitivityList.some(
      (res) => res.isSelected === true
    );
    if (isSelectedForpublish) {
      showPublicDialoge();
    }
  };

  const handleCheckBoxForDelete = (id: number) => {
    const newArr = [...acitivityList];
    newArr.forEach((res, index) => {
      if (res.activity_id == id) {
        newArr[index] = { ...res, isSelected: !res.isSelected };
      }
    });
    setAcitivityList([...newArr]);
  };
  const duraiton = (t1: any, t2: any) => {
    let a = moment(t1);
    let b = moment(t2);

    const milliseconds = b.diff(a);
    const minutes = (milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}:${minutes} h`;
  };

  const showDuration = (start: string, end: string) => {
    let startDate = moment(start).format("YYYY-MM-DD");
    let endDate = moment(end).format("YYYY-MM-DD");

    let endTime = moment(end).format("HH:mm");
    let finalEndTime = moment(startDate + " " + endTime);

    if (startDate === endDate) {
      return duraiton(start, end);
    } else {
      return duraiton(start, finalEndTime);
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
        activityId={activityIdForEdit}
        callUpcomingActivity={() => setsuccessedit(false)}
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
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell colSpan={9}>
                            {res.recuring && res.recuring.length > 0?  moment(res.recuring[0].startTime).format("DD-MM-YYYY") : moment(res.startTime).format("DD-MM-YYYY")}
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
                         <TableBody>
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
                             {res.team} {res.team_text}
                           </BodyTableCell>
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
                           <BodyTableCell align="left">
                             <Button
                               color="info"
                               style={{
                                 maxWidth: "100%",
                                 margin: "auto",
                                 display: "block",
                               }}
                               onClick={() =>
                                 handleEditActivity(res.activity_id)
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
                                 handleCheckBoxForDelete(res.activity_id)
                               }
                             />
                           </BodyTableCell>
                         </StyledTableRow>
 
                         {/* for away team  */}
                         {res.activity === "Match" && (
                           <StyledTableRow className={classes.bottomTableRow}>
                             <BodyTableCell scope="row"></BodyTableCell>
                             <BodyTableCell align="left"></BodyTableCell>
                             <BodyTableCell
                               className={classes.label}
                               align="left"
                             >
                               Away Team
                             </BodyTableCell>
                             <BodyTableCell align="left">
                               {res.away_team}
                             </BodyTableCell>
                             <BodyTableCell align="left">
                               Warderobe
                             </BodyTableCell>
                             <BodyTableCell align="left">
                               {res.away_team_text}
                             </BodyTableCell>
                             {/* <BodyTableCell align="left"></BodyTableCell> */}
                           </StyledTableRow>
                         )}
                         {/* for away team end here */}
                       </TableBody>
                      )}
                     
                     {res.recuring  &&  res.recuring.map((recuringValue:any)=>(
                          <TableBody>
                          <StyledTableRow>
                            <BodyTableCell scope="row">
                              {console.log(recuringValue.startTime,"recuring starttime")}
                              {moment(recuringValue.startTime).format("HH:mm")}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {moment(recuringValue.endTime).format("HH:mm")}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {showDuration(recuringValue.startTime, recuringValue.endTime)}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {recuringValue.team} {recuringValue.team_text}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {recuringValue.location_name}
                            </BodyTableCell>
                            <BodyTableCell align="left">
                              {recuringValue.wardrobe_name}
                            </BodyTableCell>
                            <BodyTableCell
                              className={`${recuringValue.activity === "Match" &&
                                classes.matched}`}
                              align="left"
                            >
                              {recuringValue.activity_type_name}
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
                                  handleEditActivity(recuringValue.activity_id)
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
                                  handleCheckBoxForDelete(recuringValue.activity_id)
                                }
                              />
                            </BodyTableCell>
                          </StyledTableRow>
  
                          {/* for away team  */}
                          {recuringValue.activity === "Match" && (
                            <StyledTableRow className={classes.bottomTableRow}>
                              <BodyTableCell scope="row"></BodyTableCell>
                              <BodyTableCell align="left"></BodyTableCell>
                              <BodyTableCell
                                className={classes.label}
                                align="left"
                              >
                                Away Team
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                {recuringValue.away_team}
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                Warderobe
                              </BodyTableCell>
                              <BodyTableCell align="left">
                                {recuringValue.away_team_text}
                              </BodyTableCell>
                              {/* <BodyTableCell align="left"></BodyTableCell> */}
                            </StyledTableRow>
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
                style={{ maxWidth: "100%" }}
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
