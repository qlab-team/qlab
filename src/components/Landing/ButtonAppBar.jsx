import React from "react";
// react-router
import { BrowserRouter as Router } from "react-router-dom";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 30,
    marginBottom: 6,
    fontFamily: "Aquino"
  },
  appBar: {
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)"
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
        <AppBar className={classes.appBar} position="fixed">
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
