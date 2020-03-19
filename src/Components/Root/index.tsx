import React from 'react';

import { Typography, Box } from '@material-ui/core/';

import { SettingsProvider } from './settingsReducer';
import Header from 'Components/Header';

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
          <div>
            <Typography color="textPrimary">BottomNavigation</Typography>
          </div>
        </Box>
      </SettingsProvider>
    </>
  );
};

export default Root;
