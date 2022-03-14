import React, { FC } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import People from '@material-ui/icons/People';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import Danger from '@cenera/components/Typography/Danger.js';
import DirectionsRun from '@material-ui/icons/DirectionsRun';

import { GridContainer, GridItem } from '@cenera/components/Grid';
import { Card, CardHeader, CardIcon, CardFooter } from '@cenera/components/Card';
import styles from './dashboardStyle';
import { useFetchClubs, useFetchTeams } from '@cenera/common/hooks';

const useStyles = makeStyles(styles as any);

export const Dashboard: FC = () => {
  const classes = useStyles();
  const { clubs, loading: clubsLoading } = useFetchClubs();
  const { teams, loading: teamsLoading } = useFetchTeams();

  return (
    <div>
      <GridContainer style={{ justifyContent: 'center' }}>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats={true} icon={true}>
              <CardIcon color="warning">
                <Icon>library_books</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Clubs</p>
              {clubsLoading ? (
                '...'
              ) : (
                <h3 className={classes.cardTitle}>
                  {clubs.length} <small>Clubs</small>
                </h3>
              )}
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <Danger>
                  <FormatListNumbered />
                </Danger>
                <Link to="/admin/clubs">See the list of clubs</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats={true} icon={true}>
              <CardIcon color="success">
                <People />
              </CardIcon>
              <p className={classes.cardCategory}>Teams</p>

              {teamsLoading ? (
                '...'
              ) : (
                <h3 className={classes.cardTitle}>
                  {teams.length} <small>Teams</small>
                </h3>
              )}
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <Danger>
                  <FormatListNumbered />
                </Danger>
                <Link to="/admin/teams">See the list of teams</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats={true} icon={true}>
              <CardIcon color="danger">
                <DirectionsRun />
              </CardIcon>
              <p className={classes.cardCategory}>Players</p>
              {teamsLoading ? (
                '...'
              ) : (
                <h3 className={classes.cardTitle}>
                  {teams.map(t => t.players.length).reduce((acc, curr) => acc + curr, 0)} <small>Players</small>
                </h3>
              )}
            </CardHeader>
            <CardFooter stats={true}>
              <div className={classes.stats}>
                <Danger>
                  <FormatListNumbered />
                </Danger>
                <Link to="/admin/players">See the list of players</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
