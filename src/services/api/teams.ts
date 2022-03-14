import axios, { AxiosRequestConfig } from 'axios';

import configs from '@cenera/configs';
import { Team } from '@cenera/models';
import { TeamUpdateReqResponse } from './types';

const getTeams = (access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getTeams`,
    method: 'post',
    data: {
      access_token,
    },
  };
};

const getTeam = (team_id: number, access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getTeam`,
    method: 'post',
    data: {
      access_token,
      team_id,
    },
  };
};

const createOrEditTeam = (team: Team, access_token: string) => {
  return axios.post<TeamUpdateReqResponse>(`${configs.app.api}/updateTeam`, {
    access_token,
    updateType: team.team_id ? 'update' : 'create',
    team_id: team.team_id,
    club_id: team.club_id,
    team_name: team.team_name,
    team_type: team.team_type,
    team_txt1: team.textfield1,
    team_txt2: team.textfield2,
    team_txt3: team.textfield3,
    team_image: team.team_image,
    team_image_logo: team.team_image_logo,
  });
};

const deleteTeam = (team_id: number, access_token: string) => {
  return axios.post<TeamUpdateReqResponse>(`${configs.app.api}/updateTeam`, {
    access_token,
    team_id,
    updateType: 'delete',
  });
};

export const TeamService = {
  getTeam,
  getTeams,
  createOrEditTeam,
  deleteTeam,
};