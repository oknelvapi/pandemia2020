import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { NavLink } from 'react-router-dom';
import { routes } from 'Router/path';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation as BottomNav, BottomNavigationAction } from '@material-ui/core';
import { Restore, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

type BottomNavigationProps = {};

const BottomNavigation: React.FC<BottomNavigationProps> = (props: BottomNavigationProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const { pathname } = window.location;
    const index = _.values(routes).indexOf(pathname); // ! there is a solution for IE11
    setValue(index);
  }, []);

  return (
    <BottomNav className={classes.root} value={value} onChange={(event, newValue) => setValue(newValue)} showLabels>
      <BottomNavigationAction component={NavLink} to={routes.home} label="World map" icon={<LocationOn />} />
      <BottomNavigationAction component={NavLink} to={routes.timeline} label="Timeline" icon={<Restore />} />
      {/* <BottomNavigationAction label="Graphics" icon={<Timeline />} /> */}
    </BottomNav>
  );
};
export default BottomNavigation;
