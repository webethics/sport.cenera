import axios from 'axios';
import configs from '@cenera/configs';
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


const GetPublicClubs = ():any =>{
   return axios.post<any>(`${configs.app.api}/booking/getClubsPublic`)
}

const addActivity = (newobj:any):any =>{

  return axios.post<any>(`${configs.app.api}/booking/updateActivity` ,{
   ...newobj
} )
}

const GetLocations = (access_token: string): any => {
    return {
      url: `${configs.app.api}/booking/getLocations`,
      method: 'post',
      data: {
        access_token
      },
    };
};


const UpdateLocation = (access_token: string,club_id:number ,location_name: string) => {
return axios.post<any>(`${configs.app.api}/booking/updateLocation` ,{
        access_token: access_token,
        club_id:club_id,
        updateType:"create",
        location_id: "",
        location_type: "field",
        location_name: location_name,
        location_description: "" 
  } )
};



const deleteLocation = (access_token: string,club_id:number ,location_id: number) => {
  return axios.post<any>(`${configs.app.api}/booking/updateLocation` ,{
          access_token: access_token,
          club_id:club_id,
          updateType:"delete",
          location_id: location_id,
    } )
  };

//Wardrobs

 const getWardrobes = (access_token: string): any => {
  return {
    url: `${configs.app.api}/booking/getWardrobes`,
    method: 'post',
    data: {
      access_token,
    },
  };
};


const createWardrobes = (access_token: string,club_id:number,wardrobe_name: string) => {
  return axios.post<any>(`${configs.app.api}/booking/updateWardrobe` , {

    access_token: access_token,
    club_id:club_id,
    updateType: "create",
    wardrobe_id: "",
    wardrobe_name: wardrobe_name,
    wardrobe_maxCapacity: 2,
    wardrobe_description: ""
  })
};


const deleteWardrobes = (access_token: string,club_id:number ,wardrobe_id: number) => {
  return axios.post<any>(`${configs.app.api}/booking/updateWardrobe` ,{
          access_token: access_token,
          club_id:club_id,
          updateType:"delete",
          wardrobe_id: wardrobe_id,

    } )
  };

//activity

const getUpcomingActivities = (access_token: string,club_id:number | string,team_id:number | string,location_id:number | string,startTime:number | string,endTime:number | string,wardrobe_id:number | string,activity_type:number | string): any => {
  return {
    url: `${configs.app.api}/booking/getActivities`,
    method: 'post',
    data: {
      access_token,
      club_id: club_id,
      team_id: team_id,
      location_id: location_id,
      activity_type: activity_type,
      wardrobe_id: wardrobe_id,
      startTime: startTime,
      endTime: endTime
    },
  };
};

// const createActivities = (access_token: string,club_id:number,startTime: number,endTime: number,location_id: number,activity_type: string) => {
//   return axios.post<any>(`${configs.app.api}/booking/updateActivity` , {

//     access_token: access_token,
//     updateType: "create",
//     club_id: club_id,
//     startTime: startTime,
//     endTime: endTime,
//     location_id: location_id,
//     activity_type: activity_type,
//   })
// };

const deleteActivities = (access_token: string,activity_id: number) => {
  return axios.post<any>(`${configs.app.api}/booking/updateActivity` ,{
      access_token: access_token,
      updateType: "delete",
      activity_id: activity_id
    } )
  };

  const deleteMultipleActivities = (access_token: string,club_id: number,activity_id_list: number,delete_dates: number) => {
    return axios.post<any>(`${configs.app.api}/booking/multiDeleteActivities` ,{
      access_token: access_token,
      club_id:club_id,
      activity_id_list: activity_id_list,
      delete_dates: delete_dates
      } )
    };

  const setActivitiesPublished = (access_token: string,club_id:number,activity_id_list: number) => {
    return axios.post<any>(`${configs.app.api}/booking/setActivitiesPublishedState`, {
    access_token: access_token,
    club_id:club_id,
    isPublic: true,
    activity_id_list: activity_id_list
    })
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
  deleteActivities,
  deleteMultipleActivities,
  setActivitiesPublished

};
