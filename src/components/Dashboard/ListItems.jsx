import React from "react";
// material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// react-router
import { Link } from "react-router-dom";
// firebase
import firebase from "../../config/fbConfig";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/profile"
      >
        <ListItemText primary="Profile" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/leaderboard"
      >
        <ListItemText primary="Leaderboard" />
      </Link>{" "}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/stats"
      >
        <ListItemText primary="Stats" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/quizzes"
      >
        <ListItemText primary="Quizzes" />
      </Link>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <Link
        onClick={() => firebase.auth().signOut()}
        style={{ textDecoration: "none", color: "white" }}
        to="/"
      >
        <ListItemText primary="Logout" />
      </Link>
    </ListItem>
  </div>
);
