/////////////// IMPORTS
import React from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// components
import Title from "../Title";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
const InvestorsTable = props => {
  const classes = useStyles();
  // set props from redux
  const { user } = props;

  return (
    <React.Fragment>
      <Title>Your Investors</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.investors
            ? (user.investors.sort((a, b) => {
                if (a.timestamp_start < b.timestamp_start) return 1;
                if (a.timestamp_start > b.timestamp_start) return -1;
                return 0;
              }),
              user.investors.map((investors, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {investors.timestamp_start
                      .toDate()
                      .toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    {
                      <Grid container wrap="nowrap" className={classes.row}>
                        <Typography className={classes.typography}>
                          {investors.username}
                        </Typography>
                        <Avatar
                          alt="useravatar"
                          src={investors.photoURL}
                          className={classes.avatar}
                        />
                      </Grid>
                    }
                  </TableCell>
                </TableRow>
              )))
            : ""}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps))(InvestorsTable);
