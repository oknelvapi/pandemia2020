import { ActionType } from 'typesafe-actions';
import * as actions from 'Store/Actions/WorldMap';

export type Actions = ActionType<typeof actions>;

export const worldMapState: WorldMapReducer = {
  loading: false,
  global: {
    world: {
      confirmed: null,
      deaths: null,
      recovered: null,
      lastUpdate: new Date().toISOString(),
    },
    ukraine: {
      confirmed: null,
      deaths: null,
      recovered: null,
      lastUpdate: new Date().toISOString(),
    },
  },
  confirmed: null,
  dataForUkraineFromRNBO: null,
};

const checkUkraineData = (confirmed: Array<WorldMapConfirmed>) => {
  const copyConfirmed = [...confirmed];
  return copyConfirmed.filter(country => country.id === 'UA')[0];
};

export const worldMap = (state = worldMapState, action: Actions) => {
  switch (action.type) {
    case 'ACTION_FETCH_DATA_START':
      return {
        ...state,
        loading: true,
      };
    case 'ACTION_FETCH_DATA_SUCCESS':
      const { global, confirmed, confirmedUSA, dataForUkraineFromRNBO } = action.payload;
      return {
        ...state,
        global: {
          world: {
            confirmed: global.confirmed?.value,
            deaths: global.deaths?.value,
            recovered: global.recovered?.value,
            lastUpdate: global.lastUpdate,
          },
          ukraine: checkUkraineData(confirmed),
        },
        confirmed: [...confirmed.filter(country => country.iso3 !== 'USA'), confirmedUSA],
        dataForUkraineFromRNBO,
        loading: false,
      };
    case 'ACTION_FETCH_DATA_FAIL':
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};
