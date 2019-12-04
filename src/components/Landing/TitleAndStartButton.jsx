import React from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    fontSize: 100,
    color: "white",
    textShadow: "10px 10px 0px #C275FF",
    marginBottom: 6,
    fontFamily: "Aquino"
  },
  tagline: {
    fontSize: 30,
    color: "white",
    textShadow: "2px 2px 0px #C275FF",
    marginBottom: 6
  },
  button: {
    flexGrow: 1,
    background: "#C070FF",
    borderRadius: 50,
    color: "#FFF",
    fontSize: 20,
    textTransform: "none",
    padding: "10px 50px 10px 50px"
  }
}));

export default function TileAndStartButton() {
  const classes = useStyles();

  return (
    <Box
      height={300}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">
        QLAB
      </Typography>
      <Typography className={classes.tagline} variant="h2">
        Where effort's the currency.
      </Typography>
      <a href="/login" style={{ textDecoration: "none", color: "white" }}>
        <Button className={classes.button}>start</Button>
      </a>
    </Box>
  );
}
