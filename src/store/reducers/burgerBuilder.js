import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const addIngredient = (state, action) => {
    const addIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngrerients = updateObject(state.ingredients, addIngredient);
    const updatedState = {
        ingredients: updateIngrerients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngrerients = updateObject(state.ingredients, removeIngredient);
    const updatedState = {
        ingredients: updateIngrerients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4
    });
};

const fetchIngredientsFail = state => {
    return updateObject(state, { error: true});
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state);
        default: return state;
    }
};

export default reducer;
