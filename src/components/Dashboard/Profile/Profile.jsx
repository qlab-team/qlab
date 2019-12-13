/////////////// IMPORTS
import React, {useState} from "react";
// import { useEffect } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import changeUserName from '../../../store/reducers/userReducer'

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    
  },
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
    overflow: "auto"
  },
  bigAvatar: {
    width: "100px",
    height: "100px"
  },
  changeUserName: {
    "&:hover": {
      cursor: "pointer"
    }
  },

  button: {
    paddingRight:10,
    borderRadius: 50,
    fontSize: 15,
    textTransform: "none",
    textDecoration: "none !important",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    color: "rgb(92, 27, 249)",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke",
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      [theme.breakpoints.down("xs")]: {
        
        fontSize: 20,
        borderRadius: 20,
        marginTop: 10,
      },
  },
  input: {
    marginLeft:50,
    [theme.breakpoints.down("xs")]: {
      marginLeft:0,
    },
    marginTop: 10,
  },
  
}));

/////////////// COMPONENT
const Profile = props => {
  const classes = useStyles();
  const [userInputField, changeUserInputField] = useState("")
  const [userInput, changeUserInput] = useState("")
  const { user, auth } = props;
  // console.log(user);
  // console.log(auth);
  // useEffect(() => {
  //   if (user.isLoggedIn) {
  //     console.log(user, auth);
  //   }
  //   // eslint-disable-next-line
  // }, [user.isLoggedIn]);

  const showUserNameInputField = () => {
    console.log(userInputField)
    if(userInputField !== "") {
      console.log('hello')
      changeUserInputField("");
      return;
    }

  
  const updateUserInput = (event) => {
    //event.preventDefault();
    let userInp = event.target.value
    console.log(userInp)
    changeUserInput("hey")
    console.log(userInput)
  }
  const changeUserNameOnDatabase = (event) => {
    event.preventDefault()
    console.log(userInput)
  }
    changeUserInputField(
        <form onSubmit={changeUserNameOnDatabase}>
        <Input onChange={(e) => updateUserInput(e)} className={classes.input} />
        <Button type="submit" className={classes.button} color="primary" variant="contained">Submit</Button>
        </form>
      
    )

  }
  return (
    user.isLoggedIn && (
      <div>
        {auth.isLoaded && (
          <>
            <Paper className={classes.paper}>
              <Grid
                container
                wrap="nowrap"
                
              >
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

                  <Typography color="primary">
                  You have solved {user.profile.quiz_total} quizzes.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h5">
                You have solved {user.profile.quiz_total} quizzes.
              </Typography>
              <Typography variant="body1">
                {user.profile.last_quiz_done.toDate().toDateString()}
              </Typography>
            </Paper>
            <Paper className={classes.paper}
            >
            <Typography  onClick={showUserNameInputField}className={classes.changeUserName} variant="h5">
                Change Username
              </Typography>
              {userInputField}
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
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserName: newUserName => dispatch(changeUserName(newUserName))
  }
}

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Profile);
