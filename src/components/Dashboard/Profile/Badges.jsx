import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
//ASSETS
import { ReactComponent as SnakeCatBadge } from "../../../assets/snakecat-icon.svg";
import { ReactComponent as DerekBadge } from "../../../assets/derek-icon.svg";
import { ReactComponent as CafeLatteBadge } from "../../../assets/cafe-latte-icon.svg";
import { ReactComponent as PhantomPizzaBadge } from "../../../assets/phantom-pizza-icon.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Badges = props => {
  return (
    <Fragment>
      <Grid item xs={2}>
        {(() => {
          switch (props.badgeName) {
            case "Snake Cat Badge":
              return <SnakeCatBadge width="60%" height="60%" />;
            case "Derek Badge":
              return <DerekBadge width="60%" height="60%" />;
            case "Café Latte Badge":
              return <CafeLatteBadge width="60%" height="60%" />;
            case "Phantom Pizza Badge":
              return <PhantomPizzaBadge width="60%" height="60%" />;
            default:
              return <ShoppingCartIcon fontSize="large" />;
          }
        })()}
      </Grid>
    </Fragment>
  );
};

export default Badges;
