/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MainListItems, { SecondaryListItems } from "./ListItems";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
// react-router
import { Redirect } from "react-router-dom";
// actions
import { getUserAndLogin, userLogout } from "../../store/actions/userActions";

/////////////// STYLES
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  palette: {
    type: "light"
  },
  username: {
    margin: 0,
    marginLeft: "10px",
    fontSize: "14px",
    fontWeight: "bold"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  button: {
    // background: "rgb(92,27,249)",
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    border: "solid white 1px",
    color: "#FFF",
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: "10px 10px 10px 10px"
  },
  appBar: {
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
    border: "none",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: "0px 0px 20px 0px",
    whiteSpace: "nowrap",
    width: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      width: "101vw",
      borderRadius: "0px"
    },
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
    [theme.breakpoints.up("xs")]: {
      width: "56px"
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
  },
  title: {
    flexGrow: 1,
    fontSize: 50,
    color: "white",
    textShadow: "2px 2px 0px #C275FF",
    marginBottom: 6,
    fontFamily: "Aquino"
  }
}));

/////////////// COMPONENT
const Sidebar = props => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { auth } = props;

  useEffect(() => {
    if (auth.isLoaded) {
      if (auth.isEmpty) return <Redirect to="/" />;
      props.getUserAndLogin(auth);
    }
    // eslint-disable-next-line
  }, [auth.isLoaded]);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.open && classes.drawerPaperClose
        )
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <Grid container wrap="nowrap">
          <Grid item xs>
            {(() => {
              if (auth.photoURL) {
                return <Avatar alt="useravatar" src={auth.photoURL} />;
              }
            })()}
          </Grid>
          <Grid
            item
            container
            xs={10}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Typography
              className={classes.username}
              variant="subtitle1"
              display="block"
              gutterBottom
            >
              {props.userName ? props.userName : "...loading"}
            </Typography>
          </Grid>
        </Grid>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mobile ? (
          <MainListItems handleDrawerClose={props.handleDrawerClose} />
        ) : (
          <MainListItems />
        )}
      </List>
      <Divider />
      <List>
        <SecondaryListItems
          handleDrawerClose={props.handleDrawerClose}
          open={props.open}
          userLogout={userLogout}
        />
      </List>
      <Divider />
      {props.open && (
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {"QLAB"}
        </Typography>
      )}
      {/* <Link
        className={classes.button}
        style={{ textDecoration: "none" }}
        to="/quiz"
      >
        quiz
      </Link> */}
    </Drawer>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserAndLogin: auth => dispatch(getUserAndLogin(auth)),
    userLogout: () => dispatch(userLogout())
  };
};

/////////////// EXPORTS
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Sidebar);
