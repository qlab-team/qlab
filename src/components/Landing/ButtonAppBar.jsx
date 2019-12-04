import React from "react";
// react-router
import { BrowserRouter as Router, Link } from "react-router-dom";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 30,
    marginBottom: 6,
    fontFamily: "Aquino"
  },
  button: {
    flexGrow: 1,
    textTransform: "none",
    fontWeight: 400
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Box
              width={"50%"}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography className={classes.title}>QLAB</Typography>
            </Box>
            <Box width={"50%"} display="flex" justifyContent="flex-end">
              <a
                href="/about"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button className={classes.button} color="inherit">
                  about
                </Button>
              </a>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </Router>
  );
}
