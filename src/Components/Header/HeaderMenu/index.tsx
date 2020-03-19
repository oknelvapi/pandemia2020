import React, { useContext } from 'react';

import { Box, IconButton } from '@material-ui/core';
import { GitHub, Language as Country, Translate } from '@material-ui/icons';

import { SettingsContext } from 'Components/Root/settingsReducer';
import HeaderPopover from '../HeaderPopover';
import HeaderButton from '../HeaderButton';

const countries = ['Ukraine', 'Poland', 'Belarus', 'Moldova', 'All world'];
const languages = ['EN', 'UA'];

type HeaderMenuProps = {};

const HeaderMenu: React.FC<HeaderMenuProps> = () => {
  const { settingsState, settingsDispatch } = useContext(SettingsContext);

  const handleClickCountry = (event: React.MouseEvent<HTMLElement>): void => {
    settingsDispatch({
      type: 'ACTION_SET_ANCHOR_OF_COUNTRY',
      payload: { anchorCountry: event.currentTarget },
    });
  };
  const handleClickLang = (event: React.MouseEvent<HTMLElement>): void => {
    settingsDispatch({
      type: 'ACTION_SET_ANCHOR_OF_LANG',
      payload: { anchorLang: event.currentTarget },
    });
  };

  const toggleCountry = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    settingsDispatch({
      type: 'ACTION_SWITCH_COUNTRY',
      payload: { indexCountry: index },
    });
  };
  const toggleLang = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    settingsDispatch({
      type: 'ACTION_SWITCH_LANGUAGE',
      payload: { indexLang: index },
    });
  };

  return (
    <>
      <Box display="flex">
        <HeaderButton
          handleClick={handleClickCountry}
          aria="country"
          title={countries[settingsState.indexCountry]}
          expandMoreIcon
        >
          <Country />
        </HeaderButton>
        <HeaderButton handleClick={handleClickLang} aria="lang" title={languages[settingsState.indexLang]}>
          <Translate />
        </HeaderButton>
        <IconButton
          component="a"
          href="https://github.com/oknelvapi"
          color="inherit"
          aria-disabled="false"
          aria-label="GitHub repository"
          data-ga-event-action="github"
        >
          <GitHub />
        </IconButton>
      </Box>
      <HeaderPopover
        handleClose={() => settingsDispatch({ type: 'ACTION_SWITCH_OFF_ANCHOR_OF_COUNTRY' })}
        handleMenuItemClick={toggleCountry}
        selectedIndex={settingsState.indexCountry}
        anchorEl={settingsState.anchorCountry}
        items={countries}
      />
      <HeaderPopover
        handleClose={() => settingsDispatch({ type: 'ACTION_SWITCH_OFF_ANCHOR_OF_LANG' })}
        handleMenuItemClick={toggleLang}
        selectedIndex={settingsState.indexLang}
        anchorEl={settingsState.anchorLang}
        items={languages}
      />
    </>
  );
};

export default HeaderMenu;
