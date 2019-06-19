import { delay } from 'redux-saga/effects';
import { put, call } from '@redux-saga/core/effects';
import axios from 'axios';

import { 
    authLogoutSucceed,
    authLogout,
    authStart,
    authSuccess,
    checkAuthTimeout,
    authFail
} from '../actions/index';

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(authLogoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiredTime * 1000);
    yield put(authLogout());
};

export function* authUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
        let signAction = 'signupNewUser';
        if (action.isSignup) {
            signAction = 'verifyPassword';
        }
        const response = yield axios.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${ signAction }?key=AIzaSyBbNuLZm26n11vomh192Bke20L2g__FlvM`,
            authData
        );
        try {
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield call([localStorage, 'setItem'], 'token', response.data.idToken);
            yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
            yield call([localStorage, 'setItem'], 'userId', response.data.localId);
            yield put(authSuccess(response.data.idToken, response.data.localId));
            yield put(checkAuthTimeout(response.data.expiresIn))
        } catch (error) {
            yield put(authFail(error.response.data.error.message));
        }
};

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = yield call([localStorage, 'getItem'], 'userId');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(authLogout());
        }
    }
};
