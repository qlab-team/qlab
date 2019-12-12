/////////////// IMPORTS
import React from "react";
// redux
import { compose } from "redux";
import { Typography, Grid } from "@material-ui/core";
import Title from "../Title";
// react-router
import { Link } from "react-router-dom";
// actions
import { addBadge } from "../../../store/actions/storeActions";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
}));

/////////////// COMPONENT
const StoreCard = props => {
  const classes = useStyles();
  const { auth, user } = props;
  return (
    <Grid
      className={classes.root}
      // onMouseEnter={loadQuiz}
      container
      justify="space-around"
      direction="column"
    >
      <Title>{props.itemName}</Title>
      <Typography variant="body2">{props.itemDescription}</Typography>
      <Link
        className={classes.button}
        style={{ textDecoration: "none" }}
        onClick={() => {
          const data = {
            purchaseDate: new Date().toString(),
            itemName: props.itemName,
            itemId: props.itemId
          };
          props.addBadge(data, auth, user);
        }}
      >
        {props.itemPrice}
      </Link>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    storeItems: state.storeItems,
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addBadge: (data, auth, user) => dispatch(addBadge(data, auth, user))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(StoreCard);
