/////////////// IMPORTS
import React, { PureComponent } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
// components
// material ui
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core/";
import MaterialToolTip from "@material-ui/core/Tooltip";
// recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
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
    fontSize: 14,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "whitesmoke",
      color: "rgb(92, 27, 249)",
      cursor: "pointer"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  tooltip: {
    fontSize: "1.4em"
  },
  link: {
    textDecoration: "none",
    color: "whitesmoke",
    fontWeight: 700,
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

/////////////// UTILITIES
function createData(time, qScore) {
  return { time, eScore: qScore };
}
class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, value } = this.props;

    return (
      <text
        x={x}
        y={y}
        dy={-4}
        dx={5}
        fill={"white"}
        fontSize={9}
        textAnchor="right"
      >
        {value}
      </text>
    );
  }
}

/////////////// COMPONENT
const Chart = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [chartData, updateChartData] = useState([]);
  // set props from redux
  const { user } = props;

  useEffect(() => {
    if (user.isLoggedIn) {
      const data = Object.keys(user.profile.q_score_history).map(hist => {
        const date = user.profile.q_score_history[hist].date.toDate();
        const q_score = user.profile.q_score_history[hist].q_score;
        return createData(date.getTime(), q_score);
      });
      if (data.length >= 4) data.unshift(createData(new Date().getTime()));
      data.reverse();
      updateChartData(data);
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  console.log(chartData);

  function formatXAxis(tickItem) {
    return moment(tickItem).format("MMM Do YYYY");
  }

  return (
    <React.Fragment>
      <MaterialToolTip
        title={
          <span className={classes.tooltip}>
            eScore is a a score representing your effort! The more you study
            each day, the higher it will go!
          </span>
        }
        placement="top"
      >
        <Typography>
          <span className="qPointsMark" style={{ fontSize: "smaller" }}>
            <sup>e</sup>
          </span>
          Score{" "}
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
            <></>
            {user.profile.q_score}
          </Button>
        </Typography>
      </MaterialToolTip>
      {chartData.length >= 4 ? (
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 16,
              right: 24,
              bottom: 16,
              left: 24
            }}
          >
            <CartesianGrid stroke={"mediumpurple"} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              scale="time"
              tickFormatter={formatXAxis}
              stroke={theme.palette.text.secondary}
            />
            <Tooltip
              viewBox={{
                x: 0,
                y: 0,
                width: 400,
                height: 400,
                borderRadius: "5px"
              }}
              labelStyle={{ fontSize: "10px", color: "violet" }}
              labelFormatter={formatXAxis}
            />
            <YAxis width={15} stroke={theme.palette.text.secondary}>
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
              label={<CustomizedLabel />}
              type="monotone"
              dataKey="eScore"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <React.Fragment>
          <p>Welcome to QLAB!</p>
          <p>Your eScore changes will be plotted here after a couple days. </p>
          <p>
            <a className={classes.link} href="/dashboard/quizzes">
              Why not solve some quizzes meanwhile?
            </a>
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user
  };
};

/////////////// EXPORTS
export default connect(mapStateToProps)(Chart);
