import React from "react";
import "../style/App.css";
// components
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Landing from "./Landing/Landing";
import QuizMain from "./Quiz/QuizMain";
// react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          background: "linear-gradient(180deg, #50F2FF 0%, #FF64F9 100%)"
        }}
      >
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/quiz" component={QuizMain}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
