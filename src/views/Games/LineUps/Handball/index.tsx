import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { Button } from "@cenera/components/Button/Button";
import { PlayerPicker } from "@cenera/views/Games/LineUps/components/PlayerPicker";
import { TeamPlayer, GameInfo, GameLineUp } from "@cenera/models";
import { useAppContext } from "@cenera/app-context";
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { GameService } from "@cenera/services/api/game";

import { styles } from "./styles";

const useStyles = makeStyles(styles as any);
let lineUpIdToDelete: string | null | any = null;

type Props = {
  players: TeamPlayer[];
  team_id: number;
  gameInfo: GameInfo;
  onLineUpDeleted: () => void;
  onLineUpUpdated: () => void;
};

export const HandballLineUp: FC<Props> = ({
  players,
  gameInfo,
  team_id,
  onLineUpDeleted,
  onLineUpUpdated,
}: Props) => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [deleting, setDeleting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const lines: GameLineUp[] = gameInfo.game_lineup;

  const initialFormValues = {
    line1: {
      player1: lines[0] ? lines[0].lineup_player1 || "" : "",
      player2: lines[0] ? lines[0].lineup_player2 || "" : "",
      player3: lines[0] ? lines[0].lineup_player3 || "" : "",
      player4: lines[0] ? lines[0].lineup_player4 || "" : "",
      player5: lines[0] ? lines[0].lineup_player5 || "" : "",
    },
    line2: {
      player1: lines[1] ? lines[1].lineup_player1 || "" : "",
      player2: lines[1] ? lines[1].lineup_player2 || "" : "",
      player3: lines[1] ? lines[1].lineup_player3 || "" : "",
      player4: lines[1] ? lines[1].lineup_player4 || "" : "",
      player5: lines[1] ? lines[1].lineup_player5 || "" : "",
    },
    line3: {
      player1: lines[2] ? lines[2].lineup_player1 || "" : "",
      player2: lines[2] ? lines[2].lineup_player2 || "" : "",
      player3: lines[2] ? lines[2].lineup_player3 || "" : "",
      player4: lines[2] ? lines[2].lineup_player4 || "" : "",
      player5: lines[2] ? lines[2].lineup_player5 || "" : "",
    },
    line4: {
      player1: lines[3] ? lines[3].lineup_player1 || "" : "",
      player2: lines[3] ? lines[3].lineup_player2 || "" : "",
      player3: lines[3] ? lines[3].lineup_player3 || "" : "",
      player4: lines[3] ? lines[3].lineup_player4 || "" : "",
      player5: lines[3] ? lines[3].lineup_player5 || "" : "",
    },
    line5: {
      player1: lines[4] ? lines[4].lineup_player1 || "" : "",
      player2: lines[4] ? lines[4].lineup_player2 || "" : "",
      player3: lines[4] ? lines[4].lineup_player3 || "" : "",
      player4: lines[4] ? lines[4].lineup_player4 || "" : "",
      player5: lines[4] ? lines[4].lineup_player5 || "" : "",
      player6: lines[4] ? lines[4].lineup_player5 || "" : "",
    },
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({}),
    onSubmit: async (formValues) => {
      try {
        const patchValues: { [k: string]: string } = {};
        let allOk = true;

        for (let k = 0; k < 5; k += 1) {
          for (let i = 0; i < 5; i += 1) {
            patchValues[`lineup_player${i + 1}`] =
              (formValues as any)[`line${k + 1}`][`player${i + 1}`] + "";
          }

          const res = await GameService.createGameLineUp(
            {
              lineup_id:
                gameInfo.game_lineup.length >= k + 1
                  ? gameInfo.game_lineup[k].lineup_id
                  : undefined,
              lineup_number: k + 1,
              ...patchValues,
            } as any,
            appState.authentication.accessToken,
            team_id
          );

          allOk = res && res.data && res.data.message ? allOk && true : false;
        }

        onLineUpUpdated();
        enqueueSnackbar("Line-Up created/edited successfully", {
          variant: "success",
        });
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    },
  });

  const deleteLineUp = () => {
    setDeleting(true);

    GameService.deleteGameLineUp(
      lineUpIdToDelete,  // it has arrow of linup now 
      appState.authentication.accessToken,
      team_id,
      "handball" // new
      
    )
      .then(() => {
        showSuccessMessage();
        onLineUpDeleted();
      })
      .catch((err) => {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const { alert, showConfirmDialog, showSuccessMessage } = useShowConfirmDialog(
    {
      onDeleteConfirmed: deleteLineUp,
      successMessage: "Line-Up deleted successfully",
      confirmMessage: "Line-Up will be deleted for good!",
    }
  );

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

  const linePlayers = [2, 2, 2, 1, 5];
  const linesElements: any[][] = [[], [], [], [], []];

  for (let l = 0; l < linesElements.length; l += 1) {
    const playersCount = linePlayers[l];
    const columnWidth = Math.min(3, Math.floor(11 / playersCount));
    let playerRole = "";
    switch (l) {
      case 0:
        playerRole = "Forward";
        break;
      case 1:
        playerRole = "Midfielder";
        break;
      case 2:
        playerRole = "Defender";
        break;
      case 3:
        playerRole = "Goal Keeper";
        break;
      case 4:
        playerRole = "Substitute";
        break;
    }

    for (let i = 0; i < playersCount; i += 1) {
      const lineErrors = (errors as any)[`line${l + 1}`];
      const lineTouched = (touched as any)[`line${l + 1}`];

      linesElements[l].push(
        <GridItem
          md={columnWidth}
          xl={columnWidth}
          key={`player-picker${l}-${i}`}
        >
          <PlayerPicker
            players={players}
            id={`line${l + 1}.player${i + 1}`}
            value={(values as any)[`line${l + 1}`][`player${i + 1}`]}
            error={lineErrors && lineErrors[`player${i + 1}`]}
            touched={lineTouched && lineTouched[`player${i + 1}`]}
            title={`${playerRole}`} // * removed from here
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
              <h4>Handball Line-Up</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <GridContainer className={classes.lineRow}>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line1.player1"
                      value={values.line1.player1}
                      error={errors.line1?.player1}
                      touched={touched.line1?.player1}
                      title="LINE " // * removed from here and PIVOT REPLACED WITH LINE
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line1.player2"
                      value={values.line1.player2}
                      error={errors.line1?.player2}
                      touched={touched.line1?.player2}
                      title="Center Back " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  <GridItem md={1} xl={1} className={classes.btnDelete}>
                    <Button // this button will delete 4 line from top except last
                      size="sm"
                      color="warning"
                      data-lineup-id={ lines.length > 0 ? [lines[0] && lines[0].lineup_id , lines[1] && lines[1].lineup_id, lines[2] && lines[2].lineup_id, lines[3] && lines[3].lineup_id, ] :0}
                      onClick={handleLineDelete}
                      disabled={deleting}
                      disableRipple={deleting}
                      disableFocusRipple={deleting}
                    >
                      Delete Line
                    </Button>
                  </GridItem>
                </GridContainer>

                <GridContainer className={classes.lineRow}>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line2.player1"
                      value={values.line2.player1}
                      error={errors.line2?.player1}
                      touched={touched.line2?.player1}
                      title="Left Back " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  <GridItem md={3} xl={3} />

                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line2.player2"
                      value={values.line2.player2}
                      error={errors.line2?.player2}
                      touched={touched.line2?.player2}
                      title="Right Back " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                    <Button
                      size="sm"
                      color="warning"
                      data-lineup-id={lines.length > 1 ? lines[1].lineup_id : 0}
                      onClick={handleLineDelete}
                      disabled={deleting}
                      disableRipple={deleting}
                      disableFocusRipple={deleting}>
                      Delete Line remove 
                    </Button>
                  </GridItem> */}
                </GridContainer>

                <GridContainer className={classes.lineRow}>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line3.player1"
                      value={values.line3.player1}
                      error={errors.line3?.player1}
                      touched={touched.line3?.player1}
                      title="Left Wing " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={6} xl={6} />
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line3.player2"
                      value={values.line3.player2}
                      error={errors.line3?.player2}
                      touched={touched.line3?.player2}
                      title="Right Wing " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                    <Button
                      size="sm"
                      color="warning"
                      data-lineup-id={lines.length > 2 ? lines[2].lineup_id : 0}
                      onClick={handleLineDelete}
                      disabled={deleting}
                      disableRipple={deleting}
                      disableFocusRipple={deleting}>
                      Delete Line remoe
                    </Button>
                  </GridItem> */}
                </GridContainer>

                <GridContainer className={classes.lineRow}>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line4.player1"
                      value={values.line4.player1}
                      error={errors.line4?.player1}
                      touched={touched.line4?.player1}
                      title="Goal Keeper " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  {/* <GridItem md={1} xl={1} className={classes.btnDelete}>
                    <Button
                      size="sm"
                      color="warning"
                      data-lineup-id={lines.length > 3 ? lines[3].lineup_id : 0}
                      onClick={handleLineDelete}
                      disabled={deleting}
                      disableRipple={deleting}
                      disableFocusRipple={deleting}>
                      Delete Line remove 
                    </Button>
                  </GridItem> */}
                </GridContainer>

                <GridContainer className={classes.lineRow}>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player1"
                      value={values.line5.player1}
                      error={errors.line5?.player1}
                      touched={touched.line5?.player1}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player2"
                      value={values.line5.player2}
                      error={errors.line5?.player2}
                      touched={touched.line5?.player2}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player3"
                      value={values.line5.player3}
                      error={errors.line5?.player3}
                      touched={touched.line5?.player3}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player4"
                      value={values.line5.player4}
                      error={errors.line5?.player4}
                      touched={touched.line5?.player4}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player5"
                      value={values.line5.player5}
                      error={errors.line5?.player5}
                      touched={touched.line5?.player5}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem md={2} xl={2}>
                    <PlayerPicker
                      players={players}
                      id="line5.player6"
                      value={values.line5.player6}
                      error={errors.line5?.player6}
                      touched={touched.line5?.player6}
                      title="Bench " // * removed from here
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </GridItem>

                  <GridItem md={1} xl={1} className={classes.btnDelete}>
                    <Button
                      size="sm"
                      color="warning"
                      data-lineup-id={
                        lines.length > 4 ? [lines[4] && lines[4].lineup_id] : 0 //edited
                      } // edited
                      onClick={handleLineDelete}
                      disabled={deleting}
                      disableRipple={deleting}
                      disableFocusRipple={deleting}
                    >
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
                    disableFocusRipple={formik.isSubmitting || !formik.isValid}
                  >
                    Edit Line
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
