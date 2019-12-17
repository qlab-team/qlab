/////////////// IMPORTS
import React, { Suspense } from "react";
// material ui
import { Container, makeStyles } from "@material-ui/core";
// components
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import TitleAndStartButton from "./Landing/TitleAndStartButton";
import QuizMain from "./Quiz/QuizMain";
import QuizFinished from "./Quiz//quizFinished/QuizFinished";
import ButtonAppBar from "../components/Landing/ButtonAppBar";
import About from "../components/Landing/About";
// react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// react-three-fiber
import { Canvas } from "react-three-fiber";
// three
import Jumbo from "../three/Jumbo";

///////////////// STYLES
const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

/////////////// COMPONENT
function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/quiz" component={QuizMain}></Route>
          <Route path="/quizFin" component={QuizFinished}></Route>
          <Route path="/about" component={About}></Route>
          <Route exact path="/">
            <ButtonAppBar />
            {/* REACT THREE FIBER SCENE START */}
            <div className="main" display="flex">
              <Canvas camera={{ position: [0, 0, 51] }}>
                <ambientLight intensity={1} color={0x6a00ff} />
                <directionalLight
                  position={[0, 0, 30]}
                  intensity={0.4}
                  color={0xffffff}
                />
                <pointLight
                  position={[0, 8, 20]}
                  intensity={0.8}
                  color={0x8cd9ff}
                />
                <pointLight
                  position={[10, 0, 5]}
                  intensity={1}
                  color={"fuchsia"}
                />
                <Suspense fallback={null}>
                  <Jumbo />
                </Suspense>
              </Canvas>
            </div>
            {/* REACT THREE FIBER SCENE END */}
            <Container className={classes.container}>
              <TitleAndStartButton />
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

/////////////// EXPORTS
export default App;
