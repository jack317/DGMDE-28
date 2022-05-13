import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Add from "./pages/navbar/Add"
import Home from "./pages/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Main app page with routes to Home and Add page
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <header className="App-header">
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/add' element={<Add/>}></Route>
          </Routes>
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
