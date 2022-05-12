import React, { Component } from "react";
import './App.css';
import Interpreter from "./components/Interpreter"
// import MadLibLoad from './paragraphLoad';
// import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <Interpreter />
        </header>
      </div>
    );
  }
}

export default App;
