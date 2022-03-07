import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { Button } from "@cenera/components/Button/Button";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { PlayerPicker } from "@cenera/views/Games/LineUps/components/PlayerPicker";
import { GameService } from "@cenera/services/api/game";
import { useAppContext } from "@cenera/app-context";
import { useShowConfirmDialog } from "@cenera/common/hooks/confirmDialog";

import { TeamPlayer, GameInfo, GameLineUp, Team } from "@cenera/models"; // team is new

import { styles } from "./styles";
const useStyles = makeStyles(styles as any);

type Props = {
  players: TeamPlayer[];
  team?: Team[]; // new optional not required now
  team_id: number; //new
  lineNumber: number;
  gameInfo: GameInfo;

  onLineUpDeleted: () => void;
  onLineUpUpdated: () => void;
};

export const LineForm: FC<Props> = ({
  players,
  lineNumber,
  gameInfo,
  team_id,
  onLineUpDeleted,
  onLineUpUpdated,
}: Props) => {
  // team is new here for getting team id
  const classes = useStyles();
  const [appState] = useAppContext();
  const [deleting, setDeleting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  let prevLinUp: GameLineUp = null;
  if (gameInfo.game_lineup.length > 0) {
    prevLinUp = gameInfo.game_lineup.find(
      (l) => l.lineup_number === lineNumber
    );
  }

  const initialFormValues = {
    player1: prevLinUp ? prevLinUp.lineup_player1 || "" : "",
    player2: prevLinUp ? prevLinUp.lineup_player2 || "" : "",
    player3: prevLinUp ? prevLinUp.lineup_player3 || "" : "",
    player4: prevLinUp ? prevLinUp.lineup_player4 || "" : "",
    player5: prevLinUp ? prevLinUp.lineup_player5 || "" : "",
    player6: prevLinUp ? prevLinUp.lineup_player6 || "" : "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({}),
    onSubmit: async (formValues) => {
      try {
        const res = await GameService.createGameLineUp(
          {
            ...prevLinUp,

            lineup_number: lineNumber,
            lineup_player1: formValues.player1.toString(),
            lineup_player2: formValues.player2.toString(),
            lineup_player3: formValues.player3.toString(),
            lineup_player4: formValues.player4.toString(),
            lineup_player5: formValues.player5.toString(),
            lineup_player6: formValues.player6.toString(),
          },
          appState.authentication.accessToken,
          team_id
        );

        onLineUpUpdated();

        enqueueSnackbar(
          res && res.data && res.data.message
            ? res.data.message
            : "Line-Up created/edited successfully",
          { variant: "success" }
        );
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    },
  });

  const deleteLineUp = () => {
    setDeleting(true);

    GameService.deleteGameLineUp(
      prevLinUp.lineup_id,
      appState.authentication.accessToken,
      team_id
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

  const handleLineDelete = () => {
    showConfirmDialog();
  };

  useEffect(() => {
    // if (!prevLinUp) formik.setValues(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formik.setValues(initialFormValues);
  }, [prevLinUp]);

  const { values, touched, errors, handleChange, handleBlur } = formik;
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <PlayerPicker
          players={players}
          id="player1"
          value={values.player1}
          error={errors.player1}
          touched={touched.player1}
          title="Keeper "// * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <PlayerPicker
          players={players}
          id="player2"
          value={values.player2}
          error={errors.player2}
          touched={touched.player2}
          title="Back " // * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <PlayerPicker
          players={players}
          id="player3"
          value={values.player3}
          error={errors.player3}
          touched={touched.player3}
          title="Back " // * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <PlayerPicker
          players={players}
          id="player4"
          value={values.player4}
          error={errors.player4}
          touched={touched.player4}
          title="Forward " // * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <PlayerPicker
          players={players}
          id="player5"
          value={values.player5}
          error={errors.player5}
          touched={touched.player5}
          title="Forward " // * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <PlayerPicker
          players={players}
          id="player6"
          value={values.player6}
          error={errors.player6}
          touched={touched.player6}
          title="Forward " // * removed from here
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className={classes.btnContainer}>
          <Button
            color="info"
            className={classes.btnSubmit}
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            disableRipple={formik.isSubmitting || !formik.isValid}
            disableFocusRipple={formik.isSubmitting || !formik.isValid}
          >
            {prevLinUp ? "Edit Line" : "Create Line"}
          </Button>

          {prevLinUp ? (
            <Button
              color="warning"
              className={classes.btnDelete}
              onClick={handleLineDelete}
              disabled={deleting}
              disableRipple={deleting}
              disableFocusRipple={deleting}
            >
              Delete Line
            </Button>
          ) : null}
        </div>
      </form>

      {alert}
      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
