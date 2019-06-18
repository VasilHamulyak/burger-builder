import { delay } from 'redux-saga/effects';
import { put } from '@redux-saga/core/effects';

import { 
    authLogoutSucceed,
    authLogout
} from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(authLogoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiredTime * 1000);
    yield put(authLogout());
};
