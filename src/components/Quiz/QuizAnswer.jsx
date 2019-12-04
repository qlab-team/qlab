import React from 'react'

export default props => {
    return(
        <Grid item xs={6}>
          <Paper style={styles.Paper}>{props.answers[2]}</Paper>
        </Grid>
    )
    
}