/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
  }
}));

/////////////// COMPONENT
const QuizHistory = props => {
  const classes = useStyles();
  // set props from redux
  const { transactions } = props;

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
    if (type === "datetime")
      return monthStr + " " + day + " " + yearFull + " - " + hour + ":" + min;
    return (
      yearFull + "/" + monthNum + "/" + day + " " + hour + ":" + min + ":" + sec
    );
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Title>Quiz History</Title>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.quiz_history ? (
              (transactions.quiz_history.sort((a, b) => {
                if (a.date.seconds < b.date.seconds) return 1;
                if (a.date.seconds > b.date.seconds) return -1;
                return 0;
              }),
              transactions.quiz_history.map((quiz, id) => (
                <TableRow key={id} className={classes.tableRow}>
                  <TableCell>
                    {quiz.date
                      ? date_formating(quiz.date.seconds, "datetime")
                      : "Null"}
                  </TableCell>
                  <TableCell>{quiz.quiz_title}</TableCell>
                  <TableCell align="left">
                    {quiz.points_earned}
                    <span
                      className="qPointsMark"
                      style={{ fontSize: "smaller" }}
                    >
                      <sup>ℚ</sup>
                    </span>
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
export default connect(mapStateToProps)(QuizHistory);
