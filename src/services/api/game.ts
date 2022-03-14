//import axios, { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import configs from '@cenera/configs';
import { GameInfo, GameLineUp, GameMatchRecord } from '@cenera/models';
import { GameInfoUpdateReqResponse } from './types';

const getGameInfo = (access_token: string , team_id:number): any => {
  if(team_id===null  || typeof(team_id)!=="number"){
    return 
  }
   else{
    return {
      url: `${configs.app.api}/getGameInfo`,
      method: 'post',
      data: {
        access_token,
        team_id:team_id
      },
    };
   }
  
};


const updateGameInfo = (gameInfo: GameInfo, access_token: string) => {
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameInfo`, {
    access_token,
    updateType: 'update',
    team_id: gameInfo.team_id, //new
    game_info_spectators: gameInfo.game_info_spectators,
    game_info_lottery: gameInfo.game_info_lottery,
    game_info_nextgame1: gameInfo.game_info_nextgame1,
    game_info_nextgame2: gameInfo.game_info_nextgame2,
    game_kioskinfo: gameInfo.game_info_kioskinfo,
    game_ticketprice: gameInfo.game_info_ticketprice,
    game_message1:gameInfo.game_message1,
    game_message2:gameInfo.game_message2, 
    game_lineupsystem: gameInfo.game_lineupsystem,

  });
};

const deleteGameInfo = (access_token: string,team_id?:number) => {  //team_id added new
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameInfo`, {
    access_token,
    updateType: 'delete',
    team_id:team_id   //new
  });
};

const createGameLineUp = (gameLineUp: GameLineUp, access_token: string,team_id?:number) => {  // team id new
  console.log(gameLineUp)
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameLineup`, {
    access_token,
    team_id: team_id, 
    updateType: gameLineUp.lineup_id ? 'update' : 'create',
    ...gameLineUp,
  });
};

const deleteGameLineUp = async(lineup_id: number | string | any, access_token: string, team_id?:number,deleteGameName?:string) => {  //edited added any after string | 

  console.log("from servies file" , lineup_id);
 
  if(deleteGameName === "handball" || deleteGameName === "football"){  // for handball only
    let newVAr:any = null; // new
    const deleteLineLoop = async ()=> {
      for(let linup_id of lineup_id) {
        const updatedLineData =  await axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameLineup`, {
          access_token,
          team_id:team_id,
          lineup_id:linup_id,
          updateType: 'delete',
        });
        newVAr = updatedLineData  // new
      }
    }
    
     await deleteLineLoop();
     return newVAr;

  }else{
    return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameLineup`, {
      access_token,
      team_id:team_id,
      lineup_id,
      updateType: 'delete',
    });
  }
};





const createGameMatchRecord = (gameMatchRecord: GameMatchRecord, access_token: string, team_id:number) => {
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameOthermatches`, {
    access_token,
    team_id:team_id, //new
    updateType: gameMatchRecord.match_id ? 'update' : 'create',
    ...gameMatchRecord,
  });
};

const deleteGameMatchRecord = (match_id: number, access_token: string) => {
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameOthermatches`, {
    access_token,
    match_id,
    updateType: 'delete',
  });
};

const getGameAwayTeam = (access_token: string , team_id:number):any => {
  console.log(  'team id and access token',team_id , access_token);
  if(team_id===null || typeof(team_id)!=="number"){
    console.log('hit');
    return 
  }
  else{
    return {
      url: `${configs.app.api}/getGameAwayTeam`,
      method: 'post',
      data: {
        access_token,
        team_id:team_id
      },
    };
  }
  
};

const updateGameAwayTeam = (awayInfo: any) => {
  console.log('hit');
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameAwayTeam`, {
    
    access_token:awayInfo.access_token,
    team_id: awayInfo.team_id, //new
    updateType: 'update',
             awayTeam_name: awayInfo.awayTeam_name,
             awayTeam_description:awayInfo.awayTeam_description,
             awayTeam_image:awayInfo.awayTeam_image,
             awayTeam_player1:awayInfo.awayTeam_player1,
             awayTeam_player2:awayInfo.awayTeam_player2,
             awayTeam_player3:awayInfo.awayTeam_player3,
             awayTeam_player4:awayInfo.awayTeam_player4,
             awayTeam_player5:awayInfo.awayTeam_player5,
             awayTeam_player6:awayInfo.awayTeam_player6,
             awayTeam_player7:awayInfo.awayTeam_player7,
             awayTeam_player8:awayInfo.awayTeam_player8,
             awayTeam_player9:awayInfo.awayTeam_player9,
             awayTeam_player10:awayInfo.awayTeam_player10,
             awayTeam_player11:awayInfo.awayTeam_player11,
             awayTeam_player12:awayInfo.awayTeam_player12,
             awayTeam_player13:awayInfo.awayTeam_player13,
             awayTeam_player14:awayInfo.awayTeam_player14,
             awayTeam_player15:awayInfo.awayTeam_player15,
             awayTeam_player16:awayInfo.awayTeam_player16,
             awayTeam_player17:awayInfo.awayTeam_player17,
             awayTeam_player18:awayInfo.awayTeam_player18,
             awayTeam_player19:awayInfo.awayTeam_player19,
             awayTeam_player20:awayInfo.awayTeam_player20,
             awayTeam_player21:awayInfo.awayTeam_player21,
             awayTeam_player22:awayInfo.awayTeam_player22,
  });
};

const deleteGameAwayTeam =(access_token:any,team_id:any) => {
  console.log('hit');  
  console.log(team_id,access_token);
  return axios.post<GameInfoUpdateReqResponse>(`${configs.app.api}/updateGameAwayTeam`, {
    access_token,
    team_id:team_id,  
    updateType: 'delete',
  });
};





export const GameService = {
  getGameInfo,
  updateGameInfo,
  getGameAwayTeam,
  updateGameAwayTeam,
  deleteGameAwayTeam,
  deleteGameInfo,
  createGameLineUp,
  deleteGameLineUp,
  createGameMatchRecord,
  deleteGameMatchRecord,
};



