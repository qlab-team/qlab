import React, { Fragment } from "react";
import { Tooltip, Grid } from "@material-ui/core";
import { ReactComponent as Trophy } from "../../../assets/trophy.svg";
import { ReactComponent as Gavin } from "../../../assets/gavin-awman.svg";
import { ReactComponent as MasterBadge } from "../../../assets/master-key.svg";
import { ReactComponent as FiveK } from "../../../assets/5000KICON-01-02.svg";
import { ReactComponent as OneK } from "../../../assets/1000KICON-01.svg";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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

export default Achievements;
