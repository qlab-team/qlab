import React from 'react'
import {AppBar, LinearProgress}  from '@material-ui/core'

const progress = 50;

export default props => {
    return (
        <AppBar>

            <LinearProgress variant="determinate" value={progress} color="secondary" />    

        </AppBar>
    )
}
