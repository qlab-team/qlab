/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
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
const PurchaseHistory = props => {
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
  const { user } = props;
  // date format
  function date_formating(timeStamp, type) {
    return new Date(timeStamp * 1000).toLocaleDateString("en-US", {
      dateStyle: "long"
    });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Purchase History</Title>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.profile.items ? (
                (user.profile.items.sort((a, b) => {
                  if (a.purchaseDate < b.purchaseDate) return -1;
                  if (a.purchaseDate > b.purchaseDate) return 1;
                  return 0;
                }),
                user.profile.items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow key={item.item_id} className={classes.tableRow}>
                      <TableCell>
                        <Typography className={classes.typography}>
                          {date_formating(
                            Date.parse(item.purchase_date) / 1000,
                            "date"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.typography}>
                          {item.item_name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.typography}>
                          {item.item_price}
                          <span
                            className="qPointsMark"
                            style={{
                              fontSize: "smaller"
                            }}
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
            count={user.profile.items ? user.profile.items.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(PurchaseHistory);
