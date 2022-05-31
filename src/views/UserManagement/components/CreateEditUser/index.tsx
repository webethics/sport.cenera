import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { useAppContext } from "@cenera/app-context";
import { CardHeader, Card, CardBody } from "@cenera/components/Card";
import { GridContainer, GridItem } from "@cenera/components/Grid";
import { CustomInput } from "@cenera/components/CustomInput/CustomInput";
import { Button as CustomButton } from "@cenera/components/Button/Button";
import { getErrorMessage } from "@cenera/common/utils/error-helper";
import { User, Club } from "@cenera/models";

import { styles } from "./styles";
import { UserService } from "@cenera/services/api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useFetchUser } from "@cenera/common/hooks/api-hooks";
const useStyles = makeStyles(styles as any);

type Props = {
  onUserCreateOrEdit: () => void;
  onEditCancel: () => void;
  toEditUser?: User;
  clubs: Club[];
};

export const CreateEditUser: FC<Props> = ({
  clubs,
  toEditUser,
  onUserCreateOrEdit,
  onEditCancel,
}) => {
  const classes = useStyles();
  const [appState] = useAppContext();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const id = toEditUser && toEditUser.user_id;
  const { user, loading, revalidate } = useFetchUser(id);

  const { enqueueSnackbar } = useSnackbar();

  //allowBooking

  const initialFormValues = {
    user_login: toEditUser ? toEditUser.user_login : "",
    user_type: toEditUser
      ? toEditUser.user_type
      : appState.user.user_type === "sysAdmin"
      ? ""
      : appState.user.user_type === "clubAdmin"
      ? "teamAdmin"
      : "",
    user_club: toEditUser
      ? toEditUser.user_club || -1
      : appState.user.user_type !== "sysAdmin"
      ? appState.user.club_id
      : -1,
    user_team: toEditUser ? toEditUser.user_team || -1 : -1,
    allowBooking: false,
    allowGameinfo: false,
  };
  // allowBooking: user && user.allowBooking,
  // allowGameinfo: user && user.allowGameinfo,
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      user_login: Yup.string()
        .required("Required")
        .email("Enter a valid Email!"),
      user_type: Yup.string().required("Required"),
      user_club: Yup.number().required("Required"),
      user_team: Yup.number().required("Required"),
    }),
    onSubmit: async (formValues) => {
      try {
        if (formik.isValid) {
          const user = toEditUser
            ? { ...toEditUser, ...formValues }
            : formValues;
          const res = await UserService.createOrUpdateUser(
            user,
            appState.authentication.accessToken
          );
          enqueueSnackbar(res.data.message, { variant: "success" });
          revalidate();
          onUserCreateOrEdit();
          formik.setValues(initialFormValues);
        }
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    },
  });
  useEffect(() => {
    if (user) {
      formik.setValues({
        ...formik.values,
        allowBooking: user.allowBooking,
        allowGameinfo: user.allowGameinfo,
      });
      // formik.setValues({ ...formik.values, allowGameinfo: user.allowGameinfo });
    }
  }, [loading]);

  const handleClubChange = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    handleChange(event);
    setSelectedClub(clubs.find((c) => c.club_id === event.target.value));
  };

  useEffect(() => {
    if (toEditUser) {
      setSelectedClub(clubs.find((c) => c.club_id === toEditUser.user_club));
    } else if (appState.user.user_type !== "sysAdmin") {
      setSelectedClub(clubs.find((c) => c.club_id === appState.user.club_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubs, toEditUser]);

  const { values, touched, errors, handleChange, handleBlur } = formik;

  return (
    <Card>
      <CardHeader>
        <h4>
          {toEditUser
            ? `Edit User ${toEditUser.user_login}`
            : "Create New User"}
        </h4>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={4} md={4}>
              <CustomInput
                error={formik.errors.user_login ? true : false}
                labelText="User Login (Email) *"
                id="user_login"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.user_login,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  type: "text",
                }}
              />
              {errors.user_login && touched.user_login ? (
                <label className={classes.errorLabel}>
                  {errors.user_login}
                </label>
              ) : null}

              {appState.user.user_type === "sysAdmin" ? (
                <FormControl
                  fullWidth={true}
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="user_type"
                    className={classes.selectLabel}
                  >
                    User Role
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={values.user_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.errors.user_type ? true : false}
                    inputProps={{
                      name: "user_type",
                      id: "user_type",
                    }}
                  >
                    <MenuItem
                      disabled={true}
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Choose User Role
                    </MenuItem>
                    {appState.appTypes.userTypes.map((userType) => (
                      <MenuItem
                        key={userType}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value={userType}
                      >
                        {userType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}

              {appState.user.user_type === "sysAdmin" ? (
                <FormControl
                  fullWidth={true}
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="user_club"
                    className={classes.selectLabel}
                  >
                    User Club
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={values.user_club}
                    onChange={handleClubChange}
                    onBlur={handleBlur}
                    error={formik.errors.user_club ? true : false}
                    inputProps={{
                      name: "user_club",
                      id: "user_club",
                    }}
                  >
                    <MenuItem
                      disabled={true}
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Choose User Role
                    </MenuItem>
                    {clubs.map((club) => (
                      <MenuItem
                        key={club.club_id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value={club.club_id}
                      >
                        {club.club_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}

              <FormControl
                fullWidth={true}
                className={classes.selectFormControl}
              >
                <InputLabel htmlFor="user_team" className={classes.selectLabel}>
                  User Team
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={values.user_team}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={formik.errors.user_team ? true : false}
                  inputProps={{
                    name: "user_team",
                    id: "user_team",
                  }}
                >
                  <MenuItem
                    disabled={true}
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Choose User Team
                  </MenuItem>
                  {selectedClub ? (
                    selectedClub.teams.map((team) => (
                      <MenuItem
                        key={team.team_id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value={team.team_id}
                      >
                        {team.team_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value={-1}
                    >
                      Please first choose a Club
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
          <div>
            <GridItem xs="12" sm="10" style={{ marginBottom: "15px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="allowGameinfo"
                    checked={formik.values.allowGameinfo}
                    onChange={formik.handleChange}
                  />
                }
                label="Allow Games"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="allowBooking"
                    checked={formik.values.allowBooking}
                    onChange={formik.handleChange}
                  />
                }
                label="Allow booking"
              />
            </GridItem>
          </div>
          <div className={classes.btnContainer}>
            <CustomButton
              color="info"
              className={classes.btnSubmit}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {toEditUser ? "Edit User" : "Create User"}
            </CustomButton>

            <CustomButton
              color="danger"
              className={classes.btnSubmit}
              disabled={formik.isSubmitting}
              onClick={onEditCancel}
            >
              Cancel
            </CustomButton>
          </div>
        </form>
        <Backdrop
          className={classes.backdrop}
          open={formik.isSubmitting || loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </CardBody>
    </Card>
  );
};
