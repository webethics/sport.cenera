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
  return {
    url: `${configs.app.api}/api/booking/getClubsPublic`,
    method: 'get',
  };
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
  

};
