import { createAction } from 'typesafe-actions';

export const fetchData = createAction('ACTION_FETCH_DATA_INIT')<void>();

export const fetchDataStart = createAction('ACTION_FETCH_DATA_START')<void>();

export const fetchDataSuccess = createAction('ACTION_FETCH_DATA_SUCCESS', (data: WorldMapResponse) => data)<
  WorldMapResponse
>();

export const fetchDataFail = createAction('ACTION_FETCH_DATA_FAIL')<void>();
