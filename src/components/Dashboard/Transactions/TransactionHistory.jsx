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
    color: "whitesmoke",
    background: "#e91e63",
    display: "inline",
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
    margin: theme.spacing(1)
  }
}));

/////////////// COMPONENT
const TransactionHistory = props => {
  const classes = useStyles();
  // set props from redux
  const { transactions } = props;

  // console.log(transactions);

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
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
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
                        <Avatar
                          alt="useravatar"
                          src={row.photoURL}
                          className={classes.avatar}
                        />
                        <Typography>{row.username}</Typography>
                      </Grid>
                    }
                  </TableCell>
                  {/* <TableCell>{row.username}</TableCell> */}
                  <TableCell align="left">
                    {row.points_earned}
                    <span
                      className="qPointsMark"
                      style={{ fontSize: "smaller" }}
                    >
                      <sup>ℚ</sup>
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    {row.points_cost}
                    <span
                      className="qPointsMark"
                      style={{ fontSize: "smaller" }}
                    >
                      <sup>ℚ</sup>
                    </span>
                  </TableCell>
                  {(() => {
                    const profit = row.points_earned - row.points_cost;
                    return profit < 0 ? (
                      <TableCell align="left">
                        <Box component="div" className={classes.negativeBox}>
                          {profit}
                          <span
                            className="qPointsMark"
                            style={{ fontSize: "smaller" }}
                          >
                            <sup>ℚ</sup>
                          </span>
                        </Box>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        {profit}
                        <span
                          className="qPointsMark"
                          style={{ fontSize: "smaller" }}
                        >
                          ℚ
                        </span>
                      </TableCell>
                    );
                  })()}
                  <TableCell>
                    {row.timestamp_start
                      ? date_formating(row.timestamp_start.seconds, "date")
                      : "Null"}
                  </TableCell>
                  <TableCell>
                    {row.timestamp_end
                      ? date_formating(row.timestamp_end.seconds, "date")
                      : "Ongoing"}
                  </TableCell>
                </TableRow>
              )))
            ) : (
              <TableRow />
            )}
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
    transactions: state.transactions
  };
};

/////////////// EXPORTS
export default connect(mapStateToProps)(TransactionHistory);
