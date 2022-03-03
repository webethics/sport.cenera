import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

import { GridContainer, GridItem } from '@cenera/components/Grid';
import { CardHeader, CardBody } from '@cenera/components/Card';  // removed card from here and added in linup page
import { TeamPlayer, GameInfo , Team } from '@cenera/models';  // team is new here

import { styles } from './styles';
import { LineForm } from './components/LineForm';


const useStyles = makeStyles(styles as any);

type Props = {
  players: TeamPlayer[];
  team?: Team[]; //new 
  team_id: number;
  gameInfo: GameInfo;
  revalidateGameInfo: () => void;
};

export const IceHockeyLineUp: FC<Props> = ({ players, gameInfo , team_id , revalidateGameInfo }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        
        <GridItem xs={11} sm={11} md={11} xl={10} className={classes.container}>
       
          {/* <Card> */}
            <CardHeader>
              <h4>Ice Hockey Line-Up</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} xl={3}>
                  <h5 className={classes.lineTitle}>Line 1</h5>
                  <LineForm
                    lineNumber={1}
                    players={players}
                    gameInfo={gameInfo}
                    team_id={team_id}  //new
                    onLineUpDeleted={revalidateGameInfo}
                    onLineUpUpdated={revalidateGameInfo}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} xl={3}>
                  <h5 className={classes.lineTitle}>Line 2</h5>
                  <LineForm
                    lineNumber={2}
                    players={players}
                    gameInfo={gameInfo}
                    team_id={team_id} //new
                    onLineUpDeleted={revalidateGameInfo}
                    onLineUpUpdated={revalidateGameInfo}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} xl={3}>
                  <h5 className={classes.lineTitle}>Line 3</h5>
                  <LineForm
                    lineNumber={3}
                    players={players}
                    gameInfo={gameInfo}
                    team_id={team_id} //new
                    onLineUpDeleted={revalidateGameInfo}
                    onLineUpUpdated={revalidateGameInfo}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} xl={3}>
                  <h5 className={classes.lineTitle}>Line 4</h5>
                  <LineForm
                    lineNumber={4}
                    players={players}
                    gameInfo={gameInfo}
                    team_id={team_id} //new
                    onLineUpDeleted={revalidateGameInfo}
                    onLineUpUpdated={revalidateGameInfo}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          {/* </Card> */}
        </GridItem>
      </GridContainer>
    </div>
  );
};
