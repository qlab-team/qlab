/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
// components
import StoreCard from "./StoreCard";
// actions
import { getStoreItems } from "../../../store/actions/storeActions";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
const Store = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  props.getStoreItems();
  return (
    <React.Fragment>
      <Grid container spacing={3} wrap="wrap">
        {props.storeItems.map(storeItem => {
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
        })}
      </Grid>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    storeItems: state.store
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStoreItems: () => dispatch(getStoreItems())
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Store);
