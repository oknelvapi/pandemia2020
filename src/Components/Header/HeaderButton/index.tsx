import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  buttonMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttonDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

type HeaderButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  title: string;
  aria: string;
  children: React.ReactNode;
  expandMoreIcon?: boolean;
};

const HeaderButton: React.FC<HeaderButtonProps> = (props: HeaderButtonProps) => {
  const { handleClick, title, aria, expandMoreIcon, children } = props;
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.buttonDesktop}
        color="inherit"
        startIcon={children}
        endIcon={expandMoreIcon && <ExpandMoreIcon />}
        aria-label={`${aria}-more`}
        aria-controls={`${aria}-menu`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {title}
      </Button>
      <IconButton
        className={classes.buttonMobile}
        color="inherit"
        aria-label={`${aria}-more`}
        aria-controls={`${aria}-menu`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {children}
      </IconButton>
    </>
  );
};

export default HeaderButton;
