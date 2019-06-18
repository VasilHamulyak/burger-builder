import { delay } from 'redux-saga/effects';
import { put } from '@redux-saga/core/effects';
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
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
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
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('userId', response.data.localId);
            yield put(authSuccess(response.data.idToken, response.data.localId));
            yield put(checkAuthTimeout(response.data.expiresIn))
        } catch (error) {
            yield put(authFail(error.response.data.error.message));
        }
};