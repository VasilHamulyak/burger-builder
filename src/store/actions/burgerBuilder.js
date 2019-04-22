import { ADD_INGREDIENTS, REMOVE_INGREDIENTS } from './actionTypes';

export const addIngredients = ingName => {
    return {
        type: ADD_INGREDIENTS,
        ingredientName: ingName
    };
};

export const removeIngredients = ingName => {
    return {
        type: REMOVE_INGREDIENTS,
        ingredientName: ingName
    };
};