import { 
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL, 
    PURCHASE_BURGER_START, 
    PURCHASE_INIT, 
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START
} from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: false
            }
        case PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            } 
        case PURCHASE_BURGER_FAIL: 
            return {
                ...state,
                loading: false
            }
        case FETCH_ORDERS_START: 
            return {
                ...state,
                loading: true
            }
        case FETCH_ORDERS_SUCCESS:
            console.log(action.orders);
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;