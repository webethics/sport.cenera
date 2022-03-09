import React, { useEffect, useState } from "react";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import Grid from "@material-ui/core/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { makeStyles } from "@material-ui/core";
import { styles } from "./../styles";
import { Box, Typography, Backdrop, CircularProgress } from "@material-ui/core";
import { Button } from "@cenera/components/Button/Button";
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import EditActivityModal from "./EditActivityModal";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(styles as any);

const UpcomingActivities = () => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [modalshow, setModalshow] = useState(false);
  const [activityIdForEdit, setActivityIdForEdit] = useState<number | null>(
    null
  );
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
    const itemToBeDelte = newArr.filter(
      (response) => response.checked === true
    );
    setActivityIdForDelete(itemToBeDelte);
  };

  const handleDeleteAll = () => {
    showConfirmDialog();
  };

  console.log("lll", activityIdForDelete);

  return (
    <GridContainer>
      <GridItem xs={11} sm={11} md={11} xl={8} className={classes.container}>
        <Card>
          <CardHeader>
            <h4>Upcoming Activities</h4>
          </CardHeader>

          <CardBody>
            {bookedList.map((res: any) => (
              <GridContainer className={classes.cardContainer} key={res.id}>
                <GridItem xs="4" sm="1">
                  <Box>
                    <Checkbox
                      name={res.id}
                      checked={res.checked}
                      style={{ color: "#00acc1" }}
                      onChange={handleCheckBox}
                    />
                  </Box>
                </GridItem>

                <GridItem xs="8" sm="2">
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      maxWidth: "100%",
                      bgcolor: "#eeeeee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <Typography variant="h5" align="center">
                        {moment(res.start).format("D")}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {moment(res.start).format("MMMM")}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {moment(res.start).format("YYYY")}
                      </Typography>
                    </div>
                  </Box>
                </GridItem>

                <GridItem xs="6" sm="3" md="3">
                  <h5 style={{ fontSize: "14px" }}>
                    Team: <span className={classes.textColor}>{res.team}</span>{" "}
                  </h5>
                  <h5 style={{ fontSize: "14px" }}>
                    Start:<span className={classes.textColor}>{res.start}</span>
                  </h5>
                  <h5 style={{ fontSize: "14px" }}>
                    End:<span className={classes.textColor}>{res.end}</span>
                  </h5>
                </GridItem>

                <GridItem xs="6" sm="3" md="3">
                  <h5 style={{ fontSize: "14px" }}>
                    Location:{" "}
                    <span className={classes.textColor}>{res.location}</span>
                  </h5>
                  <h5 style={{ fontSize: "14px" }}>
                    Warderobe:
                    <span className={classes.textColor}>{res.Warderobe}</span>
                  </h5>
                  <h5 style={{ fontSize: "14px" }}>
                    Activity:{" "}
                    <span className={classes.textColor}>{res.activity}</span>
                  </h5>
                </GridItem>

                <GridItem xs="12" sm="3" md="3">
                  <Button
                    color="info"
                    style={{
                      width: "150px",
                      maxWidth: "100%",
                      margin: "auto",
                      display: "block",
                    }}
                    onClick={() => handleEditActivity(res.id)}
                  >
                    Edit
                  </Button>
                </GridItem>

                {/* <GridContainer  style={{ display: "flex", justifyContent: "center" }}  >
               <GridItem xs="6" sm="5" md="3">
                 <h5 style={{ fontSize: "14px" }}>Away Team : Away team text</h5>
               </GridItem>
               <GridItem xs="6" sm="5" md="3">
                 <h5 style={{ fontSize: "14px" }}>Warderobe: Warderobe</h5>
               </GridItem>
             </GridContainer> */}
              </GridContainer>
            ))}

            <Grid container justify="center">
              <Button color="danger" onClick={() => handleDeleteAll()}>
                Delete Selected Activity
              </Button>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
      {alert}
      <Backdrop className={classes.backdrop} open={deleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <EditActivityModal
        open={modalshow}
        onClose={() => setModalshow(false)}
        activityId={activityIdForEdit}
      />
    </GridContainer>
  );
};

export default UpcomingActivities;
