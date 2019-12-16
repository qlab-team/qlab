/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// redux
import { connect } from "react-redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  typography: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px"
    }
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  tableRow: {
    height: "46px",
    fontSize: 8
  },
  negativeBox: {
    display: "flex",
    justifyContent: "center",
    color: "whitesmoke",
    background: "#e91e63",
    padding: theme.spacing(1),
    borderRadius: 50
  },
  positiveBox: {
    display: "flex",
    justifyContent: "center",
    color: "whitesmoke",
    background: "#00cc03",
    padding: theme.spacing(1),
    borderRadius: 50
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    width: 20,
    height: 20
  }
}));

/////////////// COMPONENT
const TransactionHistory = props => {
  const classes = useStyles();
  // set props from redux
  const { transactions } = props;

  // date format
  function date_formating(timeStamp, type) {
    return new Date(timeStamp * 1000).toLocaleDateString("en-US", {
      dateStyle: "long"
    });
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Title>Transaction History</Title>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>Name</TableCell>
              <TableCell>Earnings</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.investment_history ? (
              (transactions.investment_history.sort((a, b) => {
                if (a.timestamp_start.seconds < b.timestamp_start.seconds)
                  return 1;
                if (a.timestamp_start.seconds > b.timestamp_start.seconds)
                  return -1;
                return 0;
              }),
              transactions.investment_history.map(row => (
                <TableRow key={row.user_id} className={classes.tableRow}>
                  <TableCell>
                    {
                      <Grid container wrap="nowrap" className={classes.row}>
                        <Typography className={classes.typography}>
                          {row.username}
                        </Typography>
                        <Avatar
                          alt="useravatar"
                          src={row.photoURL}
                          className={classes.avatar}
                        />
                      </Grid>
                    }
                  </TableCell>
                  <TableCell align="left">
                    <Typography className={classes.typography}>
                      {row.points_earned}
                      <span
                        className="qPointsMark"
                        style={{ fontSize: "smaller" }}
                      >
                        <sup>ℚ</sup>
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography className={classes.typography}>
                      {row.points_cost}
                      <span
                        className="qPointsMark"
                        style={{ fontSize: "smaller" }}
                      >
                        <sup>ℚ</sup>
                      </span>
                    </Typography>
                  </TableCell>
                  {(() => {
                    const profit = row.points_earned - row.points_cost;
                    return profit < 0 ? (
                      <TableCell align="left">
                        <Box component="div" className={classes.negativeBox}>
                          <Typography className={classes.typography}>
                            {profit}
                            <span
                              className="qPointsMark"
                              style={{
                                fontSize: "smaller",
                                color: "white",
                                opacity: 0.5
                              }}
                            >
                              <sup>ℚ</sup>
                            </span>
                          </Typography>
                        </Box>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        <Box component="div" className={classes.positiveBox}>
                          <Typography className={classes.typography}>
                            +{profit}
                            <span
                              className="qPointsMark"
                              style={{
                                fontSize: "smaller",
                                color: "white",
                                opacity: 0.5
                              }}
                            >
                              <sup>ℚ</sup>
                            </span>
                          </Typography>
                        </Box>
                      </TableCell>
                    );
                  })()}
                  <TableCell>
                    <Typography className={classes.typography}>
                      {row.timestamp_start
                        ? date_formating(row.timestamp_start.seconds, "date")
                        : "Null"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.typography}>
                      {row.timestamp_end
                        ? date_formating(row.timestamp_end.seconds, "date")
                        : "Ongoing"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )))
            ) : (
              <TableRow />
            )}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <span style={{ opacity: "0.4" }}>
            Last Updated{" "}
            {(() => {
              const last_updated = date_formating(
                transactions.last_updated.seconds
              );
              if (last_updated !== "NaN/NaN/NaN NaN:NaN:NaN") {
                return last_updated;
              }
            })()}
          </span>
        </div>
      </Paper>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  };
};

/////////////// EXPORTS
export default connect(mapStateToProps)(TransactionHistory);
