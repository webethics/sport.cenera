import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MatButton from "@material-ui/core/Button";

import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import { GridContainer } from "@cenera/components/Grid/GridContainer";
import { GridItem } from "@cenera/components/Grid/GridItem";
import { CustomInput } from "@cenera/components/CustomInput/CustomInput";
import { Button } from "@cenera/components/Button/Button";
import { Card } from "@cenera/components/Card/Card";
import { CardBody } from "@cenera/components/Card/CardBody";
import { CardHeader } from "@cenera/components/Card/CardHeader";
import { CardFooter } from "@cenera/components/Card/CardFooter";
import { AuthNavbar } from "@cenera/components/NavBars/AuthNavbar";
import { Footer } from "@cenera/components/Footer/Footer";
import { useSnackbar } from "notistack";

import { loginPageStyle } from "./styles";
import { useAppContext } from "@cenera/app-context";
import { UserLoggedIn } from "@cenera/app-context/actions";
import { UserService } from "@cenera/services";
import { PasswordResetDialog } from "@cenera/components/PasswordResetDialog";

const useStyles = makeStyles(loginPageStyle as any);

export default function LoginPage() {
  const [cardAnimation, setCardAnimation] = useState("cardHidden");
  const [passwordResetDlgOpen, setPasswordResetDlgOpen] = useState(false);
  const [, appDispatch] = useAppContext();

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTimeout(() => {
      setCardAnimation("");
    }, 700);
  }, []);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required()
        .min(5, "Password length should be at least 5 characters")
        .max(32, "Password Length should be at most 32 characters"),
    }),
    onSubmit: async (formValues) => {
      if (formik.isValid) {
        try {
          const { data: result } = await UserService.login({
            email: formValues.email,
            password: formValues.password,
          });
          // localStorage.setItem("appState", JSON.stringify(result));
          appDispatch(UserLoggedIn(result));
          history.replace("/admin/dashboard");
        } catch {
          enqueueSnackbar(
            "Login failed, either your email or password was wrong.",
            { variant: "error" }
          );
        }
      }
    },
  });

  const handleRememberMeToggle = () => {
    formik.setFieldValue("rememberMe", !values.rememberMe);
  };

  const { handleChange, handleBlur, values, errors, touched } = formik;

  return (
    <>
      <AuthNavbar brandText="Cenera Sports Web" />
      <div className={classes.wrapper}>
        <div className={classes.fullPage}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form onSubmit={formik.handleSubmit}>
                  <Card login={true} className={classes[cardAnimation]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="rose"
                    >
                      <h4 className={classes.cardTitle}>Log in</h4>
                      <div className={classes.socialLine}>
                        Please Login with your credentials.
                      </div>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={touched.email && errors.email ? true : false}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          name: "email",
                          type: "email",
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.email,
                        }}
                      />
                      {errors.email && touched.email ? (
                        <label className={classes.errorLabel}>
                          {errors.email}
                        </label>
                      ) : null}

                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={
                          touched.password && errors.password ? true : false
                        }
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          name: "password",
                          type: "password",
                          autoComplete: "off",
                          onChange: handleChange,
                          onBlur: handleBlur,
                          value: values.password,
                        }}
                      />

                      {errors.password && touched.password ? (
                        <label className={classes.errorLabel}>
                          {errors.password}
                        </label>
                      ) : null}

                      <div className={classes.checkboxAndRadio}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={handleRememberMeToggle}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot,
                              }}
                              checked={values.rememberMe}
                            />
                          }
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                          }}
                          label="Remember Me"
                        />
                      </div>

                      <MatButton onClick={() => setPasswordResetDlgOpen(true)}>
                        Forgot your password?
                      </MatButton>

                      {formik.isSubmitting ? (
                        <CircularProgress
                          size="24px"
                          className={classes.circularProgress}
                        />
                      ) : null}
                    </CardBody>

                    <CardFooter className={classes.justifyContentCenter}>
                      <Button
                        color="rose"
                        simple={true}
                        size="lg"
                        block={true}
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
            <PasswordResetDialog
              open={passwordResetDlgOpen}
              onClose={() => setPasswordResetDlgOpen(false)}
            />
          </div>
          <Footer white={true} />
        </div>
      </div>
    </>
  );
}
