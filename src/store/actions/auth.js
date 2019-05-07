import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_REDIRECT_PATH
} from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return  {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTime = expiredTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiredTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let signAction = 'signupNewUser';
        if (isSignup) {
            signAction = 'verifyPassword';
        }
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${ signAction }?key=AIzaSyBbNuLZm26n11vomh192Bke20L2g__FlvM`, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTime(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const authRedirectPath = path => {
    return {
        type: AUTH_REDIRECT_PATH,
        path: path
    };
};
