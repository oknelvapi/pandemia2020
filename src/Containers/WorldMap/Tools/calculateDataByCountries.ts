export const getTotal = (country: string, jsonData: Array<Regions>): Region => {
  let recoveredValue = 0,
    deathValue = 0,
    confirmValue = 0;

  jsonData
    .filter(item => {
      if (country === 'GB') {
        return item.geoId === 'UK';
      }
      if (country === 'GR') {
        return item.geoId === 'EL';
      } else {
      }

      return item.geoId === country;
    })
    .forEach(value => {
      if (value.recovered !== null) recoveredValue += parseInt(value.recovered);

      if (value.deaths !== null) deathValue += parseInt(value.deaths);

      if (value.cases !== null) confirmValue += parseInt(value.cases);
    });

  return {
    id: country,
    cases: confirmValue !== 0 ? confirmValue : undefined,
    deaths: deathValue !== 0 ? deathValue : undefined,
    recovered: recoveredValue !== 0 ? recoveredValue : undefined,
  };
};
