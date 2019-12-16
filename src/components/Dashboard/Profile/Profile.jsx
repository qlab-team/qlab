/////////////// IMPORTS
import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import changeUserName from "../../../store/reducers/userReducer";
import { getItems } from "../../../store/actions/profileActions";
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
    overflow: "auto"
  },
  bigAvatar: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("xs")]: {
      width: 50,
      height: 50
    }
  },
  changeUserName: {
    fontSize: 10,
    "&:hover": {
      cursor: "pointer"
    }
  },

  button: {
    paddingRight: 10,
    borderRadius: 50,
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
      borderRadius: 20,
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
  const [userInputField, changeUserInputField] = useState("");
  //const [userInput, changeUserInput] = useState("");
  const [curUserItems, changeCurUserItems] = useState("");
  const [userItemsArr, changeUserItemsArr] = useState("");
  const { user, auth, userItems } = props;
  useEffect(() => {
    if (user.isLoggedIn) {
      props.getItems();
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  //need to refactor this for one useeffect maybe? not sure if best practice or not.
  useEffect(() => {
    if (userItems) {
      changeCurUserItems(userItems);
    }
    if (curUserItems !== "") {
      changeUserItemsArr(
        curUserItems.map(item => {
          return <Badges badgeName={item.item_name} />;
        })
      );
    }
  }, [userItems, curUserItems]);

  const showUserNameInputField = () => {
    if (userInputField !== "") {
      changeUserInputField("");
      return;
    }

    const updateUserInput = event => {
      //event.preventDefault();
      //let userInp = event.target.value;
      //changeUserInput("hey");
    };

    const changeUserNameOnDatabase = event => {
      event.preventDefault();
    };

    changeUserInputField(
      <form onSubmit={changeUserNameOnDatabase}>
        <Input onChange={e => updateUserInput(e)} className={classes.input} />
        <Button
          type="submit"
          className={classes.button}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    );
  };
  return (
    user.isLoggedIn && (
      <div>
        {auth.isLoaded && (
          <>
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
                  <Typography color="primary">
                    {user.profile.username}
                  </Typography>

                  <Typography
                    onClick={showUserNameInputField}
                    className={classes.changeUserName}
                    variant="h5"
                  >
                    Change Username
                  </Typography>
                  {userInputField}
                </Grid>
              </Grid>
            </Paper>
            {/* <Paper className={classes.paper}>
              <Typography variant="h5">Achievements</Typography>

              for quizzes done & date (if we still need/want it)
              <Typography variant="h5">
                You have solved {user.profile.quiz_total} quizzes.
              </Typography>
              <Typography variant="body1">
                {user.profile.last_quiz_done.toDate().toLocaleDateString("en-US")}
              </Typography>
            </Paper> */}

            <Paper className={classes.paper}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography variant="h5">Achievements</Typography>
                </Grid>
                <Grid item xs={12}>
                  {userItemsArr}
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h5">Badges</Typography>
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
    userItems: state.profile.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserName: newUserName => dispatch(changeUserName(newUserName)),
    getItems: () => dispatch(getItems())
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Profile);
