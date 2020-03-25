import React, { useState, useEffect, useContext } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_ukraineLow from '@amcharts/amcharts4-geodata/ukraineHigh';
import am4geodata_world from '@amcharts/amcharts4-geodata/worldLow';

import ReactMapGL, { FlyToInterpolator, ViewportProps, Source, Layer } from 'react-map-gl';

import { Box } from '@material-ui/core';

import { SettingsContext } from 'Components/Root/settingsReducer';
// import { coordinates } from 'Configs/coordinates';
// import { mapboxTokens } from 'Configs/mapboxTokens';

// import data from './custom.geo.json';
// import { dataLayer } from './mapStyle';

// am4core.useTheme(am4themes_animated);

// import { worldMapStyles } from './styles';

type WorldMapProps = {};
type WorldMapState = {
  [name: string]: number;
};

const WorldMap: React.FC<WorldMapProps> = (props: WorldMapProps) => {
  // const classes = worldMapStyles();
  const { settingsState } = useContext(SettingsContext);
  // const [viewport, setViewport] = useState({
  //   zoom: 5,
  //   bearing: 0,
  //   pitch: 0,
  //   latitude: 48.510581,
  //   longitude: 32.265628,
  // });

  useEffect(() => {
    const map = am4core.create('chartdiv', am4maps.MapChart);
    if (settingsState.indexCountry === 0) {
      map.geodata = am4geodata_ukraineLow;
      map.projection = new am4maps.projections.Miller();
    } else {
      map.geodata = am4geodata_world;
      map.projection = new am4maps.projections.EqualEarth();
    }
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = am4core.color('rgba(101, 115, 142, 0.3)');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('rgba(68, 68, 68, 0.3)');

    return () => map.dispose();
  }, [settingsState.indexCountry]);

  // chart.geodata = ukraineHigh;

  // const _onViewportChange = (viewport: ViewportProps): void => {
  //   setViewport(prevState => {
  //     return {
  //       ...prevState,
  //       ...viewport,
  //     };
  //   });
  // };

  // const _goToViewport = (viewport: WorldMapState): void => {
  //   setViewport(prevState => {
  //     return {
  //       ...prevState,
  //       ...viewport,
  //       transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
  //       transitionDuration: 'auto',
  //     };
  //   });
  // };

  // useEffect(() => {
  //   _goToViewport(coordinates[settingsState.indexCountry].viewport);
  // }, [settingsState.indexCountry]);

  return (
    <Box id="chartdiv" height={1} width={1}>
      {/* <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        dragRotate={false}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={mapboxTokens.main}
        onViewportChange={_onViewportChange}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
      </ReactMapGL> */}
    </Box>
  );
};

export default WorldMap;
