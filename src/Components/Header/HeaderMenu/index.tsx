import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import { GitHub, Language as Country, Translate } from '@material-ui/icons';

import { SettingsContext } from 'Components/Root/settingsReducer';
import HeaderPopover from '../HeaderPopover';
import HeaderButton from '../HeaderButton';
import { LANGUAGES } from 'i18n/languages';

type HeaderMenuProps = {};

const HeaderMenu: React.FC<HeaderMenuProps> = () => {
  const { t, i18n } = useTranslation();
  const countries: string[] = t('countries', { returnObjects: true });
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
  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };

  const toggleLang = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    settingsDispatch({
      type: 'ACTION_SWITCH_LANGUAGE',
      payload: { indexLang: index },
    });
    changeLanguage(LANGUAGES[index].toLowerCase());
  };

  return (
    <>
      <Box display="flex">
        <HeaderButton
          handleClick={handleClickCountry}
          aria="country"
          title={countries[settingsState.indexCountry]}
          tooltipTitle={t('header.tooltips.countries')}
          expandMoreIcon
        >
          <Country />
        </HeaderButton>
        <HeaderButton
          handleClick={handleClickLang}
          aria="lang"
          title={LANGUAGES[settingsState.indexLang]}
          tooltipTitle={t('header.tooltips.languages')}
        >
          <Translate />
        </HeaderButton>
        <Tooltip title={t('header.tooltips.github')}>
          <IconButton
            component="a"
            href="https://github.com/oknelvapi/pandemia2020"
            color="inherit"
            aria-disabled="false"
            aria-label="GitHub repository"
            data-ga-event-action="github"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
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
        items={LANGUAGES}
      />
    </>
  );
};

export default HeaderMenu;
