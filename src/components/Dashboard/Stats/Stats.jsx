import React from "react";
// components
import Chart from "./Chart";
import QPoints from "./QPoints.jsx";
import PerformanceTable from "./PerformanceTable";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Stats() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* QPoints */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <QPoints />
        </Paper>
      </Grid>
      {/* PerformanceTable */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <PerformanceTable />
        </Paper>
      </Grid>
    </Grid>
  );
}
