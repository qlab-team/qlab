/////////////// IMPORTS
import React, { Fragment } from "react";
// material ui
import { Tooltip, Grid } from "@material-ui/core";
// svgs
import { ReactComponent as Trophy } from "../../../assets/svgs/trophy.svg";
import { ReactComponent as Gavin } from "../../../assets/svgs/gavin-awman.svg";
import { ReactComponent as MasterBadge } from "../../../assets/svgs/master-key.svg";
import { ReactComponent as OneK } from "../../../assets/svgs/Q1000ICON.svg";
import { ReactComponent as FiveK } from "../../../assets/svgs/Q5000ICON.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

/////////////// COMPONENT
const Achievements = props => {
  return (
    <Fragment>
      <Grid item xs={2}>
        {(() => {
          switch (props.achievementName) {
            case "Reached the top of the leaderboard!":
              return (
                <Tooltip title={props.achievementName}>
                  <Trophy width="60%" height="60%" />
                </Tooltip>
              );
            case "Reached the... bottom of the leaderboard!":
              return (
                <Tooltip title={props.achievementName}>
                  <Gavin width="60%" height="60%" />
                </Tooltip>
              );
            case "Got 1000 points!":
              return (
                <Tooltip title={props.achievementName}>
                  <OneK width="60%" height="60%" />
                </Tooltip>
              );
            case "Got 5000 points!":
              return (
                <Tooltip title={props.achievementName}>
                  <FiveK width="60%" height="60%" />
                </Tooltip>
              );
            case "Bought all the badges!":
              return (
                <Tooltip title={props.achievementName}>
                  <MasterBadge width="60%" height="60%" />
                </Tooltip>
              );
            default:
              return <ShoppingCartIcon fontSize="large" />;
          }
        })()}
      </Grid>
    </Fragment>
  );
};

/////////////// EXPORTS
export default Achievements;
