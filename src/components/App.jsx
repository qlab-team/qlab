import React from "react";
import "../style/App.css";
// components
import Dashboard from "./Dashboard/Dashboard";
import Landing from "./Landing/Landing";
import QuizMain from "./Quiz/QuizMain";
import Sidebar from "./Dashboard/Sidebar";

// react-router
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/quiz" component={QuizMain}></Route>
          <Route path="/sidebar" component={Sidebar}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
