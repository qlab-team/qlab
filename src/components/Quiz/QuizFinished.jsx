import React, { useEffect } from 'react'
import { Button, Paper }  from '@material-ui/core'
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addQuizInfo } from '../../store/actions/quizActions'
import { compose } from 'redux'

  const useStyles = makeStyles(theme => ({
    Confirmation: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        height: 60,
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: 'blue'
         }
      }
  }));
function QuizFinished (props) {
    const classes = useStyles();
    console.log(props)

    useEffect(() => {
        //console.log(props)
        props.addQuizInfo(props.auth.uid, props.quizPoints)
    })

    return (
        <React.Fragment>
            <Paper>Congratulations! You're a god</Paper>
            <Link color="inherit" to="/dashboard">
                <Button className={classes.Confirmation} variant="contained" color="primary">Dashboard</Button>
            </Link>

        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
      leaderboard: state.leaderboard,
      auth: state.firebase.auth
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        addQuizInfo: (authId,quizPoints) => dispatch(addQuizInfo(authId,quizPoints))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(QuizFinished);
