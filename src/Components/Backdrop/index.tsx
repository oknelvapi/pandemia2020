import React from 'react';

import { Backdrop as BackdropWrapper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

type BackdropProps = {
  open?: boolean;
  children: React.ReactNode;
  overflowAll: boolean;
};

export const Backdrop: React.FC<BackdropProps> = ({ open = true, children, overflowAll }: BackdropProps) => {
  const theme = useTheme();

  return (
    <BackdropWrapper style={{ zIndex: overflowAll ? theme.zIndex.drawer + 1 : theme.zIndex.drawer - 1 }} open={open}>
      {children}
    </BackdropWrapper>
  );
};
