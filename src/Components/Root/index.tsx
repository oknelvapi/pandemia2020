import React from 'react';

import { Typography, Box } from '@material-ui/core/';

type RootProps = {
  children?: React.ReactElement;
};

const Root: React.FC<RootProps> = ({ children }: RootProps) => {
  return (
    <Box height="1" width="1">
      <Box component="header">
        <Typography color="textPrimary">Header</Typography>
      </Box>
      <Box component="main">{children}</Box>
      <div>
        <Typography color="textPrimary">BottomNavigation</Typography>
      </div>
    </Box>
  );
};

export default Root;
