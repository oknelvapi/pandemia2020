import React from 'react';

import { useTranslation } from 'react-i18next';

import { Grid, Tooltip, Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { AccessibilityNew, LocalHotel } from '@material-ui/icons';
import CrossIcon from 'Components/Icons/CrossIcon';

type ToggleButtonsProps = {
  handleAlignment: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
  alignment: string;
  confirmedDisabled?: boolean;
  deathDisabled?: boolean;
  recoveredDisabled?: boolean;
};

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  handleAlignment,
  alignment,
  ...props
}: ToggleButtonsProps) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <Box my={2}>
          <ToggleButtonGroup exclusive onChange={handleAlignment} aria-label="text alignment">
            <Tooltip placement="bottom" title={t('map.toggleButtons.confirmedCases')}>
              <ToggleButton
                selected={alignment === 'confirmed'}
                value="confirmed"
                aria-label="left aligned"
                disabled={props.confirmedDisabled}
              >
                <LocalHotel />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement="bottom" title={t('map.toggleButtons.deaths')}>
              <ToggleButton
                selected={alignment === 'deaths'}
                value="deaths"
                aria-label="centered"
                disabled={props.deathDisabled}
              >
                <CrossIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement="bottom" title={t('map.toggleButtons.recovered')}>
              <ToggleButton
                selected={alignment === 'recovered'}
                value="recovered"
                aria-label="right aligned"
                disabled={props.recoveredDisabled}
              >
                <AccessibilityNew />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
};
