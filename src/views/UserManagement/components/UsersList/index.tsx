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
import { User } from '@cenera/models';
import { useShowConfirmDialog } from '@cenera/common/hooks/confirmDialog';
import { UserService } from '@cenera/services/api';
import { useAppContext } from '@cenera/app-context';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

import styles from './styles';

const useStyles = makeStyles(styles as any);

type Props = {
  users: User[];
  loading: boolean;
  error: any;
  onUserSelected: (user: User) => void;
  onUserDeleted: (user: User) => void;
  onCreateNewUserClicked: () => void;
};

export const UsersList: FC<Props> = ({
  users,
  loading,
  error,
  onUserSelected,
  onUserDeleted,
  onCreateNewUserClicked,
}: Props) => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [appState] = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = (data: any[]) => {
    const userId = data[0] as number;
    setDeleting(true);

    UserService.deleteUser(userId, appState.authentication.accessToken)
      .then(res => {
        setDeleting(false);

        if (res.data) {
          onUserDeleted(users.find(c => c.user_id === userId));
          showSuccessMessage();
        } else {
          enqueueSnackbar('Something happened while trying to delete the user', { variant: 'error' });
        }
      })
      .catch(err => {
        setDeleting(false);
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      });
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const userId = parseInt(event.currentTarget.dataset.userId, 10);
    showConfirmDialog(userId);
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteUser,
    successMessage: 'The User deleted successfully',
    confirmMessage: 'The selected user will be deleted for good!',
  });

  const handleUserEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const userId = event.currentTarget.dataset.userId;
    onUserSelected(users.find(c => c.user_id === parseInt(userId, 10)));
  };

  return (
    <Card>
      <CardHeader className={classes.cardHeader}>
        <h6>List of Users</h6>

        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          size="small"
          startIcon={<AddIcon />}
          onClick={onCreateNewUserClicked}>
          Create User
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
            <List component="nav" aria-label="users list">
              {users.map(user => (
                <ListItem key={user.user_id} button={true}>
                  <ListItemText primary={user.user_login} />
                  <ListItemSecondaryAction>
                    <IconButton data-user-id={user.user_id} edge="end" aria-label="edit" onClick={handleUserEditClick}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton data-user-id={user.user_id} edge="end" aria-label="delete" onClick={handleDeleteClick}>
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
