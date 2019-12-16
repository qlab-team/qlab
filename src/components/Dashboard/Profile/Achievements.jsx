import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const Achievements = props => {
  return (
    <Fragment>
      <Typography>{props.achievementName}</Typography>
    </Fragment>
  );
};

export default Achievements;
