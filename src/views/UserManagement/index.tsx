import React, { FC, useState } from "react";
import { GridContainer, GridItem } from "@cenera/components/Grid";

import { UsersList } from "./components/UsersList";
import { CreateEditUser } from "./components/CreateEditUser";
import { useFetchUsers, useFetchClubs } from "@cenera/common/hooks/api-hooks";
import { User } from "@cenera/models";
import { Card, CardBody } from "@cenera/components/Card";
import { CircularProgress } from "@material-ui/core";

export const UsersManagement: FC = () => {
  const { users, loading, error, revalidate } = useFetchUsers();
  const { clubs, loading: clubsLoading } = useFetchClubs();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUsersUpdate = () => {
    revalidate();
    setSelectedUser(null);
  };

  const handleUserSelect = (club: User) => {
    setSelectedUser(club);
  };

  const handleUserDelete = () => {
    revalidate();
  };

  const handleEditCancel = () => {
    setSelectedUser(null);
    setShowCreateForm(false);
  };

  const handleCreateNewUserClick = () => {
    setShowCreateForm(true);
    setSelectedUser(null);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4} xl={3}>
          <UsersList
            users={users}
            loading={loading}
            error={error}
            onUserSelected={handleUserSelect}
            onUserDeleted={handleUserDelete}
            onCreateNewUserClicked={handleCreateNewUserClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8} xl={9}>
          {showCreateForm || selectedUser ? (
            clubsLoading ? (
              <Card>
                <CardBody>
                  <p style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </p>
                </CardBody>
              </Card>
            ) : (
              <CreateEditUser
                key={selectedUser ? selectedUser.user_id : 0}
                clubs={clubs}
                onUserCreateOrEdit={handleUsersUpdate}
                toEditUser={selectedUser}
                onEditCancel={handleEditCancel}
              />
            )
          ) : (
            <Card>
              <CardBody>
                <p style={{ textAlign: "center" }}>
                  Please click add team on the left side or edit a team.
                </p>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};
