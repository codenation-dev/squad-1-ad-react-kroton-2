import React from 'react';
<<<<<<< HEAD
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <ForgotPassword />
    </div>
=======

import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './Routes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
>>>>>>> master
  );
}

export default App;
