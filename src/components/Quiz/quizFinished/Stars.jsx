/////////////// IMPORTS
import React, { Fragment, useState } from "react";
// react ratings
import Ratings from "react-ratings-declarative";

/////////////// COMPONENT
function Stars(props) {
  const [userRating, changeUserRating] = useState(0);

  const updateUserRating = rating => {
    changeUserRating(rating);
    props.updateQuizState(rating);
  };
  return (
    <Fragment>
      <Ratings
        rating={userRating}
        changeRating={updateUserRating}
        widgetHoverColors="rgb(255, 221, 111)"
        widgetRatedColors="rgb(255, 221, 111)"
        widgetDimensions="90px"
        widgetEmptyColors="rgb(86, 50, 172)"
        widgetSpacings="0px"
      >
        <Ratings.Widget svgIconPath="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        <Ratings.Widget svgIconPath="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        <Ratings.Widget svgIconPath="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        <Ratings.Widget svgIconPath="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        <Ratings.Widget
          width="50"
          height="50"
          svgIconPath="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
        />
      </Ratings>
    </Fragment>
  );
}

/////////////// EXPORTS
export default Stars;
