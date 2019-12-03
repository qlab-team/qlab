import React from "react";
// material ui
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

export default function Landing() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">QLAB</Typography>
      <a href="/dashboard" style={{ textDecoration: "none" }}>
        <Fab variant="extended">Dashboard</Fab>{" "}
      </a>
    </Container>
  );
}
