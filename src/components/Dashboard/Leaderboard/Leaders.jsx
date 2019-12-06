import React from "react";
// components
import Title from "../Title";
// material ui
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// redux
import { connect } from "react-redux";
import { compose } from "redux";
// styles
const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});
// generate table data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(0, "16 Nov, 2019", "José", "432", "✅❌❌✅✅", "4 Dec, 2019"),
//   createData(
//     1,
//     "16 Nov, 2019",
//     "Juanito",
//     "43123",
//     "❌❌✅❌✅",
//     "2 Oct, 2019"
//   ),
//   createData(
//     3,
//     "16 Nov, 2019",
//     "Miguelito",
//     "654",
//     "✅✅✅✅✅",
//     "4 Nov, 2019"
//   ),
//   createData(4, "15 Nov, 2019", "Alejandra", "666", "✅❌❌❌❌", "3 Dec, 2019")
// ];

class Leaders extends React.Component {
  render() {
    const { classes, leaderboard } = this.props;
    const allUsers = leaderboard.board;
    const d = new Date(leaderboard.last_updated.seconds * 1000);
    console.log(leaderboard.last_updated);
    console.log(d);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    const last_updated =
      year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
    console.log(allUsers, last_updated);

    return (
      <React.Fragment>
        <Title>Leaders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>qScore</TableCell>
              <TableCell align="right">qPoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (allUsers.sort((a, b) => {
                if (a.q_score < b.q_score) return 1;
                if (a.q_score > b.q_score) return -1;
                return 0;
              }),
              allUsers.map((row, id) => (
                <TableRow key={row.user_id}>
                  <TableCell>{id + 1}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.q_score}</TableCell>
                  <TableCell align="right">{row.q_points}</TableCell>
                </TableRow>
              )))
            }
          </TableBody>
        </Table>
        <div className={classes.seeMore}>LastUpdated {last_updated}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard
  };
};

export default compose(withStyles(styles), connect(mapStateToProps))(Leaders);
