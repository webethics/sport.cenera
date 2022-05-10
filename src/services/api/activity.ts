import axios from "axios";
import configs from "@cenera/configs";
// import { Club } from '@cenera/models';
// import { ClubUpdateReqResponse } from './types';

// const createOrEditClub = (club: Club, access_token: string) => {
//   return axios.post<ClubUpdateReqResponse>(`${configs.app.api}/updateClub`, {
//     access_token,
//     updateType: club.club_id ? 'update' : 'create',
//     club_id: club.club_id,
//     club_name: club.club_name,
//     club_sportstype: club.club_sportstype,
//     club_txt1: club.textfield1,
//     club_txt2: club.textfield2,
//     club_txt3: club.textfield3,
//     club_txt4: club.textfield4,
//     club_txt5: club.textfield5,
//     club_image: club.club_image,
//     club_image_logo: club.club_image_logo,
//   });
// };

// const deleteClub = (club_id: number, access_token: string) => {
//   return axios.post<ClubUpdateReqResponse>(`${configs.app.api}/updateClub`, {
//     access_token,
//     club_id,
//     updateType: 'delete',
//   });
// };

// const GetActivities = (club_id:number ,access_token:string) =>{
//   return axios.post<ClubUpdateReqResponse>(`${configs.app.api}/booking/getActivities`, {
//     access_token,
//     club_id,
//     updateType: 'delete',
//   });
// }

const GetPublicClubs = (): any => {
  return axios.post<any>(`${configs.app.api}/booking/getClubsPublic`);
};

//Create activity
const addActivity = (newobj: any): any => {
  return axios.post<any>(`${configs.app.api}/booking/updateActivity`, newobj);
};

const deleteRecurringActivity = (
  access_token: string,
  club_id: number,
  params: any
): any => {
  return axios.post<any>(`${configs.app.api}/booking/updateActivity`, {
    access_token: access_token,
    updateType: "delete",
    delete_type: "single-occurance",
    club_id: club_id,
    ...params,
  });
};

//Get activity

const getUpcomingActivities = (newobj: any): any => {
  return {
    url: `${configs.app.api}/booking/getActivities`,
    method: "post",
    data: newobj,
  };
};

const getEditActivities = (
  access_token: string,
  club_id: number,
  activity_id_list: Array<Number>,
  startTime: string,
  endTime: string
): any => {
  return {
    url: `${configs.app.api}/booking/getActivities`,
    method: "post",
    data: {
      access_token,
      club_id: club_id,
      activity_id_list: [activity_id_list],
      startTime: startTime,
      endTime: endTime,
    },
  };
};
const GetActivities = (data: any): any => {
  return {
    url: `${configs.app.api}/booking/getActivities`,
    method: "post",
    data: data,
    // access_token: access_token,
    // club_id: club_id,
    // team_id: team_id,
    // location_id: 1,
    // activity_type: 5,
    // wardrobe_id: 1,
    // // activity_id_list: [1,2,3],
    // text_search:"value",
    // startTime: "2022-03-29T14:00",
    // endTime: "2022-03-29T15:00"
  };
};

const deleteMultipleActivities = (
  access_token: string,
  club_id: number,
  params: any
) => {
  return axios.post<any>(`${configs.app.api}/booking/multiDeleteActivities`, {
    access_token: access_token,
    club_id: club_id,
    ...params,
    // activity_id_list: activity_id_list,
  });
};

//lOCATION
const GetLocations = (access_token: string): any => {
  return {
    url: `${configs.app.api}/booking/getLocations`,
    method: "post",
    data: {
      access_token,
    },
  };
};

const UpdateLocation = (
  access_token: string,
  club_id: number,
  location_name: string
) => {
  return axios.post<any>(`${configs.app.api}/booking/updateLocation`, {
    access_token: access_token,
    club_id: club_id,
    updateType: "create",
    location_id: "",
    location_type: "field",
    location_name: location_name,
    location_description: "",
  });
};

const deleteLocation = (
  access_token: string,
  club_id: number,
  location_id: number
) => {
  return axios.post<any>(`${configs.app.api}/booking/updateLocation`, {
    access_token: access_token,
    club_id: club_id,
    updateType: "delete",
    location_id: location_id,
  });
};

//Wardrobs

const getWardrobes = (access_token: string): any => {
  return {
    url: `${configs.app.api}/booking/getWardrobes`,
    method: "post",
    data: {
      access_token,
    },
  };
};

const createWardrobes = (
  access_token: string,
  club_id: number,
  wardrobe_name: string
) => {
  return axios.post<any>(`${configs.app.api}/booking/updateWardrobe`, {
    access_token: access_token,
    club_id: club_id,
    updateType: "create",
    wardrobe_id: "",
    wardrobe_name: wardrobe_name,
    wardrobe_maxCapacity: 2,
    wardrobe_description: "",
  });
};

const deleteWardrobes = (
  access_token: string,
  club_id: number,
  wardrobe_id: number
) => {
  return axios.post<any>(`${configs.app.api}/booking/updateWardrobe`, {
    access_token: access_token,
    club_id: club_id,
    updateType: "delete",
    wardrobe_id: wardrobe_id,
  });
};

const setActivitiesPublished = (
  access_token: string,
  club_id: number,
  activity_id_list: any
) => {
  return axios.post<any>(
    `${configs.app.api}/booking/setActivitiesPublishedState`,
    {
      access_token: access_token,
      club_id: club_id,
      isPublic: true,
      activity_id_list: activity_id_list,
    }
  );
};

//Getactivitylist
const Getactivitylist = (access_token: string): any => {
  return {
    url: `${configs.app.api}/booking/getTypes`,
    method: "post",
    data: {
      access_token,
    },
  };
};

export const ActivityService = {
  // createOrEditClub,
  // deleteClub,
  GetPublicClubs,
  GetLocations,
  UpdateLocation,
  deleteLocation,
  getWardrobes,
  createWardrobes,
  addActivity,
  deleteWardrobes,
  getUpcomingActivities,
  deleteMultipleActivities, 
  setActivitiesPublished,
  getEditActivities,
  GetActivities,
  Getactivitylist,
  deleteRecurringActivity,
};
