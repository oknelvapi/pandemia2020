import React, { useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';

import Routes from 'Router/Routes';
import Root from 'Components/Root';

import { useDispatch } from 'react-redux';
import * as actions from 'Store/Actions';

import { p2020Theme } from 'Configs/ThemeConfig';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchData());
  }, [dispatch]);
  return (
    <ThemeProvider theme={p2020Theme}>
      <Routes>
        <Root />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
