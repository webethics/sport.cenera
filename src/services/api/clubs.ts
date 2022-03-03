import axios, { AxiosRequestConfig } from 'axios';

import configs from '@cenera/configs';
import { Club } from '@cenera/models';
import { ClubUpdateReqResponse } from './types';

const getClubs = (access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getClubs`,
    method: 'post',
    data: {
      access_token,
    },
  };
};

const getClub = (club_id: number, access_token: string): AxiosRequestConfig => {
  return {
    url: `${configs.app.api}/getClub`,
    method: 'post',
    data: {
      access_token,
      club_id,
    },
  };
};

const createOrEditClub = (club: Club, access_token: string) => {
  return axios.post<ClubUpdateReqResponse>(`${configs.app.api}/updateClub`, {
    access_token,
    updateType: club.club_id ? 'update' : 'create',
    club_id: club.club_id,
    club_name: club.club_name,
    club_sportstype: club.club_sportstype,
    club_txt1: club.textfield1,
    club_txt2: club.textfield2,
    club_txt3: club.textfield3,
    club_txt4: club.textfield4,
    club_txt5: club.textfield5,
    club_image: club.club_image,
    club_image_logo: club.club_image_logo,
  });
};

const deleteClub = (club_id: number, access_token: string) => {
  return axios.post<ClubUpdateReqResponse>(`${configs.app.api}/updateClub`, {
    access_token,
    club_id,
    updateType: 'delete',
  });
};

export const ClubService = {
  getClubs,
  getClub,
  createOrEditClub,
  deleteClub,
};
