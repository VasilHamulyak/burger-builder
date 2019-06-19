import { 
    PURCHASE_BURGER_SUCCESS, 
    PURCHASE_BURGER_FAIL, 
    PURCHASE_BURGER_START, 
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    PURCHASE_BURGER,
    FETCH_ORDERS
} from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = error => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: PURCHASE_BURGER,
        orderData: orderData,
        token: token
    };
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = error => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: FETCH_ORDERS,
        token: token,
        userId: userId
    };
};
