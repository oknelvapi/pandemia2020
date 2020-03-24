import React, { useEffect, useContext } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_ukraineLow from '@amcharts/amcharts4-geodata/ukraineHigh';
import am4geodata_world from '@amcharts/amcharts4-geodata/worldLow';

import { Box } from '@material-ui/core';

import { SettingsContext } from 'Components/Root/settingsReducer';

// import datajson from './ukraine_covid19.json';
import { ukraineRegions } from 'Configs/ukraineRegions';

type WorldMapProps = {};
type WorldMapState = {
  [name: string]: number;
};

const WorldMap: React.FC<WorldMapProps> = (props: WorldMapProps) => {
  const { settingsState } = useContext(SettingsContext);

  // const arr = [
  //   {
  //     id: 'UA-05',
  //     name: 'Вінниця',
  //     fill: am4core.color('rgba(68, 68, 68, 0.3)'),
  //   },
  //   {
  //     id: 'UA-12',
  //     name: 'lol',
  //     fill: am4core.color('rgba(68, 68, 68, 0.3)'),
  //   },
  // ];

  useEffect(() => {
    const map = am4core.create('chartdiv', am4maps.MapChart);
    if (settingsState.indexCountry === 0) {
      map.geodata = am4geodata_ukraineLow;
      map.projection = new am4maps.projections.Miller();
    } else {
      map.geodata = am4geodata_world;
      map.projection = new am4maps.projections.NaturalEarth1();
    }
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = am4core.color('rgba(101, 115, 142, 0.3)');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('rgba(68, 68, 68, 0.5)');
    // Add some data
    polygonSeries.data = ukraineRegions();

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = 'fill';

    return (): void => {
      map.dispose();
    };
  }, [settingsState.indexCountry, settingsState.indexLang]);
  return <Box id="chartdiv" height={1} width={1}></Box>;
};

export default WorldMap;
