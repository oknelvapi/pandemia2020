import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import Routes from 'Router/Routes';
import Root from 'Components/Root';

import { p2020Theme } from 'Configs/ThemeConfig';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider theme={p2020Theme}>
      <Routes>
        <Root />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
