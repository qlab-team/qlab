/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// import StoreCard from "./StoreCard";
// actions
import { getTransactions } from "../../../store/actions/transactionsActions";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

/////////////// COMPONENT
const Transactions = props => {
  const classes = useStyles();
  // set props from redux
  const { auth } = props;
  console.log(auth);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  props.getTransactions(props.auth.uid);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Investment History</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Earnable Points</TableCell>
                <TableCell align="right">Invested Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {
            (allUsers.sort((a, b) => {
              if (a.q_points < b.q_points) return 1;
              if (a.q_points > b.q_points) return -1;
              return 0;
            }),
            allUsers.map((row, id) => (
              <TableRow key={row.user_id}>
                <TableCell>{id + 1}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell align="right">{row.q_points}</TableCell>
                <TableCell align="right"> */}
              {/* <Button
                    className={classes.button}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={e => {
                      e.target.innerHTML = "Invest";
                    }}
                    onMouseLeave={e => {
                      e.target.innerHTML = row.q_score;
                    }}
                    // onClick={() => {
                    //   const data = {
                    //     username: row.username,
                    //     investment_made: new Date(),
                    //     q_score: row.q_score,
                    //     q_points: row.q_points,
                    //     user_id: row.user_id
                    //   };
                    //   props.addInvestment(data, auth, user);
                    // }}
                  >
                    {row.q_score}
                  </Button> */}
              {/* </TableCell> */}
              {/* </TableRow>
            )))
          } */}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            LastUpdated{" "}
            {/* {(() => {
          if (last_updated !== "NaN/NaN/NaN NaN:NaN:NaN") {
            return last_updated;
          }
        })()} */}
          </div>
          {/* {props.storeItems.map(storeItem => {
          // console.log(quiz);
          return (
            <Grid item xs md={4}>
              <Paper className={fixedHeightPaper}>
                <StoreCard
                  itemName={storeItem.item_name}
                  itemId={storeItem.item_id}
                  itemPrice={storeItem.item_price}
                  itemDescription={storeItem.item_description}
                />
              </Paper>
            </Grid>
          );
        })} */}
        </Paper>
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    transactions: state.transactions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: authId => dispatch(getTransactions(authId))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  Transactions
);
