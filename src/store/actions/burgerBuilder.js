import { 
    ADD_INGREDIENTS, 
    REMOVE_INGREDIENTS,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from './actionTypes';
import axios from '../../axios-orders';

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

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        });
    }
}
