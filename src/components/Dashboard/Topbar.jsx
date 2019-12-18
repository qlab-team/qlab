/////////////// IMPORTS
import React from "react";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Popper from "@material-ui/core/Popper";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// actions
import { notificationRead } from "../../store/actions/investmentActions";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

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
  },
  paper: {
    border: "1px solid transparent",
    minWidth: theme.spacing(9),
    borderRadius: 50,
    fontSize: 15,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "whitesmoke",
    transition: "ease-in-out 0.15s",
    background: "rgb(92, 27, 249)",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke",
      cursor: "pointer"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  popper: {
    zIndex: "2000 !important",
    marginRight: theme.spacing(2)
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

/////////////// COMPONENT
const Topbar = props => {
  //Set Props from Redux
  const { investments } = props;

  //Use Styles
  const classes = useStyles();

  // popper logic
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "spring-popper" : undefined;

  const { user } = props;
  const [earningsToday, setEarningsToday] = React.useState(0);

  React.useEffect(() => {
    if (user.isLoggedIn) {
      console.log("EARNINGS TODAY:", user.profile.earnings_today);
      setEarningsToday(user.profile.earnings_today);
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

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
      <IconButton
        color="inherit"
        onMouseEnter={handleClick}
        onMouseLeave={handleClick}
      >
        <Link
          style={{ textDecoration: "none", color: "whitesmoke" }}
          to="/dashboard/stats"
        >
          <Badge
            // max={500}
            badgeContent={`+${user.profile.earnings_today}`}
            color="secondary"
            invisible={!earningsToday > 0}
          >
            <TimelineIcon />
          </Badge>
        </Link>
      </IconButton>
      <Popper
        className={classes.popper}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="left"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            {user.profile.earnings_today ? (
              <div className={classes.paper}>
                Your investments returned{" "}
                <b>{user.profile.earnings_today || 0}</b> points today!{" "}
              </div>
            ) : (
              <div className={classes.paper}>No investment income today. </div>
            )}
          </Fade>
        )}
      </Popper>
    </Toolbar>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    investments: state.investments,
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    notificationRead: () => dispatch(notificationRead())
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Topbar);
