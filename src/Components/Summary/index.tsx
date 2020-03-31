import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, IconButton, Collapse, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { AccessibilityNew, LocalHotel } from '@material-ui/icons';
import CrossIcon from 'Components/Icons/CrossIcon';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    opacity: 0.2,
    '&:hover': {
      opacity: 1,
    },
  },
  title: {
    fontFamily: 'funkrocker-regular',
    letterSpacing: theme.spacing(1.25),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2),
    },
  },
  indicator: {
    fontFamily: 'funkrocker-regular',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ICONS = [LocalHotel, CrossIcon, AccessibilityNew];

type SummaryProps = {
  count: Region;
};

export const Summary: React.FC<SummaryProps> = ({ count }: SummaryProps) => {
  const { cases, deaths, recovered } = count;
  const { t } = useTranslation();
  const [hide, setHide] = useState<boolean>(true);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" color="primary" className={classes.title}>
          {t('map.toggleButtons.total')}
        </Typography>
        <IconButton aria-label="hide" size="medium" onClick={(): void => setHide(!hide)}>
          {hide ? <ExpandLess fontSize="inherit" /> : <ExpandMore fontSize="inherit" />}
        </IconButton>
      </Box>
      <Collapse in={!hide}>
        <List dense>
          {[cases, deaths, recovered].map((item, idx) => (
            <ListItem key={item}>
              <ListItemIcon>{React.createElement(ICONS[idx])}</ListItemIcon>
              <ListItemText>
                <Typography color="primary" className={classes.indicator}>
                  {item}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};
