import React, { useEffect } from 'react'
import { Button, Typography, Container, Box }  from '@material-ui/core'
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addQuizInfo } from "../../store/actions/quizActions";
import { compose } from "redux";

  const useStyles = makeStyles(theme => ({

    Container: {
        background:
        "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    },
    Box: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        justifyContent: "center",
        alignItems: "center"
    },

    Confirmation: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        background: "rgb(92, 27, 249)",
        boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
       
        '&:hover': {
            backgroundColor: 'blue'
         }
      },
      Congratulations: {
          fontSize: 40,
      },

      MessagePaper : {
      },

      CongratsLink : {
          textDecoration: "none"
      },
      Button: {
        margin: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: 50,
        fontSize: 20,
        textTransform: "none",
        textDecoration: "none !important",
        padding: theme.spacing(2),
        color: "rgb(92, 27, 249)",
        transition: "ease-in-out 0.15s",
        background: "whitesmoke",
        "&:hover": {
          background: "rgb(92, 27, 249)",
          color: "whitesmoke"
        },
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
          ].join(","),
    }

      
  }));
function QuizFinished (props) {
    const classes = useStyles();
    console.log(props)

    useEffect(() => {
        //console.log(props)
        //props.addQuizInfo(props.auth.uid, props.quizPoints)
    })

    return (
        <React.Fragment>
            <Container className={classes.Container}>
                <Box className={classes.Box}>
                <Typography className={classes.Congratulations}>Congratulations! You got 10 Points!</Typography>
                
                <Link className={classes.Button} color="inherit" to="/dashboard">
                Dashboard
                </Link>
                </Box>
            </Container>
            </React.Fragment>
    )
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuizInfo: (authId, quizPoints) =>
      dispatch(addQuizInfo(authId, quizPoints))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  QuizFinished
);
