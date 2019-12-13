/////////////// IMPORTS
import React, { useEffect } from "react";
// components
import Title from "../Title";
// actions
import { getTransactions } from "../../../store/actions/transactionsActions";
// material ui
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    height: "46px"
  },
  negativeBox: {
    color: "#e91e63",
    background: "whitesmoke",
    display: "inline",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: 10
  },
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

/////////////// COMPONENT
const TransactionHistory = props => {
  const classes = useStyles();
  // set props from redux
  const { auth, transactions } = props;

  useEffect(() => {
    if (auth.isLoaded) {
      props.getTransactions(auth.uid);
    }
    // eslint-disable-next-line
  }, [auth.isLoaded]);

  // date format
  function date_formating(timeStamp, type) {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const d = new Date(timeStamp * 1000);
    const yearFull = d.getFullYear();
    // const yearTwo = d.getYear() > 100 ? d.getYear() - 100 : d.getYear();
    const monthNum =
      d.getMonth() < 9 ? "0" + d.getMonth() + 1 : d.getMonth() + 1;
    const monthStr = month[d.getMonth()];
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    if (type === "date") return monthStr + " " + day + " " + yearFull;
    return (
      yearFull + "/" + monthNum + "/" + day + " " + hour + ":" + min + ":" + sec
    );
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
              <TableCell>Invested Start</TableCell>
              <TableCell>Invested End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (transactions.investments.sort((a, b) => {
                if (a.timestamp_start.seconds < b.timestamp_start.seconds)
                  return 1;
                if (a.timestamp_start.seconds > b.timestamp_start.seconds)
                  return -1;
                return 0;
              }),
              transactions.investments.map(row => (
                <TableRow key={row.user_id} className={classes.tableRow}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell align="right">{row.points_earned}</TableCell>
                  <TableCell align="right">{row.points_cost}</TableCell>
                  {(() => {
                    const profit = row.points_earned - row.points_cost;
                    if (profit < 0) {
                      return (
                        <TableCell align="right">
                          <Box component="div" className={classes.negativeBox}>
                            {profit}
                          </Box>
                        </TableCell>
                      );
                    } else {
                      return <TableCell align="center">{profit}</TableCell>;
                    }
                  })()}
                  <TableCell>
                    {date_formating(row.timestamp_start.seconds, "date")}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      if (row.timestamp_end) {
                        return date_formating(
                          row.timestamp_end.seconds,
                          "date"
                        );
                      } else {
                        return "-";
                      }
                    })()}
                  </TableCell>
                </TableRow>
              )))
            }
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          LastUpdated{" "}
          {(() => {
            const last_updated = date_formating(
              transactions.last_updated.seconds
            );
            if (last_updated !== "NaN/NaN/NaN NaN:NaN:NaN") {
              return last_updated;
            }
          })()}
        </div>
      </Paper>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: authId => dispatch(getTransactions(authId))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  TransactionHistory
);
