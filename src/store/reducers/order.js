import { 
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL, 
    PURCHASE_BURGER_START, 
    PURCHASE_INIT, 
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = state => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerStart = state => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
        return updateObject(state, {
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder)
        }); 
};

const purchaseOrderFail = state => {
    return updateObject(state, {loading: false});
};

const fetchOrdersStart = state => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = state => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_INIT: return purchaseInit(state);
        case PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case PURCHASE_BURGER_FAIL: return purchaseOrderFail(state);
        case FETCH_ORDERS_START: return fetchOrdersStart(state);
        case FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
        default: return state;
    }
};

export default reducer;
