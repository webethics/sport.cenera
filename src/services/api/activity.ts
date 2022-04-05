import axios, { AxiosRequestConfig } from 'axios';
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

const addActivity = (access_token: string,club_id:number,activity_id:number, 
  startTime:string ,endTime:string,location_id:number,activity_type:string,
  team_id:number,team_text:string, away_team_text:string ,wardrobe_id:number,
  wardrobe_id_away:number , wardrobe_id_referee :number,wardrobe_extra_time:number,
  description:string
  
  ):any =>{
  return axios.post<any>(`${configs.app.api}/booking/updateActivity` ,{
    access_token: access_token,
    updateType: "create",
    club_id: club_id,
    activity_id: activity_id,
    startTime: startTime,
    endTime:  endTime,
    location_id:location_id,
    activity_type: activity_type,
    recurring_item: false, ////not added in form 
    recurring_details:"", //not added in form 
    recurring_exceptions:"", //not added in form 
    team_id: team_id, 
    team_text:team_text,
    away_team_text:away_team_text,
    wardrobe_id: wardrobe_id,
    wardrobe_id_away: wardrobe_id_away,
    wardrobe_id_referee: wardrobe_id_referee,
    wardrobe_extra_time: wardrobe_extra_time,
    description:description,
    isPublic: false //not added in front end
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
  
  //Wardrobes
  const getWardrobes = (access_token: string): AxiosRequestConfig => {
    return {
      url: `${configs.app.api}/booking/getWardrobes`,
      method: 'post',
      data: {
        access_token,
      },
    };
  };
  
  const createWardrobes = (access_token: string,club_id:number) => {
    return axios.post(`${configs.app.api}/booking/updateWardrobes`, {
      access_token,
      club_id:club_id,
      updateType: "create",
      wardrobe_id: "",
      wardrobe_name: " ",
      wardrobe_maxCapacity: " ",
      wardrobe_description: " "
    });
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
  addActivity
  

};
