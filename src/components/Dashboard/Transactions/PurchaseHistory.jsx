/////////////// IMPORTS
import React, { useEffect } from "react";
// components
import Title from "../Title";
// import StoreCard from "./StoreCard";
// actions
import { getTransactions } from "../../../store/actions/transactionsActions";
// material ui
import { Grid, Paper } from "@material-ui/core";
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
const PurchaseHistory = props => {
  const classes = useStyles();
  // set props from redux
  const { auth, user } = props;
  console.log(user);
  console.log(user.profile.items);
  // date format
  function date_formating(timeStamp) {
    const d = new Date(timeStamp * 1000);
    const yearFull = d.getFullYear();
    // const yearTwo = d.getYear() > 100 ? d.getYear() - 100 : d.getYear();
    const monthNum =
      d.getMonth() < 9 ? "0" + d.getMonth() + 1 : d.getMonth() + 1;
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return (
      yearFull + "/" + monthNum + "/" + day + " " + hour + ":" + min + ":" + sec
    );
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
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.profile.items ? (
                (user.profile.items.sort((a, b) => {
                  if (a.purchaseDate < b.purchaseDate) return 1;
                  if (a.purchaseDate > b.purchaseDate) return -1;
                  return 0;
                }),
                user.profile.items.map(item => (
                  <TableRow key={item.itemId} className={classes.tableRow}>
                    <TableCell>{item.purchaseDate}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell align="right">{item.itemPrice}</TableCell>
                  </TableRow>
                )))
              ) : (
                <TableRow />
              )}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            LastUpdated{" "}
            {/* {(() => {
              const last_updated = date_formating(
                item.last_updated.seconds
              );
              if (last_updated !== "NaN/NaN/NaN NaN:NaN:NaN") {
                return last_updated;
              }
            })()} */}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     getTransactions: authId => dispatch(getTransactions(authId))
//   };
// };

/////////////// EXPORTS
// export default compose(connect(mapStateToProps, mapDispatchToProps))(
export default compose(connect(mapStateToProps))(PurchaseHistory);
