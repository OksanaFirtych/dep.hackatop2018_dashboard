import React, { Component } from 'react';
import './App.css';

import Dashboard from './pages/Dashboard.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Container">
            <Dashboard/>
        </div>
      </div>
    );
  }
};

export default App;
