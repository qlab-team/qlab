import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

// material ui
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    color: "white"
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "20px"
      },
      root: {
        background:
          "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
        color: "white"
      }
    },
    MuiTypography: {
      colorPrimary: {
        color: "white"
      }
    },
    MuiListItemIcon: {
      root: {
        color: "white"
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(100, 0, 200, 0.2)"
      }
    },
    MuiLinearProgress: {
      barColorPrimary: {
        background:
          "linear-gradient(45deg, rgba(101,255,236,1) 0%, rgba(27,249,32,1) 100%)",
        borderRadius: 50
      }
    }
  },
  typography: {
    fontFamily: [
      "'M PLUS Rounded 1c', sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,

  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
