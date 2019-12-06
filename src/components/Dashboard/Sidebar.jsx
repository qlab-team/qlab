import React from "react";
// firebase
import { connect } from "react-redux";
import { compose } from "redux";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
//Placeholder Avatar while account Loads - currently Vic
import placeholderAvatar from "../../assets/images/carefulwiththataxevic.gif";
//Actions
import { getUserAndLogin, userLogout } from "../../store/actions/userActions";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  username: {
    margin: 0,
    marginLeft: "10px"
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
    whiteSpace: "nowrap",
    width: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      width: "100vw"
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

const Sidebar = props => {
  const classes = useStyles();
  //Set Props from Redux
  const { auth, user } = props;
  console.log(user);

  //If Auth Not Loaded, Don't Worry
  if (auth.isLoaded) {
    //Refill User ID if not there already
    //  (can probably be replaced by session storage of state)
    if (!user.userProfile) {
      props.getUserAndLogin(auth);
    }
  }

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
            <Avatar alt="useravatar" src={auth.photoURL || placeholderAvatar} />
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
              {user.userProfile ? user.userProfile.username : "...loading"}
            </Typography>
          </Grid>
        </Grid>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems(props)}</List>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserAndLogin: auth => dispatch(getUserAndLogin(auth)),
    userLogout: () => dispatch(userLogout())
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Sidebar);
