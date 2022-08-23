import React from 'react';
import RouteSwitch from './RouteSwitch';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.js';
import { CssBaseline } from '@mui/material';

// import './styles/App.scss';

function App() {

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <RouteSwitch />
    </ThemeProvider>
  );
}

export default App;
