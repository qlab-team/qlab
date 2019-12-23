/////////////// IMPORTS
import React, { Fragment, useState } from "react";
// components
import QuestionAndAnswers from "./QuestionAndAnswers";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// material ui
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0
  },
  title: {
    fontSize: 50,
    marginBottom: 30,
    display: "inline-block"
  },
  logo: {
    flexGrow: 1,
    color: "white",
    textShadow: "2px 2px 0px #C275FF",
    marginLeft: 10,
    fontFamily: "Aquino",
    fontSize: 50,
    display: "inline-block"
  },
  button: {
    minWidth: theme.spacing(13),
    borderRadius: 50,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    marginTop: 15,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke",
      cursor: "pointer"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
}));

/////////////// COMPONENT
const About = props => {
  const classes = useStyles();
  const { auth } = props;

  const [questionsAndAnswers] = useState([
    {
      question: "What is QLAB?",
      answer:
        "QLAB is an application for learning and investing in friends, and where your effort is the currency. The more effort you put in, the more QPoints you get!"
    },
    {
      question: "How do I get more QPoints?",
      answer:
        "There are two main ways to get QPoints! One is to take more quizzes. The harder the quiz, the more points you will get. The second way is to invest in your peers, and depending on how much they study you will be rewarded with Qpoints everyday."
    },
    {
      question: "How does investing work?",
      answer:
        "Investing is a way to get Qpoints over time. You will be rewarded daily depending on how much your 'investment' (The person you invested in) studies and ups their 'eScore' You are able to invest in users from the leaderboard (Seen on the sidebar)"
    },
    {
      question: "What is eScore?",
      answer:
        "eScore is a representation of how much you have been learning! If you are taking quizzes everyday it will go up, but if you miss a day it will start to go down."
    },
    {
      question: "What can I do with QPoints?",
      answer:
        "You're able to buy 'badges' that you can find in your profile page. Your QPoints will affect your ranking in the leaderboard!"
    },
    {
      question: "What is the leaderboard?",
      answer:
        "The leaderboard is the place you can see other people's score, and also can invest in other users here!"
    },
    {
      question: "What's an achievement?",
      answer:
        "An achievement is something you get for completing a specific task in QLAB. These can be seen from your profile. One example is getting a trophy for getting to the top of the leaderboard."
    }
  ]);
  const isLogin = () => {
    if (auth.isLoaded) {
      if (auth.isEmpty) {
        props.history.push("/");
        return;
      }
    }
    props.history.push("/dashboard/stats");
  };
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Toolbar>
          <Button onClick={isLogin} className={classes.button}>
            Back
          </Button>
        </Toolbar>
        <Typography className={classes.title}>About</Typography>
        <Typography className={classes.logo}>QLAB</Typography>
        <Grid container>
          {questionsAndAnswers.map((qAndA, index) => {
            return (
              <QuestionAndAnswers
                key={index}
                question={qAndA.question}
                answer={qAndA.answer}
              />
            );
          })}
        </Grid>
      </Paper>
    </Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps))(About);
