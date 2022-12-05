import React, { FC, useState, useEffect, useContext } from "react";
import { makeStyles, CircularProgress, Backdrop } from "@material-ui/core";

import { useFetchGameInfo } from "@cenera/common/hooks/api-hooks";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { MatchResultForm } from "./components/MatchForm";
import { useFetchTeams } from "@cenera/common/hooks/api-hooks"; // new
import Teampicker from "@cenera/views/Games/TeamPicker/TeamPicker"; //new
//import { useFetchUsers } from '@cenera/common/hooks/api-hooks'; // new
import { styles } from "./styles";
import { useAppContext, appContext } from "@cenera/app-context";

const useStyles = makeStyles(styles as any);

export const GameResults: FC = () => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [teamsList, setTeamsList] = useState(null); //new
  const [teamId, setTeamId] = useState<any>(
    appState.teamId ? appState.teamId : ""
  ); //new
  const { gameInfo, loading, isValidating, revalidate } = useFetchGameInfo(
    teamId
  );
  const { teams, loading: loadingTeam } = useFetchTeams(); // new
  //const {users, loading:loadingUsers} = useFetchUsers();
  const [showDropDown, setshowDropDown] = useState(false);

  const { dispatch } = useContext(appContext); //use SetTeamId

  useEffect(() => {
    //new
    if (!loadingTeam && teams) {
      setTeamsList(teams);
      let a = teams.find((res) => res.team_id === teamId);
      dispatch({ type: "TEAM_NAME", payload: a && a.team_name });
    }
  }, [loadingTeam, teams, teamsList, teamId]);

  useEffect(() => {
    if (teamsList !== null) {
      if (appState.teamId != null) setTeamId(appState.teamId);
      else setTeamId(teamsList[0].team_id); //setting team id for showing default game info of first team
      setshowDropDown(true);
    } else {
      setshowDropDown(false);
      setTeamId(null);
    }
  }, [teamsList]);

  function handleTeamChange(e: any): void {
    //new
    setTeamId(e.target.value);
    dispatch({ type: "APP_LINEUP_TEAMID", payload: e.target.value }); //setteamid
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} xl={9} className={classes.container}>
          {showDropDown ? (
            <Teampicker
              teamList={teamsList}
              onChange={handleTeamChange}
              value={teamId}
            />
          ) : (
            ""
          )}

          <Card>
            <CardHeader>
              <h4>Match results</h4>
            </CardHeader>
            <CardBody>
              {!loading && gameInfo
                ? gameInfo.matches.map((match) => (
                    <MatchResultForm
                      team_id={teamId}
                      key={match.match_id}
                      toEditMatchRecord={match}
                      onMatchRecordUpDeleted={revalidate}
                      onMatchRecordUpUpdated={revalidate}
                    />
                  ))
                : null}
              {teamId ? (
                <MatchResultForm
                  onMatchRecordUpDeleted={revalidate}
                  team_id={teamId}
                  onMatchRecordUpUpdated={revalidate}
                /> //new
              ) : (
                <MatchResultForm
                  onMatchRecordUpDeleted={revalidate}
                  onMatchRecordUpUpdated={revalidate}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <Backdrop className={classes.backdrop} open={loading || isValidating}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
