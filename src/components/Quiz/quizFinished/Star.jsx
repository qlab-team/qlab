/////////////// IMPORTS
import React, { Fragment } from "react";
// react ratings
import Ratings from "react-ratings-declarative";

/////////////// COMPONENT
function Star(props) {
  return (
    <Fragment>
      <Ratings.Widget onClick={props.updateUserRating()} />
    </Fragment>
  );
}

/////////////// EXPORTS
export default Star;
