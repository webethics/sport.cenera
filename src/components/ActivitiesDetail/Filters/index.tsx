import React from "react";
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

const useStyles = makeStyles(filtersStyle as any);

export default function Filters() {
  const classes = useStyles();
  const [team, setTeam] = React.useState("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeam(event.target.value as string);
  };

  return (
    <Container className={classes.Container}>
      <Box display="flex" sx={{ flexDirection: { xs: "column", sm: "row" } }} mx={-1} mb={2}>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={team} onChange={handleChange} label="Team">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box p={1} className={classes.formGroup}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={team} onChange={handleChange} label="Team">
              <MenuItem value={10}>sydney </MenuItem>
              <MenuItem value={20}>New York</MenuItem>
              <MenuItem value={30}>Melbourne </MenuItem>
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
      </Box>
    </Container>
  );
}
