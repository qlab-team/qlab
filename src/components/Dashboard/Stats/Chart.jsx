/////////////// IMPORTS
import React from "react";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
// components
import Title from "../Title";
// material ui
import { useTheme } from "@material-ui/core/styles";
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
// Actions
import { getProfile } from "../../../store/actions/profileActions";

/////////////// UTILITIES
function createData(time, amount) {
  return { time, amount };
}

const Chart = props => {
  const theme = useTheme();
  const [chartData, updateChartData] = useState([]);
  // set props from redux
  const { user } = props;

  useEffect(() => {
    if (user.isLoggedIn) {
      const data = Object.keys(user.userProfile.q_score_history).map(hist => {
        const date = new Date(
          user.userProfile.q_score_history[hist].date * 1000
        );
        const fixDate = date.getMonth() + 1 + "/" + date.getDate();
        const q_score = user.userProfile.q_score_history[hist].q_score;
        return createData(fixDate, q_score);
      });
      updateChartData(data.reverse());
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  return (
    <React.Fragment>
      <Title>qScore</Title>
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
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
