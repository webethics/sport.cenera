import React, { FC, useCallback, useState,useContext  } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSnackbar } from 'notistack';

import {
  makeStyles,
  CircularProgress,
  ListItemSecondaryAction,
  IconButton,
  Backdrop,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import { CardHeader, Card, CardBody } from '@cenera/components/Card';
import { Team, Club } from '@cenera/models';
import { TeamService } from '@cenera/services/api/teams';
import { useAppContext ,appContext} from '@cenera/app-context';
import { getErrorMessage } from '@cenera/common/utils/error-helper';
// import { useFetchTeams } from '@cenera/common/hooks/api-hooks'; // new


import styles from './styles';

const useStyles = makeStyles(styles as any);

type Props = {
  teams: Team[];
  clubs: Club[];
  loading: boolean;
  error: any;
  onTeamSelected: (team: Team) => void;
  onTeamDeleted: (team: Team) => void;
  onAddNewTeamClick: (clubId: number) => void;
};

export const TeamsList: FC<Props> = ({clubs,teams,loading,error,onTeamSelected,onTeamDeleted,onAddNewTeamClick}: Props) => {
  const classes = useStyles();
  const [alert, setAlert] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [appState] = useAppContext();
  const {dispatch} = useContext(appContext);  //use SetTeamId 
  // const { teams:teams, loading:loadingTeam} = useFetchTeams(); // new for getting team list show that can show slected team
 
 

 

  const { enqueueSnackbar } = useSnackbar();


  const successDelete = () => {
    setAlert(
      <SweetAlert
        success={true}
        style={{ display: 'block' }}
        title="Deleted!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnCssClass={classes.button + ' ' + classes.success}>
        The Team deleted successfully
      </SweetAlert>
    );
  };

  const deleteTeam = (teamId: number) => {
    setDeleting(true);
    setAlert(null);

    TeamService.deleteTeam(teamId, appState.authentication.accessToken)
      .then(res => {
        setDeleting(false);

        if (res.data) {
          onTeamDeleted(teams.find(c => c.team_id === teamId));

          successDelete();
        } else {
          setAlert(null);
          enqueueSnackbar('Something happened while trying to delete the team', { variant: 'error' });
        }
      })
      .catch(err => {
        setDeleting(false);
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      });
  };

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const teamId = parseInt(event.currentTarget.dataset.teamId, 10);

      setAlert(
        <SweetAlert
          warning={true}
          style={{ display: 'block' }}
          title="Are you sure?"
          onConfirm={() => deleteTeam(teamId)}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.button + ' ' + classes.success}
          cancelBtnCssClass={classes.button + ' ' + classes.danger}
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel={true}>
          The selected team will be deleted for good!
        </SweetAlert>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTeamEditClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const teamId = event.currentTarget.dataset.teamId;
    onTeamSelected(teams.find(c => c.team_id === parseInt(teamId, 10)));

    const {team_name} = teams.find(res=>res.team_id===parseInt(teamId)); // new for showing selected team name with club name in top right corner 
    dispatch({ type: 'TEAM_NAME', payload: team_name}); //for setteamid  show that i can keep slected  keep team selected
   
  };


  const handleAddTeamClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const clubId = parseInt(event.currentTarget.dataset.clubId, 10);

      onAddNewTeamClick(clubId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAddNewTeamClick]
  );

  return (
    <Card>
      <CardHeader className={classes.cardHeader}>
        <h6>List of Teams </h6>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {alert}
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <CircularProgress className={classes.circularProgress} size="24px" />
        ) : (
          <div className={classes.root}>
            {clubs.map(club => (
              <ExpansionPanel key={club.club_id} data-club-id={club.club_id} TransitionProps={{ unmountOnExit: true }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography className={classes.heading}>{club.club_name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.panelContainer}>
                    <Button
                      variant="contained"
                      className={classes.addButton}
                      size="small"
                      startIcon={<AddIcon />}
                      data-club-id={club.club_id}
                      onClick={handleAddTeamClick}>
                      Add Team
                    </Button>
                    <List component="nav" aria-label="Teams List" className={classes.listContainer}>
                      {club.teams && club.teams.length > 0 ? (
                        club.teams.map(team => (
                          <ListItem key={team.team_id} button={true}>
                            <ListItemText primary={`${team.team_name}`} />
                            <ListItemSecondaryAction>
                              <IconButton
                                data-team-id={team.team_id}
                                edge="end"
                                aria-label="edit"
                                onClick={handleTeamEditClick}>
                                <EditIcon color="primary" />
                              </IconButton>
                              <IconButton
                                data-team-id={team.team_id}
                                edge="end"
                                aria-label="delete"
                                onClick={handleDeleteClick}>
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))
                      ) : (
                        <h6>No teams in this club</h6>
                      )}
                    </List>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        )}
        <Backdrop className={classes.backdrop} open={deleting}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardBody>
    </Card>
  );
};
