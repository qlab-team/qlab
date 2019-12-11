import React, {Fragment, useState } from "react";
import { makeStyles, } from "@material-ui/core";
import Ratings from 'react-ratings-declarative';
import Star from './Star'
const useStyles = makeStyles(theme => ({
    Star: {
    color: "white",
    height: 50,
    "&:hover": {
        cursor: "pointer"
      },
  }
}));

function Stars(props) {
    const classes = useStyles();
    const [starAmount] = useState([1,2,3,4,5])
    const [userRating, changeUserRating] = useState(0)

    const updateUserRating = (rating) => {
      console.log('uo');
      changeUserRating(rating)
    }
  return (
      <Fragment>
     <Ratings
        rating={userRating}
        changeRating={updateUserRating}
        widgetHoverColors = "yellow"
        widgetRatedColors="yellow"
        widgetDimensions="40px"
        widgetSpacings="15px"
      >
        <Ratings.Widget  />
        <Ratings.Widget  />
        <Ratings.Widget  />
        <Ratings.Widget  />
        <Ratings.Widget  />

      {/* {starAmount.map(star => {
        return <Star updateUserRating={updateUserRating} val={star} />
      })} */}
      </Ratings>
    </Fragment>
  );
}

export default Stars;
