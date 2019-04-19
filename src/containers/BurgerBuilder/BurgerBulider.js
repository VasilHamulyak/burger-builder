import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS } from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, i) => {
                return sum + i;
            }, 0);
        return  sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredeintAdded}
                        ingredientRemoved={this.props.onIngredeintRemove}
                        disabled={disableInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler} 
                ingredients={this.props.ings}
                totalPrice={this.props.price}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closedModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredeintAdded: (ingName) => dispatch({type: ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredeintRemove: (ingName) => dispatch({type: REMOVE_INGREDIENTS, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
