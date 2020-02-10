import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './Routes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
