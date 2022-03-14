import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { GridContainer, GridItem } from '@cenera/components/Grid';
import { CardHeader, Card, CardBody } from '@cenera/components/Card';
import { Button } from '@cenera/components/Button/Button';
import { PlayerPicker } from '@cenera/views/Games/LineUps/components/PlayerPicker';
import { TeamPlayer, GameInfo, GameLineUp } from '@cenera/models'; 
import { GameService } from '@cenera/services/api/game';
import { useAppContext } from '@cenera/app-context';
import { useShowConfirmDialog } from '@cenera/common/hooks/confirmDialog';
import { getErrorMessage } from '@cenera/common/utils/error-helper';

import { styles } from './styles';




const useStyles = makeStyles(styles as any);
let lineUpIdToDelete: string | null | any  = null; // added any 

type Props = {
  players: TeamPlayer[];
  team_id: number;
  gameInfo: GameInfo;
  onLineUpDeleted: () => void;
  onLineUpUpdated: () => void;
};

export const FootballLineUp: FC<Props> = ({ players, gameInfo,team_id, onLineUpDeleted, onLineUpUpdated }: Props) => {
  const classes = useStyles();


  const [lineSystem, setLineSystem] = useState(gameInfo.game_lineupsystem || '442');
  const [appState] = useAppContext();

 
  
  const [deleting, setDeleting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSystemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineSystem(event.target.value);
  };

  const lines: GameLineUp[] = gameInfo.game_lineup;
  const initialFormValues = {
    line1: {
      player1: lines[0] ? lines[0].lineup_player1 || '' : '',
      player2: lines[0] ? lines[0].lineup_player2 || '' : '',
      player3: lines[0] ? lines[0].lineup_player3 || '' : '',
      player4: lines[0] ? lines[0].lineup_player4 || '' : '',
      player5: lines[0] ? lines[0].lineup_player5 || '' : '',
    },
    line2: {
      player1: lines[1] ? lines[1].lineup_player1 || '' : '',
      player2: lines[1] ? lines[1].lineup_player2 || '' : '',
      player3: lines[1] ? lines[1].lineup_player3 || '' : '',
      player4: lines[1] ? lines[1].lineup_player4 || '' : '',
      player5: lines[1] ? lines[1].lineup_player5 || '' : '',
    },
    line3: {
      player1: lines[2] ? lines[2].lineup_player1 || '' : '',
      player2: lines[2] ? lines[2].lineup_player2 || '' : '',
      player3: lines[2] ? lines[2].lineup_player3 || '' : '',
      player4: lines[2] ? lines[2].lineup_player4 || '' : '',
      player5: lines[2] ? lines[2].lineup_player5 || '' : '',
    },
    line4: {
      player1: lines[3] ? lines[3].lineup_player1 || '' : '',
      player2: lines[3] ? lines[3].lineup_player2 || '' : '',
      player3: lines[3] ? lines[3].lineup_player3 || '' : '',
      player4: lines[3] ? lines[3].lineup_player4 || '' : '',
      player5: lines[3] ? lines[3].lineup_player5 || '' : '',
    },
    line5: {
      player1: lines[4] ? lines[4].lineup_player1 || '' : '',
      player2: lines[4] ? lines[4].lineup_player2 || '' : '',
      player3: lines[4] ? lines[4].lineup_player3 || '' : '',
      player4: lines[4] ? lines[4].lineup_player4 || '' : '',
      player5: lines[4] ? lines[4].lineup_player5 || '' : '',
    },
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({}),
    onSubmit: async formValues => {
      try {
        const patchValues: { [k: string]: string } = {};
        let allOk = true;

        if (gameInfo.game_lineupsystem !== lineSystem) {
          await GameService.updateGameInfo(
            {
              ...gameInfo,
              game_lineupsystem: lineSystem,
            },
            appState.authentication.accessToken
          );
        }

        for (let k = 0; k < 5; k += 1) {
          for (let i = 0; i < 5; i += 1) {
            patchValues[`lineup_player${i + 1}`] = (formValues as any)[`line${k + 1}`][`player${i + 1}`] + '';
          }

          const res = await GameService.createGameLineUp(
            {
              lineup_id: gameInfo.game_lineup.length >= k + 1 ? gameInfo.game_lineup[k].lineup_id : undefined,
              lineup_number: k + 1,
              ...patchValues,
            } as any,
            appState.authentication.accessToken,
            team_id
          );

          allOk = res && res.data && res.data.message ? allOk && true : false;
        }

        onLineUpUpdated();
        enqueueSnackbar('Line-Up created/edited successfully', { variant: 'success' });
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      }
    },
  });

  const deleteLineUp = () => {
    setDeleting(true);

    GameService.deleteGameLineUp(lineUpIdToDelete, appState.authentication.accessToken,team_id,"football")
      .then(() => {
        showSuccessMessage();
        onLineUpDeleted();
      })
      .catch(err => {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog({
    onDeleteConfirmed: deleteLineUp,
    successMessage: 'Line-Up deleted successfully',
    confirmMessage: 'Line-Up will be deleted for good!',
  });

  const handleLineDelete = (e: any) => {
    let temp = e.target.dataset.lineupId || e.currentTarget.dataset.lineupId; // edited
    lineUpIdToDelete = temp.split(","); // new 
    showConfirmDialog();
  };

  useEffect(() => {
    formik.setValues(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const { values, touched, errors, handleChange, handleBlur } = formik;

  const linePlayers = [
    parseInt(lineSystem.charAt(2), 10),
    parseInt(lineSystem.charAt(1), 10),
    parseInt(lineSystem.charAt(0), 10),
    1,
    5,
  ];
  const linesElements: any[][] = [[], [], [], [], []];

  for (let l = 0; l < linesElements.length; l += 1) {
    const playersCount = linePlayers[l];
    const columnWidth = Math.min(3, Math.floor(11 / playersCount));
    let playerRole = '';
    switch (l) {
      case 0:
        playerRole = 'Forward';
        break;
      case 1:
        playerRole = 'Midfielder';
        break;
      case 2:
        playerRole = 'Defender';
        break;
      case 3:
        playerRole = 'Goal Keeper';
        break;
      case 4:
        playerRole = 'Substitute';
        break;
    }

    for (let i = 0; i < playersCount; i += 1) {
      const lineErrors = (errors as any)[`line${l + 1}`];
      const lineTouched = (touched as any)[`line${l + 1}`];

      linesElements[l].push(
        <GridItem md={columnWidth} xl={columnWidth} key={`player-picker${l}-${i}`}>
          <PlayerPicker
            players={players}
            id={`line${l + 1}.player${i + 1}`}
            value={(values as any)[`line${l + 1}`][`player${i + 1}`]}
            error={lineErrors && lineErrors[`player${i + 1}`]}
            touched={lineTouched && lineTouched[`player${i + 1}`]}
            title={`${playerRole}`}  // * removed from here
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </GridItem>
      );
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={11} sm={11} md={11} xl={10} className={classes.container}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              <h4>Football Line-Up</h4>

              <FormControl component="div" className={classes.systemRadioContainer}>
                <FormLabel component="span">Line-Up System</FormLabel>
                <RadioGroup
                  aria-label="lineup-system"
                  value={lineSystem}
                  onChange={handleSystemChange}
                  className={classes.radiosContainer}>
                  <FormControlLabel value="442" control={<Radio />} label="4 4 2" />
                  <FormControlLabel value="433" control={<Radio />} label="4 3 3" />
                  <FormControlLabel value="352" control={<Radio />} label="3 5 2" />
                </RadioGroup>
              </FormControl>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
               
               
                
                  <GridContainer className={classes.lineRow} >
                    {linesElements[0]}
                    <GridItem md={1} xl={1} className={classes.btnDelete}>
                      <Button
                        size="sm"
                        color="warning"
                     //   data-lineup-id={lines.length >= 0 + 1 ? lines[0].lineup_id : 0}
                        data-lineup-id={ lines.length > 0 ? [lines[0] && lines[0].lineup_id , lines[1] && lines[1].lineup_id, lines[2] && lines[2].lineup_id, lines[3] && lines[3].lineup_id, ] :0}

                        onClick={handleLineDelete}
                        disabled={deleting}
                        disableRipple={deleting}
                        disableFocusRipple={deleting}>
                        Delete Line 
                      </Button>
                    </GridItem>
                  </GridContainer>


                  <GridContainer className={classes.lineRow} >
                    {linesElements[1]}
                    {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                      <Button
                        size="sm"
                        color="warning"
                        data-lineup-id={lines.length >= 0 + 1 ? lines[0].lineup_id : 0}
                        onClick={handleLineDelete}
                        disabled={deleting}
                        disableRipple={deleting}
                        disableFocusRipple={deleting}>
                        Delete Line lol
                      </Button>
                    </GridItem> */}
                  </GridContainer>



                  <GridContainer className={classes.lineRow} >
                    {linesElements[2]}
                    {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                      <Button
                        size="sm"
                        color="warning"
                        data-lineup-id={lines.length >= 0 + 1 ? lines[0].lineup_id : 0}
                        onClick={handleLineDelete}
                        disabled={deleting}
                        disableRipple={deleting}
                        disableFocusRipple={deleting}>
                        Delete Line lol
                      </Button>
                    </GridItem> */}
                  </GridContainer>


                  <GridContainer className={classes.lineRow} >
                    {linesElements[3]}
                    {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                      <Button
                        size="sm"
                        color="warning"
                        data-lineup-id={lines.length >= 0 + 1 ? lines[0].lineup_id : 0}
                        onClick={handleLineDelete}
                        disabled={deleting}
                        disableRipple={deleting}
                        disableFocusRipple={deleting}>
                        Delete Line 
                      </Button>
                    </GridItem> */}
                  </GridContainer>

                  <GridContainer className={classes.lineRow} >
                    {linesElements[4]}
                    <GridItem md={1} xl={1} className={classes.btnDelete}>
                      <Button
                        size="sm"
                        color="warning"
                        data-lineup-id={lines.length > 4 ? [lines[4] && lines[4].lineup_id] : 0 }//edited
                        onClick={handleLineDelete}
                        disabled={deleting}
                        disableRipple={deleting}
                        disableFocusRipple={deleting}>
                        Delete Line 
                      </Button>
                    </GridItem>
                  </GridContainer>

                
                

                
                <div className={classes.btnContainer}>
                  <Button
                    color="info"
                    className={classes.btnSubmit}
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    disableRipple={formik.isSubmitting || !formik.isValid}
                    disableFocusRipple={formik.isSubmitting || !formik.isValid}>
                    Edit Lines
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {alert}
      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
