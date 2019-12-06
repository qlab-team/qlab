import React from "react";
// react-router
import { Link } from "react-router-dom";
// firebase
import firebase from "../../config/fbConfig";
// material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const MainListItems = props => {
  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/profile"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/leaderboard"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/stats"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/quizzes"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>

          <ListItemText primary="Quizzes" />
        </ListItem>
      </Link>
    </div>
  );
};

export const SecondaryListItems = props => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <Link
          onClick={() => {
            firebase.auth().signOut();
            props.userLogout();
          }}
          style={{ textDecoration: "none", color: "white" }}
          to="/"
        >
          <ListItemText primary="Logout" />
        </Link>
      </ListItem>
    </div>
  );
};
