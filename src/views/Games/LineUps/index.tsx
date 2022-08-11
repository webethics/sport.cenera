import React, { FC, useState, useEffect, useContext } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import {Teampicker} from "@cenera/views/Games/TeamPicker/TeamPicker"

import { useFetchClub, useFetchTeam, useFetchTeams , useFetchGameInfo } from '@cenera/common/hooks/api-hooks'; //useFetchTeams new
import { useAppContext,appContext} from '@cenera/app-context';
import { IceHockeyLineUp } from './IceHockey';
import { FootballLineUp } from './Football';
import { HandballLineUp } from './Handball';
import { LoadingOrError } from './LoadingOrError';

import { GridContainer, GridItem } from '@cenera/components/Grid'; //new
import {  Card } from '@cenera/components/Card'; // new
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';

const useStyles = makeStyles(styles as any);


export const GameLineUp: FC = () => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [teamId, setTeamId] = useState<any>((appState.teamId)?appState.teamId:'');

  const { gameInfo, loading: gameInfoLoading, revalidate: revalidateGameInfo } = useFetchGameInfo(teamId !== null && teamId);
  const { club, loading: clubLoading } = useFetchClub(appState.user.club_id);
  const { team, loading: teamLoading } = useFetchTeam(teamId);
  const { teams, loading:loadingTeams} = useFetchTeams(); // new
  const [teamsList, setTeamsList] = useState(null); //new
  
  const [noProfessionalTeam, setNoProfessionalTeam] = useState(false);

  const [showDropDown , setshowDropDown] = useState(false);  // forshowin

  const {dispatch} = useContext(appContext);  //use SetTeamId 


 useEffect(() => {   //new
    if (!loadingTeams && teams) {
      setTeamsList(teams);
    }    
  }, [loadingTeams,teams]);
  
 //check if user is clubadmin then hide the team dropdown 
  useEffect(()=>{  
          if( teamsList !== null){
            setshowDropDown(true)
          }else{
            setshowDropDown(false)
            setTeamId(null);
          }
  },[teamsList,appState.user.user_type]);


  useEffect(() => {
    if (!clubLoading && club) {
      const professionalTeam = club.teams.find(t => t.team_type === 'professional');
      if (professionalTeam) {
        if(teamsList){
          if(appState.teamId!=null)
         { setTeamId(appState.teamId)
          let a = teamsList.find((item: any)=>item.team_id===teamId);
          dispatch({ type: 'TEAM_NAME', payload: (a && a.team_name)});
        }
          else
         { setTeamId(teamsList[0].team_id)  //setting team id for showing default game info of first team
          let a = teamsList.find((item: any)=>item.team_id===teamId);
          dispatch({ type: 'TEAM_NAME', payload: (a && a.team_name)});
        }
        }
      } else {
        setNoProfessionalTeam(true);
      }
    }
  }, [club, clubLoading,teamsList,appState.teamId,teamId]);

      
   
   function handleTeamChange(e:any):void{  //new
    setTeamId(e.target.value);
    dispatch({ type: 'APP_LINEUP_TEAMID', payload: e.target.value});
   

  }


  if (!clubLoading && !club) {
    return (
      <LoadingOrError
        title="Club not found!"
        text1={`Your Club with id ${appState.user.club_id} was not found.`}
        text2="Please contact the website administrator to investigate this issue."
      />
    );
  }

  if (!noProfessionalTeam && (clubLoading || teamLoading || gameInfoLoading)) {
    return (
      <Backdrop style={{ zIndex: 1999 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  

  return (
    <>
     <div>
      
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={10} className={classes.container}>
        {showDropDown?(teamsList &&  <Teampicker teamList={teamsList} onChange={handleTeamChange}  value={teamId}  />):""}
          <Card>
      {noProfessionalTeam ? (
        <LoadingOrError
          title="No Professional Team"
          text1="No Professional Team is registered in your club."
          text2="Please Contact the club admin to resolve this issue."
        />
      ) : (
        <>
          {club.club_sportstype === 'icehockey' ? (
            <>
            <IceHockeyLineUp players={team.players} gameInfo={gameInfo} team={teams} team_id={teamId} revalidateGameInfo={revalidateGameInfo} />
            </>
          ) : club.club_sportstype === 'football' ? (
            <FootballLineUp
              players={team.players} 
              team_id={teamId}
              gameInfo={gameInfo}
              onLineUpDeleted={revalidateGameInfo}
              onLineUpUpdated={revalidateGameInfo}
            />
          ) : (
            <HandballLineUp
              players={team.players}
              team_id={teamId}
              gameInfo={gameInfo}
              onLineUpDeleted={revalidateGameInfo}
              onLineUpUpdated={revalidateGameInfo}
            />
          )}
        </>
      )}
       </Card>
      </GridItem>
      </GridContainer>
      </div>
      </>
  );
};