import { put } from '@redux-saga/core/effects';
import axios from '../../axios-orders';

import { setIngredients, fetchIngredientsFailed } from '../actions/index';

export function* initIngredientsSaga() {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredients(response.data));
    } catch(error) {
        yield put(fetchIngredientsFailed())
    };
};
