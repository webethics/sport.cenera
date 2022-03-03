import axios, { AxiosRequestConfig } from 'axios';
import format from 'date-fns/format';

import configs from '@cenera/configs';
import { Player } from '@cenera/models';
import { PlayerUpdateReqResponse } from './types';

const getPlayer = (player_id: number, access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getPlayer`,
    method: 'post',
    data: {
      player_id,
      access_token,
    },
  };
};

const createOrEditPlayer = (player: Player, access_token: string) => {
  return axios.post<PlayerUpdateReqResponse>(`${configs.app.api}/updatePlayer`, {
    access_token,
    updateType: player.player_id ? 'update' : 'create',
    player_id: player.player_id,
    club_id: player.club_id,
    team_id: player.team_id,
    player_shirtnumber: player.shirtnumber.toString(),
    player_firstname: player.firstname,
    player_lastname: player.lastname,
    player_weight: `${player.weight} kg`,
    player_height: `${player.height} cm`,
    player_birthday: format(player.birthday, 'yyyy-MM-dd'),
    player_position: player.position,
    player_motherclub: player.motherclub,
    player_nationality: player.player_nationality,
    player_previousclub: player.player_previousclub,
    player_image: player.player_image,
    player_txt1: player.textfield1,
    player_txt2: player.textfield2,
    player_txt3: player.textfield3,
    player_txt_stat1: player.textfield1_stat,
    player_txt_stat2: player.textfield2_stat,
    player_txt_stat3: player.textfield3_stat,
    player_txt_stat4: player.textfield4_stat,
    player_txt_fun1: player.textfield1_fun,
    player_txt_fun2: player.textfield2_fun,
    player_txt_fun3: player.textfield3_fun,
    player_txt_fun4: player.textfield4_fun,
  });
};

const deletePlayer = (player_id: number, team_id: number, club_id: number, access_token: string) => {
  return axios.post<PlayerUpdateReqResponse>(`${configs.app.api}/updatePlayer`, {
    access_token,
    player_id,
    team_id,
    club_id,
    updateType: 'delete',
  });
};

export const PlayerService = {
  getPlayer,
  createOrEditPlayer,
  deletePlayer,
};
