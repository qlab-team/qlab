/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

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
  // for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // set props from redux
  const { transactions } = props;

  // date format
  function date_formating(timeStamp) {
    return new Date(timeStamp * 1000).toLocaleDateString("en-US", {
      dateStyle: "long"
    });
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
              transactions.quiz_history
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((quiz, id) => (
                  <TableRow key={id} className={classes.tableRow}>
                    <TableCell>
                      <Typography className={classes.typography}>
                        {quiz.date
                          ? date_formating(quiz.date.seconds, "datetime")
                          : "Null"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.typography}>
                        {quiz.quiz_title}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.typography}>
                        {quiz.points_earned}
                        <span
                          className="qPointsMark"
                          style={{ fontSize: "smaller" }}
                        >
                          <sup>ℚ</sup>
                        </span>
                      </Typography>
                    </TableCell>
                  </TableRow>
                )))
            ) : (
              <TableRow />
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={transactions.quiz_history.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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
