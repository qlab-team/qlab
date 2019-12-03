import React from "react";
import "./style/App.css";
import Dashboard from "./components/dashboard/Dashboard";
import QuizMain from "./components/quiz/QuizMain";

function App() {
  return (
    <div className="App">
      <Dashboard />
      <QuizMain />
    </div>
  );
}

export default App;
