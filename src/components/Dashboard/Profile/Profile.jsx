/////////////// IMPORTS
import React, { useState, useEffect } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Achievements from "./Achievements";
// components
import Dialog from "../../Utility/Dialog";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { changeUsername } from "../../../store/actions/userActions";
import { getUserAndLogin } from "../../../store/actions/userActions";
import { getItems } from "../../../store/actions/profileActions";
import { openDialog } from "../../../store/actions/dialogActions";
import Badges from "./Badges";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  paper: {
    maxWidth: "100vw",
    padding: theme.spacing(2),
    overflow: "auto",
    marginBottom: 30
  },
  title: {
    marginBottom: 10
  },
  bigAvatar: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("xs")]: {
      width: 50,
      height: 50
    }
  },
  userName: {
    fontSize: 50,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25
    }
  },
  changeUserName: {
    fontSize: 10,
    "&:hover": {
      cursor: "pointer"
    }
  },
  button: {
    marginLeft: 5,
    fontSize: 10,
    textTransform: "none",
    textDecoration: "none !important",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    color: "rgb(92, 27, 249)",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      marginTop: 10
    }
  },
  input: {
    marginLeft: 50,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    },
    marginTop: 0,
    fontSize: 11
  },

  gridContainer: {
    justify: "flex-end"
  }
}));

/////////////// COMPONENT
const Profile = props => {
  const classes = useStyles();

  const [curUserItems, changeCurUserItems] = useState("");
  const [userItemsArr, changeUserItemsArr] = useState("");

  const [curUserAchievements, changeCurUserAchievements] = useState("");
  const [curUserAchievementsArr, changeCurUserAchievementsArr] = useState("");

  const { user, auth, userItems, userAchievements, getItems, userName } = props;
  //Make sure user is logged in before getting info
  useEffect(() => {
    if (auth.isLoaded) props.getUserAndLogin(auth);
    // eslint-disable-next-line
  }, [auth.isLoaded]);

  //update username if it has changed
  //Load new badges if they've changed
  console.log("test", props.test);

  useEffect(() => {
    if (userItems) {
      getItems();
      changeCurUserItems(userItems);
    }
    if (curUserItems !== "") {
      changeUserItemsArr(
        curUserItems.map((item, index) => {
          return <Badges badgeName={item.item_name} key={index} />;
        })
      );
    }
  }, [userItems, curUserItems, getItems]);

  // Load new achievements if they've changed
  useEffect(() => {
    if (userAchievements) {
      getItems();
      changeCurUserAchievements(userAchievements);
    }
    if (curUserAchievements !== "") {
      changeCurUserAchievementsArr(
        curUserAchievements.map((achievement, index) => {
          return (
            <Achievements
              achievementName={achievement.achievement_name}
              key={index}
            />
          );
        })
      );
    }
  }, [userAchievements, curUserAchievements, getItems]);

  return (
    user.isLoggedIn && (
      <div>
        {auth.isLoaded && (
          <>
            <Dialog
              usernameChange={true}
              dialogCallback={props.changeUsername}
            />
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap">
                <Grid item>
                  <Avatar
                    alt="useravatar"
                    src={auth.photoURL}
                    className={classes.bigAvatar}
                  />
                </Grid>
                <Grid item xs zeroMinWidth>
                  {
                    <Typography className={classes.userName} color="primary">
                      {userName}
                    </Typography>
                  }

                  <Typography
                    onClick={() => {
                      props.openDialog(true, {
                        data: null,
                        msg: {
                          title: "What's your new username?",
                          body: ""
                        },
                        date: new Date().toString()
                      });
                    }}
                    className={classes.changeUserName}
                    variant="h5"
                  >
                    Change username
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container justify="center">
                <Grid className={classes.title} item xs={12}>
                  <Typography variant="h5">Badges</Typography>
                </Grid>
                <Grid container alignItems="center" justify="space-around">
                  {userItemsArr}
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h5">Achievements</Typography>
                </Grid>

                <Grid container alignItems="center" justify="space-around">
                  {curUserAchievementsArr}
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </div>
    )
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user,
    test: state,
    userItems: state.user.profile.items,
    userAchievements: state.user.profile.achievements,
    userName: state.user.profile.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUsername: data => dispatch(changeUsername(data)),
    getUserAndLogin: auth => dispatch(getUserAndLogin(auth)),
    getItems: () => dispatch(getItems()),
    openDialog: (open, data) => dispatch(openDialog(open, data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Profile);
