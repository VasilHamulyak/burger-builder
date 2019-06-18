import { takeEvery } from 'redux-saga/effects';

import { 
    AUTH_INITIATE_LOGOUT,
    AUTH_CHECK_TIMEOUT
} from '../actions/actionTypes';
import { 
    logoutSaga,
    checkAuthTimeoutSaga
} from './auth';

export function* watchAuth() {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
};
