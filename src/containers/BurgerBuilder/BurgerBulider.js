import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
import { 
    addIngredients, 
    removeIngredients, 
    initIngredients,
    purchaseInit, 
    authRedirectPath 
} from '../../store/actions/index';

const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredeints();
    }, []);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, i) => {
                return sum + i;
            }, 0);
        return  sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRiderectPath('/checkout');
            props.history.push('/authenticate');
        }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...props.ings
    }
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls 
                    ingredientAdded={props.onIngredeintAdded}
                    ingredientRemoved={props.onIngredeintRemove}
                    disabled={disableInfo}
                    price={props.price}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    purchasable={updatePurchaseState(props.ings)}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            purchaseContinue={purchaseContinueHandler}
            purchaseCancelled={purchaseCancelHandler} 
            ingredients={props.ings}
            totalPrice={props.price}/>;
    }
    return (
        <Aux>
            <Modal show={purchasing} closedModal={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredeintAdded: (ingName) => dispatch(addIngredients(ingName)),
        onIngredeintRemove: (ingName) => dispatch(removeIngredients(ingName)),
        onInitIngredeints: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRiderectPath: (path) => dispatch(authRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
