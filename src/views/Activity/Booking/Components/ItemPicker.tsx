import * as React from "react";
import { makeStyles, FormControl, Select, MenuItem } from "@material-ui/core";
import { styles } from "./styles";
const useStyles = makeStyles(styles as any);

export default function ItemPicker(props: any) {
  const classes = useStyles();

  const { data, id, value, onChange } = props;

  return (
    <FormControl
      style={{ maxWidth: 200, width: "100%" }}
      className="custom-form-control"
    >
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        disabled={props.disabled}
        labelId="demo-simple-select-label"
        value={value}
        label="Team"
        onChange={onChange}
        inputProps={{
          id,
          name: id,
        }}
      >
        <MenuItem
          value=""
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected,
          }}
        >
          None
        </MenuItem>
        {data.map((res: any) => (
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
            value={res.name}
          >
            {res.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
