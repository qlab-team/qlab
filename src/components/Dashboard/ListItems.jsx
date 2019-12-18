/////////////// IMPORTS
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
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import BarChartIcon from "@material-ui/icons/BarChart";
import StoreIcon from "@material-ui/icons/Store";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// badges
import Badge from "@material-ui/core/Badge";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { setBadgeInvisible } from "../../store/actions/sidebarActions";

/////////////// COMPONENTS
const MainListItems = props => {
  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/profile"
        onClick={() => {
          // props.handleDrawerClose();
          props.setBadgeInvisible({ profile: true });
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
            <Badge
              max={500}
              badgeContent={`NEW`}
              color="secondary"
              invisible={props.sidebar.badgesInvisible.profile}
            ></Badge>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/stats"
        onClick={() => {
          // props.handleDrawerClose();
          props.setBadgeInvisible({ stats: true });
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
            <Badge
              max={500}
              badgeContent={`NEW`}
              color="secondary"
              invisible={props.sidebar.badgesInvisible.stats}
            ></Badge>
          </ListItemIcon>
          <ListItemText primary="Stats" />
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
        to="/dashboard/Transactions"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/dashboard/store"
        onClick={props.handleDrawerClose}
      >
        <ListItem button>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Store" />
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
      <Link
        onClick={() => {
          firebase.auth().signOut();
          props.userLogout();
        }}
        style={{ textDecoration: "none", color: "white" }}
        to="/"
      >
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </div>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth,
    sidebar: state.sidebar
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setBadgeInvisible: data => dispatch(setBadgeInvisible(data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MainListItems
);
