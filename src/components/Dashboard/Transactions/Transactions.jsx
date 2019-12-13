/////////////// IMPORTS
import React, { useEffect } from "react";
// components
import TransactionHistory from "./TransactionHistory";
import PurchaseHistory from "./PurchaseHistory";
import QuizHistory from "./QuizHistory";
// actions
import { getTransactions } from "../../../store/actions/transactionsActions";
// material ui
import { Grid } from "@material-ui/core";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// COMPONENT
const Transactions = props => {
  // set props from redux
  const { auth } = props;

  useEffect(() => {
    if (auth.isLoaded) {
      props.getTransactions(auth.uid);
    }
    // eslint-disable-next-line
  }, [auth.isLoaded]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TransactionHistory />
      </Grid>
      <Grid item xs={12}>
        <PurchaseHistory />
      </Grid>
      <Grid item xs={12}>
        <QuizHistory />
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
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
  Transactions
);
