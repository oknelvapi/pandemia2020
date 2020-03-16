import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core/';

import { p2020Theme } from 'Configs/ThemeConfig';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider theme={p2020Theme}>
      <Box height="1" width="1">
        <Box component="header">
          {' '}
          <Typography color="textPrimary">Header</Typography>
        </Box>
        <Box component="main">
          {' '}
          <Typography color="textPrimary">Main</Typography>
        </Box>
      </Box>
      <div>
        {' '}
        <Typography color="textPrimary">BottomNavigation</Typography>
      </div>
    </ThemeProvider>
  );
};

export default App;
