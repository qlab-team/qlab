import React, { Fragment } from "react";
import { Grid, Tooltip } from "@material-ui/core";
//ASSETS
import { ReactComponent as SnakeCatBadge } from "../../../assets/svgs/snakecat-icon.svg";
import { ReactComponent as DerekBadge } from "../../../assets/svgs/derek-icon.svg";
import { ReactComponent as CafeLatteBadge } from "../../../assets/svgs/cafe-latte-icon.svg";
import { ReactComponent as PhantomPizzaBadge } from "../../../assets/svgs/phantom-pizza-icon.svg";
import { ReactComponent as CabinBadge } from "../../../assets/svgs/cabin.svg";
import { ReactComponent as CameraBadge } from "../../../assets/svgs/camera.svg";
import { ReactComponent as SunBadge } from "../../../assets/svgs/sunny.svg";
import { ReactComponent as CellPhoneBadge } from "../../../assets/svgs/cellphone.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Badges = props => {
  return (
    <Fragment>
      <Grid item xs={3}>
        {(() => {
          switch (props.badgeName) {
            case "Snake Cat Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <SnakeCatBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Derek Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <DerekBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Café Latte Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CafeLatteBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Phantom Pizza Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <PhantomPizzaBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Cabin Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CabinBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Cell Phone Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CellPhoneBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Sun Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <SunBadge width="45%" height="45%" />
                </Tooltip>
              );
            case "Camera Badge":
              return (
                <Tooltip title={props.badgeName}>
                  <CameraBadge width="45%" height="45%" />
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
