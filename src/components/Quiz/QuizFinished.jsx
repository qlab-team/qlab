import React from 'react'
import { withStyles, Button, Paper }  from '@material-ui/core'
import { Link } from "react-router-dom"
const styles = {
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
  };

function QuizFinished (props) {
    return (
        <React.Fragment>
            <Paper>Congratulations! You're a god</Paper>
            <Link color="inherit" to="/dashboard">
                <Button variant="contained" color="primary">Dashboard</Button>
            </Link>

        </React.Fragment>
    )
}

export default withStyles(styles)(QuizFinished);
