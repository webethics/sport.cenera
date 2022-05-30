import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { filtersStyle } from "./styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useSnackbar } from "notistack";
import {
  useFetchGetLocations,
  useFetchActivityType,
} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks";

const useStyles = makeStyles(filtersStyle as any);

export default function Filters({
  onFilter,
  searchingtext,
  Filterdate,
  Textvalue,
  setteamid,
  setlocationid,
  setActivitytype,
}: {
  onFilter: any;
  searchingtext: any;
  Filterdate: any;
  Textvalue: any;
  setteamid: any;
  setlocationid: any;
  setActivitytype: any;
}) {
  const [activitylist, setactivitylist] = useState([]);
  const classes = useStyles();
  const [text, setText] = useState("");
  const [team, setTeam] = React.useState("0");
  const [filter, setfilter] = React.useState(7);
  const [activity, setActivity] = React.useState("0");
  // const [searchtext, setSearchtext] = React.useState("");

  const handleChange1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeam(event.target.value as string);
    setteamid(event.target.value);
  };

  const [location, setLocation] = React.useState("0");
  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
    setlocationid(event.target.value);
  };

  const handleChange3 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setfilter(event.target.value as number);
    onFilter(event.target.value);
  };

  const handleChange4 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivity(event.target.value as string);
    setActivitytype(event.target.value);
  };

  const changeText = (e: any) => {
    setText(e.target.value);
  };

  const getText = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchingtext(text);
    } else {
    }
  };

  const handleChange5 = (event: any) => {
    event.preventDefault();
    searchingtext(text);
  };

  const { enqueueSnackbar } = useSnackbar();
  const { locationData, error } = useFetchGetLocations();
  const [locations, setLocations] = useState([]);

  const { teams } = useFetchTeams();
  const [teamsList, setTeamsList] = useState([]);
  const { activityType } = useFetchActivityType();

  useEffect(() => {
    if (locationData) {
      const newArr = locationData.map((res: any) => ({
        id: res.location_id,
        name: res.location_name,
      }));
      setLocations(newArr);
    } else if (error) {
      enqueueSnackbar("SomeThing Went Wront", { variant: "error" });
    }
    if (teams) {
      const newTeam = teams.map((res: any) => ({
        id: res.team_id,
        name: res.team_name,
      }));
      setTeamsList(newTeam);
    }
    if (Filterdate) {
      setfilter(Filterdate);
    }
    if (Textvalue) {
      setText(Textvalue);
    }
    if (activityType[0]) {
      const newactivityType = activityType[0].values.map(
        (res: any, index: number) => ({
          name: res.value,
          isMatch: res.isMatch,
          id: index + 1,
        })
      );
      setactivitylist(newactivityType);
    }
  }, [locationData, teams, Filterdate, activityType]);

  return (
    <div className={classes.filterWrap}>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: { lg: "nowrap", sm: "wrap" },
        }}
        mx={-1}
        mb={2}
      >
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={team}
              onChange={handleChange1}
              label="Team"
            >
              <MenuItem value={0}>All</MenuItem>
              {teamsList.map((res) => (
                <MenuItem value={res.id}>{res.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={location}
              onChange={handleChange2}
              label="Team"
            >
              <MenuItem value={0}>All</MenuItem>
              {locations.map((res) => (
                <MenuItem value={res.id}>{res.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Activity
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={activity}
              onChange={handleChange4}
              label="Team"
            >
              <MenuItem value={0}>All</MenuItem>

              {activitylist.map((res) => (
                <MenuItem value={res.name}>{res.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <form onSubmit={handleChange5}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon type="submit" />
              </div>
              <InputBase
                type="search"
                placeholder="Search…"
                style={{ height: "40px" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={text}
                onKeyPress={(e) => getText(e)}
                onChange={changeText}
                // onClick={handleChange5}

                //onKeyPress={(event:any) => {event.key === 'Enter' && shandleChange5}}
              />
            </div>
          </form>
        </Box>
        <Box p={1} className={classes.filters}>
          <FilterListIcon
            style={{ fontSize: 40, color: "black", marginRight: "10px" }}
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={filter}
              onChange={handleChange3}
            >
              <MenuItem value={0}>Today </MenuItem>
              <MenuItem value={2}>Next 3 days</MenuItem>
              <MenuItem value={6}>Next 7 days</MenuItem>
              <MenuItem value={30}>This Month</MenuItem>
              <MenuItem value={500}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}
