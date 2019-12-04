import React from "react";
// material ui
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ButtonAppBar from "./ButtonAppBar";

export default function Landing() {
  return (
    <React.Fragment>
      <ButtonAppBar />
      <Container maxWidth="false">
        <Typography variant="h6">QLAB</Typography>
        <a href="/login" style={{ textDecoration: "none" }}>
          <Fab variant="extended">START</Fab>{" "}
        </a>
      </Container>
    </React.Fragment>
  );
}
