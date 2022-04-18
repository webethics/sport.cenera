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

export default function Filters({onFilter,searchingtext,Filterdate,Textvalue}:{onFilter:any,searchingtext:any,Filterdate:any,Textvalue:any}) {

  const classes = useStyles();
  const [text, setText] = useState("");
  const [team, setTeam] = React.useState("");
  const [filter, setfilter] = React.useState(7);
  const [activity, setActivity] = React.useState("");
  // const [searchtext, setSearchtext] = React.useState("");

  const handleChange1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeam(event.target.value as string);
  };

  const [location, setLocation] = React.useState("");
  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);

  };

  const handleChange3 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setfilter(event.target.value as number);
    onFilter(event.target.value);
  };
 

  const handleChange4 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivity(event.target.value as string);
  };



  const changeText = (e:any) => {
    setText(e.target.value);
  };


  const handleChange5 = () => {
    searchingtext(text)
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
    if(Filterdate){
      setfilter(Filterdate)
    }
    if(Textvalue){
      setText(Textvalue)
    }
    
  },[locationData,teams,Filterdate,Textvalue])

  
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
            <div className={classes.searchIcon} >
              <SearchIcon />
                         
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={text}
              onChange={changeText}
              onClick={handleChange5}
              // onKeyPress={(event:any) => {event.key === 'Enter' && searchingtext(text)}}
            />
          </div>

        </Box>
        <Box p={1} className={classes.filters}>
          <FilterListIcon style={{ fontSize: 40, color: "black", marginRight: "10px" }} />

          <FormControl variant="outlined" className={classes.formControl}>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={filter} onChange={handleChange3}>
              <MenuItem value={1}>Today </MenuItem>
              <MenuItem value={3}>Next 3 days</MenuItem>
              <MenuItem value={7}>Next 7 days</MenuItem>
              <MenuItem value={30}>This Month</MenuItem>
              <MenuItem value={500}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}
