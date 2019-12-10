/////////////// IMPORTS
import React from "react";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
// components
import Title from "../Title";
// material ui
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";
// redux
import { connect } from "react-redux";

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

/////////////// UTILITIES
function createData(time, amount) {
  return { time, amount };
}

const Chart = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [chartData, updateChartData] = useState([]);
  // set props from redux
  const { user } = props;

  useEffect(() => {
    if (user.isLoggedIn) {
      console.log(user);
      const data = Object.keys(user.profile.q_score_history).map(hist => {
        const date = new Date(user.profile.q_score_history[hist].date * 1000);
        const fixDate = date.getMonth() + 1 + "/" + date.getDate();
        const q_score = user.profile.q_score_history[hist].q_score;
        return createData(fixDate, q_score);
      });
      updateChartData(data.reverse());
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  return (
    <React.Fragment>
      <Title>
        qScore{" "}
        <Button
          className={classes.button}
          style={{ textDecoration: "none" }}
          onMouseEnter={e => {
            e.target.innerHTML = user.profile.q_score;
          }}
          onMouseLeave={e => {
            e.target.innerHTML = user.profile.q_score;
          }}
        >
          {user.profile.q_score}
        </Button>
      </Title>

      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary
              }}
            ></Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user
  };
};

export default connect(mapStateToProps)(Chart);
