import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { filtersStyle } from "./styles";
import Container from "@material-ui/core/Container";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useFetchGetActivites } from "@cenera/common/hooks/api-hooks/activity";

const useStyles = makeStyles(filtersStyle as any);

export default function Filters({
  onFilter,
  filterTeam,
  filterLocation,
  searchingtext,
  clubid,
  onFilteractivity,
}: {
  onFilter: any;
  filterTeam: any;
  filterLocation: any;
  searchingtext: any;
  clubid: any;
  onFilteractivity: any;
}) {
  const [locationdata, setlocationdata] = React.useState([]);
  const [teamdata, setTeamdata] = React.useState([]);
  const [activitytype, setactivitytype] = React.useState([]);

  const classes = useStyles();
  const { acitivityData } = useFetchGetActivites({ club_id: clubid });

  const [text, setText] = React.useState("");
  const [team, setTeam] = React.useState("0");
  const handleChange1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeam(event.target.value as string);
    filterTeam(event.target.value);
  };

  const [location, setLocation] = React.useState("0");
  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
    filterLocation(event.target.value);
  };

  const [filter, setfilter] = React.useState("7");
  const handleChange3 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setfilter(event.target.value as string);
    onFilter(event.target.value);
  };

  const [activity, setActivity] = React.useState("0");
  const handleChange4 = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilteractivity(event.target.value);
    setActivity(event.target.value as string);
  };

  const changeText = (e: any) => {
    setText(e.target.value);
  };

  const getText = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchingtext(text);
    }
  };

  useEffect(() => {
    if (acitivityData) {
      const filterLocations = acitivityData.map((res: any) => ({
        location_name: res.location_name,
        location_id: res.location_id,
      }));
      setlocationdata(filterLocations);
      const filterTeam = acitivityData.map((res: any) => ({
        team_text: res.team_text,
        team_id: res.team_id,
      }));
      setTeamdata(filterTeam);
      const filterActivitylist = acitivityData
        .filter((res: any) => res.activity_type !== "")
        .map((res: any) => ({
          activity_type: res.activity_type,
        }));
      setactivitytype(filterActivitylist);
    }
  }, [acitivityData]);

  // Remove Duplicate Activity Type
  const filteractivity = new Set();
  const filteredArr = activitytype.filter((el) => {
    const duplicate = filteractivity.has(el.activity_type);
    filteractivity.add(el.activity_type);
    return !duplicate;
  });

  // Remove Duplicate Location Type

  const Filteredlocation = new Set();
  const filteredLocation = locationdata.filter((el) => {
    const duplicate = Filteredlocation.has(el.location_id);
    Filteredlocation.add(el.location_id);
    return !duplicate;
  });
  //Remove Duplicate  Teams

  const Filteredteam = new Set();
  const filteredteams = teamdata.filter((el) => {
    const duplicate = Filteredteam.has(el.team_id);
    Filteredteam.add(el.team_id);
    return !duplicate;
  });

  //Remove empty id and text from team
  const newteam = filteredteams
    .filter((res: any) => res.team_id !== "" && res.team_text !== "")
    .map((res: any) => ({
      team_text: res.team_text,
      team_id: res.team_id,
    }));

  return (
    <Container className={classes.Container}>
      <Box
        display="flex"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        mx={0}
        mb={2}
      >
        <Box
          pl={{ xs: 1, sm: 0 }}
          pr={{ xs: 1 }}
          sx={{ py: 1, pb: 1 }}
          className={classes.formGroup}
        >
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
              {newteam &&
                newteam.map((res: any) => (
                  <MenuItem value={res.team_id}>{res.team_text} </MenuItem>
                ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
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
              label="location"
            >
              <MenuItem value={0}>All</MenuItem>

              {filteredLocation &&
                filteredLocation.map((res: any) => (
                  <MenuItem value={res.location_id}>
                    {res.location_name}{" "}
                  </MenuItem>
                ))}
              {/* <MenuItem value={10}>sydney </MenuItem>
              <MenuItem value={20}>New York</MenuItem>
              <MenuItem value={30}>Melbourne </MenuItem> */}
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
              {filteredArr &&
                filteredArr.map((res: any) => (
                  <MenuItem value={res.activity_type}>
                    {res.activity_type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Box p={1} className={classes.formGroup}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              style={{ height: "40px" }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              // value={text}
              onKeyPress={(e) => getText(e)}
              onChange={changeText}
            />
          </div>
        </Box>
        <Box
          pr={{ xs: 1, sm: 0 }}
          pl={{ xs: 1 }}
          sx={{ py: 1, pb: 1 }}
          className={classes.filters}
        >
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
              <MenuItem value={3}>Next 3 days</MenuItem>
              <MenuItem value={7}>Next 7 days</MenuItem>
              <MenuItem value={30}>This Month</MenuItem>
              <MenuItem value={500}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}
