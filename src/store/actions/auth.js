import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_INITIATE_LOGOUT,
    AUTH_LOGOUT,
    AUTH_REDIRECT_PATH,
    AUTH_CHECK_TIMEOUT,
    AUTH_USER,
    AUTH_CHECK_STATE
} from './actionTypes';

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
        type: AUTH_INITIATE_LOGOUT
    };
};

export const authLogoutSucceed = () => {
    return {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expiredTime => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expiredTime: expiredTime
    };
};

export const auth = (email, password, isSignup) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    };
};

export const authRedirectPath = path => {
    return {
        type: AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: AUTH_CHECK_STATE
    };
};
