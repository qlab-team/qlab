import React from 'react'
import { Grid, Paper, Typography} from '@material-ui/core'
import { red } from '@material-ui/core/colors';


const styles = {
    Paper: {
        backgroundColor: red,
        padding: 20,
        marginTop:10,
        marginBottom: 10,
        height:60,
    }
}

// const randomizer = () => {
//     let indexArr = [0,1,2,3]

//     return () => {

//     }
// }

export default props => {


    function hey() {
        console.log('yo')
    }


    return <div> 
        <Grid container>
            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {props.answers[0]}
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {props.answers[1]}
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {props.answers[2]}
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {props.answers[3]}
                </Paper>
            </Grid>
            
        </Grid>  
        </div>
}