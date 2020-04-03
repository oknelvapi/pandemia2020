import { all, takeLatest } from 'redux-saga/effects';
import { fetchData } from './WorldMap';

export function* sagaWatcher(): Generator {
  // yield takeEvery();
  yield all([
    takeLatest('ACTION_FETCH_DATA_INIT', fetchData),
    // takeLatest('ACTION_LOGIN_INIT', logIn),
    // takeLatest('ACTION_SET_AUTHORIZED_PROFILE_INIT', setAuthorizedProfile),
    // takeLatest('ACTION_SEARCH_IN_UPLOAD', search),
    // takeLatest('ACTION_LOGOUT', logOutSaga),
  ]);
}
