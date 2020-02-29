import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

import MainRoutes from './Routes';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  ptBR
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
