import * as am4maps from '@amcharts/amcharts4/maps';

export const handleHover = (mapPolygon: am4maps.MapPolygon, heatLegend: am4maps.HeatLegend): void => {
  if (!isNaN(mapPolygon.dataItem.value)) {
    heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
  } else {
    heatLegend.valueAxis.hideTooltip();
  }
};
