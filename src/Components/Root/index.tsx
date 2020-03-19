import React from 'react';

import { Box } from '@material-ui/core/';

import { SettingsProvider } from './settingsReducer';
import Header from 'Components/Header';
import BottomNavigation from 'Components/BottomNavigation';

type RootProps = {
  children?: React.ReactElement;
};

const Root: React.FC<RootProps> = ({ children }: RootProps) => {
  return (
    <>
      <SettingsProvider>
        <Box height="1" width="1">
          <Header />
          <Box component="main">{children}</Box>
          <Box>
            <BottomNavigation />
          </Box>
        </Box>
      </SettingsProvider>
    </>
  );
};

export default Root;
