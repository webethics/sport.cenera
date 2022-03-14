import React, { FC, useState } from 'react';
import { GridContainer, GridItem } from '@cenera/components/Grid';

import { TeamsList } from './components/TeamsList';
import { CreateEditTeam } from './components/CreateEditTeam';
import { useFetchTeams, useFetchClubs } from '@cenera/common/hooks/api-hooks';
import { Team } from '@cenera/models';
import { Card, CardBody } from '@cenera/components/Card';

export const TeamsManagement: FC = () => {
  const { teams, loading: teamsLoading, error: teamsError, revalidate: revalidateTeams } = useFetchTeams();
  const { clubs, loading: clubsLoading, error: clubsError, revalidate: revalidateClubs } = useFetchClubs();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(0);

  
  const handleTeamsUpdate = () => {
    revalidateTeams();
    revalidateClubs();
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleTeamDelete = () => {
    revalidateTeams();
    revalidateClubs();
  };

  const handleEditCancel = () => {
    setSelectedTeam(null);
    setShowCreateForm(false);
  };

  const handeAddNewTeamClick = (clubId: number) => {
    setShowCreateForm(true);
    setSelectedTeam(null);
    setSelectedClubId(clubId);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4} xl={3}>
          <TeamsList
            teams={teams}
            loading={teamsLoading || clubsLoading}
            error={teamsError || clubsError}
            clubs={clubs}
            onTeamSelected={handleTeamSelect}
            onTeamDeleted={handleTeamDelete}
            onAddNewTeamClick={handeAddNewTeamClick}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={8} xl={9}>
          {showCreateForm || selectedTeam ? (
            <CreateEditTeam
              key={selectedTeam ? selectedTeam.team_id : 0}
              onTeamCreateOrEdit={handleTeamsUpdate}
              toEditTeam={selectedTeam}
              onEditCancel={handleEditCancel}
              selectedClubId={selectedClubId}
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
