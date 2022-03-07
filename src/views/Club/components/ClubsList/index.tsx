import React, { FC, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useSnackbar } from 'notistack';

import { makeStyles, CircularProgress, ListItemSecondaryAction, IconButton, Backdrop } from '@material-ui/core';

import { CardHeader, Card, CardBody } from '@cenera/components/Card';
import { Club } from '@cenera/models';
import { useShowConfirmDialog } from '@cenera/common/hooks/confirmDialog';
import { ClubService } from '@cenera/services/api/clubs';
import { useAppContext } from '@cenera/app-context';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

import styles from './styles';

const useStyles = makeStyles(styles as any);

type Props = {
  clubs: Club[];
  loading: boolean;
  error: any;
  onClubSelected: (club: Club) => void;
  onClubDeleted: (club: Club) => void;
  onCreateNewClubClicked: () => void;
};

export const ClubsList: FC<Props> = ({
  clubs,
  loading,
  error,
  onClubSelected,
  onClubDeleted,
  onCreateNewClubClicked,
}: Props) => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [appState] = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  const deleteClub = (data: any[]) => {
    const clubId = data[0] as number;
    setDeleting(true);

    ClubService.deleteClub(clubId, appState.authentication.accessToken)
      .then(res => {
        setDeleting(false);

        if (res.data) {
          onClubDeleted(clubs.find(c => c.club_id === clubId));
          showSuccessMessage();
        } else {
          enqueueSnackbar('Something happened while trying to delete the club', { variant: 'error' });
        }
      })
      .catch(err => {
        setDeleting(false);
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      });
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clubId = parseInt(event.currentTarget.dataset.clubId, 10);
    showConfirmDialog(clubId);
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteClub,
    successMessage: 'The Club deleted successfully',
    confirmMessage: 'The selected club will be deleted for good!',
  });

  const handleClubEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clubId = event.currentTarget.dataset.clubId;
    onClubSelected(clubs.find(c => c.club_id === parseInt(clubId, 10)));
  };

  return (
    <Card>
      <CardHeader className={classes.cardHeader}>
        <h6>List of Clubs</h6>

        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          size="small"
          startIcon={<AddIcon />}
          onClick={onCreateNewClubClicked}>
          Create Club
        </Button>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {alert}
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <CircularProgress className={classes.circularProgress} size="24px" />
        ) : (
          <div className={classes.root}>
            <List component="nav" aria-label="clubs list">
              {clubs.map(club => (
                <ListItem key={club.club_id} button={true}>
                  <ListItemText primary={club.club_name} />
                  <ListItemSecondaryAction>
                    <IconButton data-club-id={club.club_id} edge="end" aria-label="edit" onClick={handleClubEditClick}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton data-club-id={club.club_id} edge="end" aria-label="delete" onClick={handleDeleteClick}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <Backdrop className={classes.backdrop} open={deleting}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardBody>
    </Card>
  );
};
