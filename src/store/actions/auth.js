import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
} from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

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
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    };
};
