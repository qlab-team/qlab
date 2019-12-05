import React from "react";
// components
import ButtonAppBar from "./ButtonAppBar";
import TitleAndStartButton from "./TitleAndStartButton";
import Box from "@material-ui/core/Box";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 100,
    color: "white",
    textShadow: "15px 15px 0px #C275FF",
    marginBottom: 6,
    fontFamily: "Aquino"
  },
  button: {
    flexGrow: 1
  }
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ButtonAppBar />
      <Container display="flex">
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          className={classes.root}
        >
          <TitleAndStartButton />
        </Box>
      </Container>
    </React.Fragment>
  );
}
