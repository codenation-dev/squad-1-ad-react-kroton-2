import React from 'react';
import Card from '@material-ui/core/Card';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="btn btn-primary"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImportContactsIcon />
            Learn React
          </a>
        </Card>
      </header>
    </div>
  );
}

export default App;
