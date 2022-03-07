import React, { FC } from 'react';
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { TeamPlayer } from '@cenera/models';

import { styles } from './styles';
const useStyles = makeStyles(styles as any);

type Props = {
  players: TeamPlayer[];
  title: string;
  value?: any;
  id: string;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  touched?: boolean;
  error?: any;
};

export const PlayerPicker: FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { players, title, id, value, onChange, onBlur, touched, error } = props;

  

  return (
    <FormControl fullWidth={true} className={classes.selectFormControl}>
      <InputLabel htmlFor={id} className={classes.selectLabel}>
        {title}
      </InputLabel>
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}

        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && error ? true : false}
        id={id}
        inputProps={{
          id,
          name: id,
        }}>
        <MenuItem
          disabled={true}
          classes={{
            root: classes.selectMenuItem,
          }}>
          {title}
        </MenuItem>

        <MenuItem value=""
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
        >
            None
        </MenuItem>

        {players.map(player => (
          <MenuItem
            key={player.player_id}
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
            value={player.player_id}>
            {player.player_firstname} {player.player_lastname} (#{player.player_shirtnumber})
          </MenuItem>
        ))}
      </Select>

      {error && touched ? <label className={classes.errorLabel}>{error}</label> : null}
    </FormControl>
  );
};
