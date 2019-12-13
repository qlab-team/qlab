/////////////// IMPORTS
import React from "react";
// components
import TransactionHistory from "./TransactionHistory";
import PurchaseHistory from "./PurchaseHistory";
// material ui
import { Grid } from "@material-ui/core";

/////////////// COMPONENT
export const Transactions = props => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TransactionHistory />
      </Grid>
      <Grid item xs={12}>
        <PurchaseHistory />
      </Grid>
    </Grid>
  );
};
