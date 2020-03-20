import React from 'react';

import { useTranslation } from 'react-i18next';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, CssBaseline } from '@material-ui/core';

import HeaderMenu from './HeaderMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      fontFamily: 'funkrocker-regular',
      fontSize: theme.spacing(4),
      letterSpacing: theme.spacing(1.25),
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(2),
      },
    },
  }),
);

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar color="secondary">
        <Toolbar>
          <Typography variant="h1" color="primary" className={classes.title}>
            {t('header.title')}
          </Typography>
          <div className={classes.grow} />
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};
export default Header;
