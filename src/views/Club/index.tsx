import React, { FC, useState } from 'react';
import { GridContainer, GridItem } from '@cenera/components/Grid';

import { ClubsList } from './components/ClubsList';
import { CreateEditClub } from './components/CreateEditClub';
import { useFetchClubs } from '@cenera/common/hooks/api-hooks';
import { Club } from '@cenera/models';
import { Card, CardBody } from '@cenera/components/Card';

export const ClubsManagement: FC = () => {
  const { clubs, loading, error, revalidate } = useFetchClubs();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleClubsUpdate = () => {
    revalidate();
    setSelectedClub(null);
  };

  const handleClubSelect = (club: Club) => {
    setSelectedClub(club);
  };

  const handleClubDelete = () => {
    revalidate();
  };

  const handleEditCancel = () => {
    setSelectedClub(null);
    setShowCreateForm(false);
  };

  const handleCreateNewClubClick = () => {
    setShowCreateForm(true);
    setSelectedClub(null);
  };

  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4} xl={3}>
          <ClubsList
            clubs={clubs}
            loading={loading}
            error={error}
            onClubSelected={handleClubSelect}
            onClubDeleted={handleClubDelete}
            onCreateNewClubClicked={handleCreateNewClubClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8} xl={9}>
          {showCreateForm || selectedClub ? (
            <CreateEditClub
              key={selectedClub ? selectedClub.club_id : 0}
              onClubCreateOrEdit={handleClubsUpdate}
              toEditClub={selectedClub}
              onEditCancel={handleEditCancel}
            />
          ) : (
            <Card>
              <CardBody>
                <p style={{ textAlign: 'center' }}>Please click add team on the left side or edit a team.</p>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};
