/////////////// IMPORTS
import React from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { openDialog } from "../../../store/actions/dialogActions";
// components
import Title from "../Title";
// material ui
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

/////////////// UTILITIES
function preventDefault(event) {
  event.preventDefault();
}

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  typography: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px"
    }
  },
  button: {
    minWidth: theme.spacing(9),
    borderRadius: 50,
    fontSize: 10,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke",
      cursor: "pointer"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    width: 20,
    height: 20
  }
}));

/////////////// COMPONENT
const PerformanceTable = props => {
  const classes = useStyles();
  // set props from redux
  const { investments } = props;

  return (
    <React.Fragment>
      <Title>Your Investments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Earnings</TableCell>
            <TableCell align="right">
              <span className="qPointsMark" style={{ fontSize: "smaller" }}>
                <sup>e</sup>
              </span>
              Score
            </TableCell>
            {/* <TableCell align="right">Last Login</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {investments.investments.map((investment, i) => (
            <TableRow key={i}>
              <TableCell>
                <Typography className={classes.typography}>
                  {investment.date.toDate().toLocaleDateString("en-US")}
                </Typography>
              </TableCell>
              <TableCell>
                {
                  <Grid container wrap="nowrap" className={classes.row}>
                    <Typography className={classes.typography}>
                      {investment.display_name}
                    </Typography>
                    <Avatar
                      alt="useravatar"
                      src={investment.photoURL}
                      className={classes.avatar}
                    />
                  </Grid>
                }
              </TableCell>
              <TableCell>
                <Typography className={classes.typography}>
                  {investment.points_cost}
                  <span className="qPointsMark" style={{ fontSize: "smaller" }}>
                    <sup>ℚ</sup>
                  </span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.typography}>
                  {investment.points_earned}
                  <span className="qPointsMark" style={{ fontSize: "smaller" }}>
                    <sup>ℚ</sup>
                  </span>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  className={classes.button}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={e => {
                    e.target.innerHTML = "Remove";
                  }}
                  onMouseLeave={e => {
                    e.target.innerHTML = investment.q_score;
                  }}
                  onClick={() => {
                    const data = {
                      user_id: investment.user_id,
                      msg: {
                        title: "Remove investment",
                        body: `Are you sure you want to remove ${investment.display_name}?`
                      }
                    };
                    props.openDialog(true, data);
                  }}
                >
                  {investment.q_score}
                  <></>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Discover more investments
        </Link>
      </div>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    investments: state.investments,
    user: state.user,
    leaderboard: state.leaderboard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openDialog: (open, data) => dispatch(openDialog(open, data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PerformanceTable
);
