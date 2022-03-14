import React, { FC } from 'react';
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { Team } from '@cenera/models';
import { styles } from './styles';
const useStyles = makeStyles(styles as any);

type Props = {
  teamList?: Team[];
  title?: string;
  value?: any;
  id?: string;
  onChange?: (
    event?: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    child?: React.ReactNode
  ) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  touched?: boolean;
  error?: any;
};



export const Teampicker: FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { teamList,id, value, onChange, onBlur, touched, error } = props;
  return (
    <FormControl fullWidth={true} className={classes.selectFormControl}>
      <InputLabel htmlFor={id} className={classes.selectLabel}>
         Select Team
      </InputLabel>
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        defaultValue={teamList[0].team_id}  //it will show first team on list by default
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && error ? true : false}
        id={id}
        inputProps={{
          id,
          name: id,
        }}>
       
        {teamList.map(res => (
          <MenuItem
            key={res.team_id}
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
            value={res.team_id}>
            {res.team_name}  
          </MenuItem>
        ))}
      </Select>

      {error && touched ? <label className={classes.errorLabel}>{error}</label> : null}
    </FormControl>
  );
};



export default Teampicker;

