import React from "react";
import "../style/App.css";
import QuizMain from './QuizComponents/QuizMain'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <QuizMain />
      </header>

    </div>
  );
}

export default App;
