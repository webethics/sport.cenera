import React, { FC, useState } from "react";
import { GridContainer, GridItem } from "@cenera/components/Grid";

import { PlayersList } from "./components/PlayersList";
import { CreateEditPlayer } from "./components/CreateEditPlayer";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks";
import { TeamPlayer } from "@cenera/models";
import { useFetchPlayer } from "@cenera/common/hooks";
import { Card, CardBody } from "@cenera/components/Card";

export const PlayersManagement: FC = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [selectedClubTeam, setSelectedClubTeam] = useState(null);

  const {
    teams,
    loading,
    error,
    revalidate: revalidateTeams,
  } = useFetchTeams();
  const {
    player: selectedPlayer,
    loading: playerLoading,
    revalidate: revalidatePlayer,
  } = useFetchPlayer(selectedPlayerId);

  const handlePlayersUpdate = () => {
    revalidateTeams();
    revalidatePlayer();
  };

  const handlePlayerSelect = (
    player: TeamPlayer,
    teamId: number,
    clubId: number
  ) => {
    setSelectedClubTeam({
      clubId,
      teamId,
    });

    setSelectedPlayerId(player.player_id);
  };

  const handlePlayerDelete = () => {
    revalidateTeams();
  };

  const handleAddNewPlayerClick = (clubId: number, teamId: number) => {
    setSelectedClubTeam({
      clubId,
      teamId,
    });

    setSelectedPlayerId(null);
  };

  const handleCancelEditOrCreate = () => {
    setSelectedClubTeam(null);
    setSelectedPlayerId(null);
  };



  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4} xl={3}>
          <PlayersList
            teams={teams}
            loading={loading}
            error={error}
            onPlayerSelected={handlePlayerSelect}
            onPlayerDeleted={handlePlayerDelete}
            onAddNewPlayerClick={handleAddNewPlayerClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8} xl={9}>
          {(selectedPlayerId && playerLoading) ||
          (selectedPlayerId && !selectedPlayer) ? (
            <Card>
              <CardBody>
                <p style={{ textAlign: "center" }}>Loading Player details...</p>
              </CardBody>
            </Card>
          ) : selectedPlayerId || selectedClubTeam ? (
            <CreateEditPlayer
              key={
                selectedPlayer
                  ? selectedPlayer.player_id
                  : selectedClubTeam
                  ? JSON.stringify(selectedClubTeam)
                  : 0
              }
              onPlayerCreateOrEdit={handlePlayersUpdate}
              toEditPlayer={selectedPlayer}
              selectedClubTeam={selectedClubTeam}
              onCancel={handleCancelEditOrCreate}
            />
          ) : (
            <Card>
              <CardBody>
                <p style={{ textAlign: "center" }}>
                  Please click add player on the left side or edit a player.
                </p>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};
