import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Ratings from "react-ratings-declarative";

function Star(props) {
  return (
    <Fragment>
      <Ratings.Widget onClick={props.updateUserRating()} />
    </Fragment>
  );
}

export default Star;
