import React, { Component } from 'react';
import PomodoroContainer from "./components/PomodoroContainer";
import Info from "./components/Info";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="center">Pomodoro App</h1>
        </header>
        <main>
          <PomodoroContainer />
        </main>
        <footer className="center">
          <Info />
        </footer>
      </div>
    );
  }
}

export default App;