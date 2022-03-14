import React, { FC, useCallback, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSnackbar } from "notistack";

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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Team, TeamPlayer } from "@cenera/models";
import { PlayerService } from "@cenera/services/api/players";
import { useAppContext } from "@cenera/app-context";
import { getErrorMessage } from "@cenera/common/utils/error-helper";

import styles from "./styles";

const useStyles = makeStyles(styles as any);

type Props = {
  teams: Team[];
  loading: boolean;
  error: any;
  onPlayerSelected: (
    player: TeamPlayer,
    teamId: number,
    clubId: number
  ) => void;
  onPlayerDeleted: (player: TeamPlayer) => void;
  onAddNewPlayerClick: (clubId: number, teamId: number) => void;
};

export const PlayersList: FC<Props> = ({
  teams,
  loading,
  error,
  onPlayerSelected,
  onPlayerDeleted,
  onAddNewPlayerClick,
}: Props) => {
  const classes = useStyles();
  const [alert, setAlert] = useState(null);
  const [deleting, setDeleting] = useState(false);
  // const [selectedTeam, setSelectedTeam] = useState(null);
  const [appState] = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  const deletePlayer = useCallback(
    (playerId: number, teamId: number, clubId: number) => {
      setDeleting(true);
      setAlert(null);

      PlayerService.deletePlayer(
        playerId,
        teamId,
        clubId,
        appState.authentication.accessToken
      )
        .then((res) => {
          setDeleting(false);

          if (res.data) {
            const players = teams.find((t) => t.team_id === teamId).players;

            onPlayerDeleted(players.find((c) => c.player_id === playerId));

            setAlert(
              <SweetAlert
                success={true}
                style={{ display: "block" }}
                title="Deleted!"
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnCssClass={classes.button + " " + classes.success}
              >
                The Player deleted successfully
              </SweetAlert>
            );
          } else {
            setAlert(null);
            enqueueSnackbar(
              "Something happened while trying to delete the player",
              { variant: "error" }
            );
          }
        })
        .catch((err) => {
          setDeleting(false);
          enqueueSnackbar(getErrorMessage(err), { variant: "error" });
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teams, loading, error, onPlayerDeleted]
  );

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const playerId = parseInt(event.currentTarget.dataset.playerId, 10);
      const teamId = parseInt(event.currentTarget.dataset.teamId, 10);
      const clubId = parseInt(event.currentTarget.dataset.clubId, 10);

      setAlert(
        <SweetAlert
          warning={true}
          style={{ display: "block" }}
          title="Are you sure?"
          onConfirm={() => deletePlayer(playerId, teamId, clubId)}
          onCancel={() => setAlert(null)}
          confirmBtnCssClass={classes.button + " " + classes.success}
          cancelBtnCssClass={classes.button + " " + classes.danger}
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel={true}
        >
          The selected player will be deleted for good!
        </SweetAlert>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deletePlayer]
  );

  const handleAddPlayerClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const teamId = parseInt(event.currentTarget.dataset.teamId, 10);
      const clubId = parseInt(event.currentTarget.dataset.clubId, 10);
      onAddNewPlayerClick(clubId, teamId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAddNewPlayerClick]
  );

  const handlePlayerEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const playerId = event.currentTarget.dataset.playerId;
    const teamId = event.currentTarget.dataset.teamId;
    const clubId = parseInt(event.currentTarget.dataset.clubId, 10);
    const players = teams.find((t) => t.team_id === parseInt(teamId, 10))
      .players;
    onPlayerSelected(
      players.find((c) => c.player_id === parseInt(playerId, 10)),
      parseInt(teamId),
      clubId
    );
  };

  return (
    <Card>
      <CardHeader>
        <h6>List of Players</h6>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {alert}
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <CircularProgress className={classes.circularProgress} size="24px" />
        ) : (
          <div className={classes.root}>
            {teams.map((team) => (
              <ExpansionPanel
                key={team.team_id}
                data-team-id={team.team_id}
                TransitionProps={{ unmountOnExit: true }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{team.team_name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.panelContainer}>
                    <Button
                      variant="contained"
                      className={classes.addButton}
                      size="small"
                      startIcon={<AddIcon />}
                      data-team-id={team.team_id}
                      data-club-id={team.club_id}
                      onClick={handleAddPlayerClick}
                    >
                      Add Player
                    </Button>
                    <List
                      component="nav"
                      aria-label="players list"
                      className={classes.listContainer}
                    >
                      {team.players && team.players.length > 0 ? (
                        team.players.map((player) => (
                          <ListItem key={player.player_id} button={true}>
                            <ListItemText
                              primary={`${player.player_firstname} ${player.player_lastname}`}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                data-player-id={player.player_id}
                                data-team-id={team.team_id}
                                data-club-id={team.club_id}
                                edge="end"
                                aria-label="edit"
                                onClick={handlePlayerEditClick}
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                              <IconButton
                                data-player-id={player.player_id}
                                data-team-id={team.team_id}
                                edge="end"
                                aria-label="delete"
                                onClick={handleDeleteClick}
                              >
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))
                      ) : (
                        <h6>No player in this team</h6>
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
