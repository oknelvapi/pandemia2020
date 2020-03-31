/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState, useContext } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_ukraineLow from '@amcharts/amcharts4-geodata/ukraineHigh';
import am4geodata_world from '@amcharts/amcharts4-geodata/worldLow';

import { Box } from '@material-ui/core';

import { Summary } from 'Components/Summary';
import { ToggleButtons } from 'Components/ToggleButtons';
import { SettingsContext } from 'Components/Root/settingsReducer';
import { ukraineRegions } from 'Configs/ukraineRegions';
import { colorSet, handleHover, getTotal } from 'Containers/WorldMap/Tools';
import { wholeWorld } from 'Configs/wholeWorld';

import jsonData from 'Configs/Mock/ukraine_covid19.json';
import jsonDataW from 'Configs/Mock/worldCovid.json';
import totalData from 'Configs/Mock/total.json';

type WorldMapProps = {};
type WorldMapState = {
  [name: string]: number;
};

const WorldMap: React.FC<WorldMapProps> = () => {
  const { settingsState } = useContext(SettingsContext);
  const [alignment, setAlignment] = useState<string>('cases');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string): void => {
    setAlignment(newAlignment);
  };

  const addIndicatorToMapValue = (jsonData: Region[], alignment: string): Region[] =>
    [...jsonData].map(region => ({ ...region, ...{ value: region[alignment] } }));

  // * Set themes
  am4core.useTheme(am4themes_animated);

  useEffect(() => {
    // TODO Create map instance
    const map = am4core.create('chartdiv', am4maps.MapChart);
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.valign = 'top';
    map.projection = new am4maps.projections.Miller();

    // TODO Create map polygon series
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    // * Add some data
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color(colorSet[alignment].min),
      max: am4core.color(colorSet[alignment].max),
    });
    polygonSeries.ignoreMinMax = true;
    polygonSeries.useGeodata = true;
    // * Excludes Antarctica
    polygonSeries.exclude = ['AQ'];

    // TODO Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = `{name} - [bold]{value.value.formatNumber('#')}[/]`;

    // * Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = 'fill';
    // * Create hover state and set alternative fill color
    // ! It was switched of
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#132a3e');

    // TODO Add heat legend
    // * Set up heat legend
    const heatLegend = map.createChild(am4maps.HeatLegend);
    heatLegend.id = 'heatLegend';
    heatLegend.series = polygonSeries;
    heatLegend.align = 'left';
    heatLegend.valign = 'bottom';
    heatLegend.orientation = 'vertical';
    heatLegend.padding(20, 20, 40, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    // * Set up custom heat map legend labels using axis ranges
    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.label.verticalCenter = 'bottom';
    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.label.verticalCenter = 'top';
    // * Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add('text', () => '');
    // * Update heat legend value labels
    polygonSeries.events.on('datavalidated', ev => {
      const heatLegend = ev.target.map.getKey('heatLegend');
      const min = heatLegend.series.dataItem.values.value.low;
      const minRange = heatLegend.valueAxis.axisRanges.getIndex(0);
      minRange.value = min;
      // minRange.label.text = '' + heatLegend.numberFormatter.format(min);
      minRange.label.text = 'min';

      const max = heatLegend.series.dataItem.values.value.high;
      const maxRange = heatLegend.valueAxis.axisRanges.getIndex(1);
      maxRange.value = max;
      // maxRange.label.text = '' + heatLegend.numberFormatter.format(max);
      maxRange.label.text = 'max';
    });

    // TODO add Hover and Tooltip
    polygonSeries.mapPolygons.template.events.on('over', event => {
      handleHover(event.target, heatLegend);
    });

    polygonSeries.mapPolygons.template.events.on('hit', event => {
      handleHover(event.target, heatLegend);
    });

    polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
    polygonSeries.mapPolygons.template.events.on('out', () => {
      heatLegend.valueAxis.hideTooltip();
    });

    // TODO Set map definition
    if (settingsState.indexCountry === 0) {
      map.geodata = am4geodata_ukraineLow;
      polygonSeries.data = ukraineRegions().map(prevRegion => ({
        ...prevRegion,
        ...addIndicatorToMapValue(jsonData, alignment).find((region: Region) => prevRegion.id === region.id),
      }));
    } else {
      map.geodata = am4geodata_world;

      const worldData = wholeWorld.map(county => getTotal(county, jsonDataW.records));

      polygonSeries.data = [...addIndicatorToMapValue(worldData, alignment)];
    }

    return (): void => {
      map.dispose();
    };
  }, [settingsState.indexCountry, settingsState.indexLang, alignment]);

  return (
    <Box position="relative" height={1} width={1}>
      <Box zIndex="modal" position="absolute" left={16}>
        <ToggleButtons
          handleAlignment={handleAlignment}
          alignment={alignment}
          recoveredDisabled={settingsState.indexCountry === 1}
        />
        <Summary count={totalData[settingsState.indexCountry]} />
      </Box>
      <Box id="chartdiv" height={1} width={1}></Box>
    </Box>
  );
};

export default WorldMap;
