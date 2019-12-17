import React, { Fragment } from "react";
import { Grid, Tooltip } from "@material-ui/core";
//ASSETS
import { ReactComponent as SnakeCatBadge } from "../../../assets/snakecat-icon.svg";
import { ReactComponent as DerekBadge } from "../../../assets/derek-icon.svg";
import { ReactComponent as CafeLatteBadge } from "../../../assets/cafe-latte-icon.svg";
import { ReactComponent as PhantomPizzaBadge } from "../../../assets/phantom-pizza-icon.svg";
import { ReactComponent as CabinBadge } from "../../../assets/cabin.svg";
import { ReactComponent as CameraBadge } from "../../../assets/camera.svg";
import { ReactComponent as SunBadge } from "../../../assets/sunny.svg";
import { ReactComponent as CellPhoneBadge } from "../../../assets/cellphone.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Badges = props => {
  return (
    <Fragment>
      <Grid item xs={2}>
        {(() => {
          switch (props.badgeName) {
            case "Snake Cat Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <SnakeCatBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Derek Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <DerekBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Café Latte Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CafeLatteBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Phantom Pizza Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <PhantomPizzaBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Cabin Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CabinBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Cell Phone Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CellPhoneBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Sun Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <SunBadge width="60%" height="60%" />
                </Tooltip>
              );
            case "Camera Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CameraBadge width="60%" height="60%" />
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

export default Badges;
