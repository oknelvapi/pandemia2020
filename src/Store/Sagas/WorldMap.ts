import { put } from 'redux-saga/effects';
import { getGlobal, getGlobalConfirmed, getSummaryUSA, getDataFromRNBO } from 'API';
import * as actions from 'Store/Actions';

import axios from 'axios';

const normalizeCountryTitle = (provinceState: string, iso2: string, countryRegion: string): string => {
  if (provinceState === 'Greenland') {
    return 'GL';
  }
  if (countryRegion === 'Congo (Kinshasa)') {
    return 'CD';
  }
  if (provinceState === 'French Guiana') {
    return 'GF';
  }
  if (countryRegion === 'Cabo Verde') {
    return 'CV';
  } else {
    return iso2;
  }
};
const dataStructuring = (confirmed: Array<WorldMapConfirmed>) => {
  const newConfirmed = confirmed.map(
    ({ countryRegion, lastUpdate, confirmed, recovered, deaths, iso2, iso3, provinceState }: any) => {
      return {
        provinceState,
        countryRegion,
        lastUpdate,
        confirmed,
        recovered,
        deaths,
        iso3,
        id: normalizeCountryTitle(provinceState, iso2, countryRegion),
      };
    },
  );
  return newConfirmed;
};

export function* fetchData(): any {
  yield put(actions.cleanError());

  yield put(actions.fetchDataStart());
  try {
    const response = yield axios.all([getGlobal(), getGlobalConfirmed(), getSummaryUSA(), getDataFromRNBO()]).then(
      axios.spread((global, confirmed, confirmedUSA, dataForUkraineFromRNBO) => ({
        global: global.data,
        confirmed: confirmed.data,
        confirmedUSA: confirmedUSA.data,
        dataForUkraineFromRNBO: dataForUkraineFromRNBO.data,
      })),
    );

    const { global, confirmed, confirmedUSA, dataForUkraineFromRNBO } = response;
    yield put(
      actions.fetchDataSuccess({
        global,
        confirmed: dataStructuring(confirmed),
        confirmedUSA: {
          countryRegion: 'USA',
          lastUpdate: confirmedUSA.lastUpdate,
          confirmed: confirmedUSA.confirmed.value,
          recovered: confirmedUSA.recovered.value,
          deaths: confirmedUSA.deaths.value,
          iso3: 'USA',
          id: 'US',
        },
        dataForUkraineFromRNBO: dataForUkraineFromRNBO.ukraine,
      }),
    );
  } catch (err) {
    const {
      response: { data, status },
    } = err;
    yield put(actions.fetchDataFail());
    yield put(actions.setError(data.errors_list, status));
  }
}
