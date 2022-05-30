import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import logo from "@cenera/assets/images/logo-frontend.png";
import grungePattren from "@cenera/assets/images/grunge-pattren.png";
import Banner from "@cenera/components/ActivitiesDetail/Banner";
import Table from "@cenera/components/ActivitiesDetail/Table";
import Filters from "@cenera/components/ActivitiesDetail/Filters";
import Grid from "@material-ui/core/Grid";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";
import { activitiesDetailStyle } from "./styles";
import { Link, useParams } from "react-router-dom";
import { useFetchGetActivites } from "@cenera/common/hooks/api-hooks/activity";
import moment from "moment";

const useStyles = makeStyles(activitiesDetailStyle as any);

export default function ActivitiesDetail() {
  const [filterdate, setFilterdate] = useState(7);
  const [endmonth, setendmonth] = useState();
  const enddateofmonth = moment()
    .endOf("month")
    .format("YYYY-MM-DDT24:55");
  var date = new Date();
  date.setDate(date.getDate() + filterdate);
  var nextdate = moment(date).format("YYYY-MM-DDT24:55");
  const currentdate = moment(Date()).format("YYYY-MM-DDTHH:MM");

  const [searchtext, setSearchtext] = useState("");
  const [filterlocation, setfilterlocation] = useState(0);
  const [filterteam, setfilterteam] = useState(0);
  const [filterActivity, setfilterActivity] = useState("0");

  const classes = useStyles();
  const { id } = useParams<any>();

  const data = {
    club_id: id,
    ...(filterteam !== 0 && { team_id: filterteam }),
    ...(filterlocation !== 0 && { location_id: filterlocation }),
    ...(searchtext !== "" && { text_search: searchtext }),
    ...(filterActivity !== "0" && { activity_type: filterActivity }),
    startTime: currentdate,
    endTime: endmonth ? enddateofmonth : nextdate,
  };

  const { acitivityData, loading, revalidate, error } = useFetchGetActivites(
    data
  );
  const [activityList, setActivityList] = useState(null);

  useEffect(() => {
    if (acitivityData) {
      setActivityList(acitivityData);
    }
  }, [
    acitivityData,
    loading,
    revalidate,
    filterdate,
    error,
    searchtext,
    filterlocation,
    filterteam,
    filterActivity,
  ]);

  return (
    <>
      <Box bgcolor="primary.contrastText" className={classes.wrapper}>
        <AppBar position="static" className={classes.appbar}>
          <Box className={classes.justifyContentCenter}>
            <div className={classes.logoHolder}>
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
          </Box>
          <div className={classes.headerPattren}>
            <img src={grungePattren} alt="pattren" />
          </div>
        </AppBar>
        <Banner />

        {activityList && (
          <>
            <Filters
              clubid={id}
              onFilter={(res: any) => {
                if (res == 30) {
                  setendmonth(res);
                } else {
                  setFilterdate(res);
                }
              }}
              searchingtext={(res: any) => {
                setSearchtext(res);
              }}
              filterTeam={(res: any) => {
                if (res === 0) {
                  setfilterteam(0);
                } else {
                  setfilterteam(res);
                }
              }}
              filterLocation={(res: any) => {
                if (res === 0) {
                  setfilterlocation(0);
                } else {
                  setfilterlocation(res);
                }
              }}
              //setfilterActivity
              onFilteractivity={(res: any) => {
                if (res === 0) {
                  setfilterActivity("0");
                } else {
                  setfilterActivity(res);
                }
              }}
            />

            <Table activityList={activityList} />
          </>
        )}

        {!acitivityData && (
          <h4 style={{ textAlign: "center" }}>No Activity Found</h4>
        )}
        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs={12}>
              <Box color="white" textAlign="center">
                © Copyright 2022 CENERA SPORTS
              </Box>
            </Grid>
          </Grid>
        </footer>
      </Box>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
