/////////////// IMPORTS
import React, { Fragment, useState } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import QuestionAndAnswers from "./QuestionAndAnswers";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  paper: {
    paper: {
      maxWidth: "100vw",
      padding: theme.spacing(2),
      overflow: "auto",
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 0
    }
  },
  title: {
    fontSize: 50,
    marginBottom: 30
  }
}));

/////////////// COMPONENT
const About = () => {
  const classes = useStyles();
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
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>FAQ</Typography>

        <Grid container>
          {questionsAndAnswers.map(qAndA => {
            return (
              <QuestionAndAnswers
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

/////////////// EXPORTS
export default About;
