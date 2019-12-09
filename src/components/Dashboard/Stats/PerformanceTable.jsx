/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import {
  getInvestments,
  removeInvestment
} from "../../../store/actions/statsActions";
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

/////////////// UTILITIES
function preventDefault(event) {
  event.preventDefault();
}

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
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
  }
}));

/////////////// COMPONENT
const PerformanceTable = props => {
  const classes = useStyles();
  // set props from redux
  const { auth, stats } = props;
  useEffect(() => {
    if (auth.isLoaded) {
      props.getInvestments(auth);
    }
    // eslint-disable-next-line
  }, [auth, stats]);

  return (
    <React.Fragment>
      <Title>Your Investments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>qPoints</TableCell>
            <TableCell align="right">qScore</TableCell>
            {/* <TableCell align="right">Last Login</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.investments.map((investment, i) => (
            <TableRow key={i}>
              <TableCell>{investment.date}</TableCell>
              <TableCell>{investment.display_name}</TableCell>
              <TableCell>{investment.q_points}</TableCell>
              <TableCell align="right">
                {" "}
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
                    console.log(auth);
                    const data = {
                      username: investment.display_name,
                      uid: auth.uid
                    };
                    props.removeInvestment(data);
                  }}
                >
                  {investment.q_score}
                </Button>
              </TableCell>
              {/* <TableCell align="right">{}</TableCell> */}
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
    stats: state.stats,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getInvestments: auth => dispatch(getInvestments(auth)),
    removeInvestment: data => dispatch(removeInvestment(data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PerformanceTable
);
