/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
// components
import Profile from "./Profile/Profile";
import Leaderboard from "./Leaderboard/Leaderboard";
import Transactions from "./Transactions/Transactions";
import Stats from "./Stats/Stats";
import Store from "./Store/Store";
import Quizzes from "./Quizzes/Quizzes";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
// react-router
import { Route, Switch, Redirect } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { userLogout } from "../../store/actions/userActions";
import { notificationRead } from "../../store/actions/investmentActions";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

/////////////// UTILITIES
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        QLAB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/////////////// STYLES
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    borderRadius: "0px 0px 20px 0px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background:
      "linear-gradient(90deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "#fff"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background:
      "linear-gradient(90deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "#fff"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

/////////////// COMPONENT
const Dashboard = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = xs => {
    if (xs) setOpen(false);
  };

  // set props from redux
  const { auth, user, investments } = props;

  useEffect(() => {
    if (user.isLoggedIn) {
      if (!investments.checked) {
        console.log("Nah, mate. Investments not yet checked.");
      }
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  // if auth not loaded, don't worry
  if (auth.isLoaded) {
    // if no auth, redirect
    if (auth.isEmpty) return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        {/* TOPBAR */}
        <Topbar handleDrawerOpen={handleDrawerOpen} open={open} />
      </AppBar>
      {/* SIDEBAR */}
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* DASHBOARD VIEWS */}
          <Switch>
            <Route path="/dashboard/profile" component={Profile}></Route>
            <Route
              path="/dashboard/leaderboard"
              component={Leaderboard}
            ></Route>
            <Route
              path="/dashboard/Transactions"
              component={Transactions}
            ></Route>
            <Route path="/dashboard/stats" component={Stats}></Route>
            <Route path="/dashboard/store" component={Store}></Route>
            <Route path="/dashboard/quizzes" component={Quizzes}></Route>
          </Switch>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    investments: state.investments,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout()),
    notificationRead: () => dispatch(notificationRead())
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard);
