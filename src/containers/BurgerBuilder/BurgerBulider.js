import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, i) => {
                return sum + i;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updateIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        let updateCounted = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        let updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updateIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You are continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Vasyl Khamuliak',
                address: {
                    street: 'Street test 1',
                    city: 'Lviv',
                    country: 'Ukraine'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closedModal={this.purchaseCancelHandler}>
                    <OrderSummary
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancelled={this.purchaseCancelHandler} 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;