import React from "react";
// prop-types
import PropTypes from "prop-types";
// material ui
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
