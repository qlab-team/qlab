/////////////// IMPORTS
import React from "react";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  dashboardOpen: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    color: "white",
    textShadow: "2px 2px 0px #C275FF",
    marginBottom: 6,
    fontFamily: "Aquino",
    fontSize: "30px"
  }
}));

/////////////// COMPONENT
export default function Topbar(props) {
  const classes = useStyles();
  return (
    <Toolbar
      className={clsx(classes.toolbar, props.open && classes.dashboardOpen)}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
        className={clsx(
          classes.menuButton,
          props.open && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        {"QLAB"}
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );
}
