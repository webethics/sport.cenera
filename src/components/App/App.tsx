import React from "react";
import "date-fns";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AppContextProvider } from "@cenera/app-context/Provider";
import { AppRoutes } from "@cenera/Routes";
import { setInterceptors } from "@cenera/services";

import "./App.css";
import "@cenera/assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const App = () => {
  setInterceptors();

  return (
    <AppContextProvider>
      <SnackbarProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <div>
              <AppRoutes />
            </div>
          </Router>
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </AppContextProvider>
  );
};

export default App;
