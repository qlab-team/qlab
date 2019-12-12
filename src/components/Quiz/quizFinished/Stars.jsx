import React, {Fragment, useState } from "react";
import Ratings from 'react-ratings-declarative';
// const useStyles = makeStyles(theme => ({
//     Star: {
//     color: "white",
//     height: 50,
//     "&:hover": {
//         cursor: "pointer"
//       },
//   }
// }));

function Stars(props) {
    //const classes = useStyles();
    const [userRating, changeUserRating] = useState(0)

    const updateUserRating = (rating) => {
      changeUserRating(rating)
      props.updateQuizState(rating)
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
