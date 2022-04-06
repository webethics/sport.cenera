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
import { useFetchGetLocations} from "@cenera/common/hooks/api-hooks/activity";
import { useFetchTeams } from '@cenera/common/hooks/api-hooks';

const useStyles = makeStyles(filtersStyle as any);

export default function Filters() {
  const classes = useStyles();
  const [team, setTeam] = React.useState("");
  const handleChange1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeam(event.target.value as string);
  };

  const [location, setLocation] = React.useState("");
  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
  };

  const [filter, setfilter] = React.useState("30");
  const handleChange3 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setfilter(event.target.value as string);
  };

  const [activity, setActivity] = React.useState("30");
  const handleChange4 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivity(event.target.value as string);
  };
  const { enqueueSnackbar } = useSnackbar();
  const {locationData,error}   = useFetchGetLocations();
  const [locations, setLocations] = useState([]);
  const { teams} = useFetchTeams(); 
  const [teamsList, setTeamsList] = useState([]); 

  useEffect(()=>{
    if(locationData){
      const newArr = locationData.map((res:any)=>({id:res.location_id , name:res.location_name}))
      setLocations(newArr)
    }else if(error){
     enqueueSnackbar("SomeThing Went Wront",  { variant: 'error' })
    }
    if(teams) {
      const newTeam = teams.map((res:any)=>({id:res.team_id, name:res.team_name}))
      setTeamsList(newTeam);
    }
  },[locationData,teams])

  
  return (
    <div className={classes.filterWrap}>
      <Box display="flex" sx={{ flexDirection: { xs: "column", sm: "row" }, flexWrap: { lg: "nowrap", sm: "wrap" } }} mx={-1} mb={2}>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={team} onChange={handleChange1} label="Team">
              {teamsList.map((res)=>(
                  <MenuItem value={res.id}>{res.name} </MenuItem>
              ))}
          

            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={location} onChange={handleChange2} label="Team">
              {locations.map((res)=>(
                  <MenuItem value={res.id}>{res.name} </MenuItem>
              ))}
      
            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Activity</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={activity} onChange={handleChange4} label="Team">
              <MenuItem value={10}>Match </MenuItem>
              <MenuItem value={20}>Training</MenuItem>
              <MenuItem value={30}>Maintainance</MenuItem>
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
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Box>
        <Box p={1} className={classes.filters}>
          <FilterListIcon style={{ fontSize: 40, color: "black", marginRight: "10px" }} />

          <FormControl variant="outlined" className={classes.formControl}>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={filter} onChange={handleChange3}>
              <MenuItem value={10}>Today </MenuItem>
              <MenuItem value={20}>Next 3 days</MenuItem>
              <MenuItem value={30}>Next 7 days</MenuItem>
              <MenuItem value={40}>This Month</MenuItem>
              <MenuItem value={50}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}
