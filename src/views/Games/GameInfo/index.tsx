import React, { FC, useEffect, useState,useContext } from 'react';
import { useFormik } from 'formik';
import { makeStyles, CircularProgress, Backdrop } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useAppContext,appContext } from '@cenera/app-context';
import { GameService } from '@cenera/services/api/game';
import { getErrorMessage } from '@cenera/common/utils/error-helper';
import { useFetchGameInfo } from '@cenera/common/hooks/api-hooks';
import { useFetchTeams } from '@cenera/common/hooks/api-hooks'; // new
import { useShowConfirmDialog } from '@cenera/common/hooks/confirmDialog';
import { GridContainer, GridItem } from '@cenera/components/Grid';
import { CardHeader, Card, CardBody } from '@cenera/components/Card';
import { CustomInput } from '@cenera/components/CustomInput/CustomInput';
import { Button } from '@cenera/components/Button/Button';
import Teampicker from '@cenera/views/Games/TeamPicker/TeamPicker'; //new
import { styles } from './styles';

const useStyles = makeStyles(styles as any);

export const GameInfo: FC = () => {    
  const classes = useStyles();
  const [appState] = useAppContext();
  const [teamsList, setTeamsList] = useState(null); //new
  const [teamId, setTeamId] = useState<any>((appState.teamId)?appState.teamId:''); //new
  const [deleting, setDeleting] = useState(false);

  
  const { gameInfo, loading, revalidate } = useFetchGameInfo(teamId);  
  const { teams, loading:loadingTeam} = useFetchTeams(); // new
  const [showDropDown , setshowDropDown] = useState(false);  // for showing drop down
 
  const { enqueueSnackbar } = useSnackbar();
  
  const {dispatch} = useContext(appContext);  //use SetTeamId 

  const deleteGameInfo = () => {
    setDeleting(true);
    GameService.deleteGameInfo(appState.authentication.accessToken)
      .then(() => {
        showSuccessMessage();
        revalidate();
      })
      .catch(err => {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const handleDeleteClick = async () => {
    await GameService.deleteGameInfo(appState.authentication.accessToken,teamId);
    showConfirmDialog();
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteGameInfo,
    successMessage: 'Game Info deleted successfully',
    confirmMessage: 'Game Info will be deleted for good!',
  });


  const initialFormValues = {
    spectators: gameInfo ? gameInfo.game_info_spectators : '',
    lottery: gameInfo ? gameInfo.game_info_lottery : '',
    nextgame1: gameInfo ? gameInfo.game_info_nextgame1 : '',
    nextgame2: gameInfo ? gameInfo.game_info_nextgame2 : '',
    kioskinfo: gameInfo ? gameInfo.game_info_kioskinfo : '',
    ticketprice: gameInfo ? gameInfo.game_info_ticketprice : '',
    message1: gameInfo ? gameInfo.game_message1: '',
    message2: gameInfo ? gameInfo.game_message2 : '',

    lineupsystem: gameInfo ? gameInfo.game_lineupsystem : '',

  };

  console.log(teams);

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async formValues => {
      try {
        const result = await GameService.updateGameInfo(
          {
            team_id: teamId, //new
            game_info_spectators: formValues.spectators,
            game_info_lottery: formValues.lottery,
            game_info_nextgame1: formValues.nextgame1,
            game_info_nextgame2: formValues.nextgame2,
            game_info_kioskinfo: formValues.kioskinfo,
            game_info_ticketprice: formValues.ticketprice,
            game_lineupsystem: formValues.lineupsystem,
            game_message1:formValues.message1,
            game_message2:formValues.message2, 

          },
          appState.authentication.accessToken
        );
        enqueueSnackbar(result.data.message, { variant: 'success' });
        revalidate();
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      }
    },
  });

  // Update form fields when we previous fresh data from server
  useEffect(() => {
    if (!loading && gameInfo) {
      formik.setValues({
        spectators: gameInfo.game_info_spectators,
        lottery: gameInfo.game_info_lottery,
        nextgame1: gameInfo.game_info_nextgame1,
        nextgame2: gameInfo.game_info_nextgame2,
        kioskinfo: gameInfo.game_info_kioskinfo,
        ticketprice: gameInfo.game_info_ticketprice,
        lineupsystem: gameInfo.game_lineupsystem,
        message1: gameInfo.game_message1,
        message2: gameInfo.game_message2,
      });

      console.log("test" , gameInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, gameInfo, teamId]);

  useEffect(() => {   //new
    if (!loadingTeam && teams) {
      setTeamsList(teams);
      if(teamsList){
        if(appState.teamId!=null)
        setTeamId(appState.teamId)
        else
        setTeamId(teamsList[0].team_id) //setting team id for showing default game info of first team
        let a = teams.find(res=>res.team_id===teamId);
        dispatch({ type: 'TEAM_NAME', payload: (a && a.team_name)});
      }
    }
  }, [loadingTeam, teams,teamsList,teamId]);

 //check if user is clubadmin then hide the team dropdown 
  useEffect(()=>{  
          if(appState.user.user_type==="clubAdmin" && teamsList !== null){
            setshowDropDown(true)
          }else{
            setshowDropDown(false)
            setTeamId(null);
          }
  },[teamsList]);

  function handleTeamChange(e:any):void{  //new
    setTeamId(e.target.value);
    dispatch({ type: 'APP_LINEUP_TEAMID', payload: e.target.value}); //setteamid 
   
  }

  const { values, touched, errors, handleChange, handleBlur } = formik;
  return (
    <div>
      <GridContainer>
        <GridItem xs={8} sm={8} md={8} xl={9} className={classes.container}>
        {showDropDown? (teamsList && <Teampicker teamList={teamsList} onChange={handleTeamChange} value={teamId} id={'test'} /> ): ""}
          <Card>
            <CardHeader>
              <h4>Game Information</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <GridContainer>
                  <GridItem xs={4} md={4}>
                    
                    <CustomInput
                      error={touched.lottery && errors.lottery ? true : false}
                      labelText="Lottery 1"
                      id="lottery"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.lottery,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />

                    <CustomInput
                      error={touched.ticketprice && errors.ticketprice ? true : false}
                      labelText="Lottery 2"
                      id="ticketprice"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.ticketprice,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />  

                     <CustomInput
                      error={touched.kioskinfo && errors.kioskinfo ? true : false}
                      labelText="Lottery 3"
                      id="kioskinfo"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.kioskinfo,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />  
                     
                     
                    <CustomInput
                      error={touched.nextgame1 && errors.nextgame1 ? true : false}
                      labelText="Next Game 1"
                      id="nextgame1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.nextgame1,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />
                    
                    <CustomInput
                      error={touched.nextgame2 && errors.nextgame2 ? true : false}
                      labelText="Next Game 2"
                      id="nextgame2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.nextgame2,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />

                   

                                  
                    {/* upper  */}
                    <CustomInput
                      error={touched.ticketprice && errors.ticketprice ? true : false}
                      labelText="Message 1"
                      id="message1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.message1,  // message 1 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />
                  
                    <CustomInput
                      error={touched.ticketprice && errors.ticketprice ? true : false}
                      labelText="Message 2"
                      id="message2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.message2,  // message 2 is static for while
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />

                    <CustomInput
                      error={touched.spectators && errors.spectators ? true : false}
                      labelText="Spectators"
                      id="spectators"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.spectators,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                      }}
                    />

                    <CustomInput
                      labelText="Lineup System"
                      id="lineupsystem"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.lineupsystem,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        type: 'text',
                        disabled: true,
                      }}
                    />
                   

                  </GridItem>
                </GridContainer>

                <div className={classes.btnContainer}>
                  <Button
                    color="info"
                    className={classes.btnSubmit}
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    disableRipple={formik.isSubmitting || !formik.isValid}
                    disableFocusRipple={formik.isSubmitting || !formik.isValid}>
                    Edit Information
                  </Button>

                  <Button
                    color="warning"
                    onClick={handleDeleteClick}
                    className={classes.btnDelete}
                    disabled={deleting}
                    disableRipple={deleting}
                    disableFocusRipple={deleting}>
                    Delete Game Info
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
      <Backdrop className={classes.backdrop} open={formik.isSubmitting || loading || deleting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
