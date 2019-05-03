import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { auth } from '../../store/actions/index';

class Auth extends Component {
    state = {
        conrtols: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.conrtols,
            [controlName]: {
                ...this.state.conrtols[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.conrtols[controlName].validation),
                touched: true
            }
        }
        this.setState({conrtols: updatedControls});
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.conrtols.email.value, this.state.conrtols.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.conrtols) {
            formElementsArray.push({
                id: key,
                config: this.state.conrtols[key]
            });
        }

        let form = formElementsArray.map(control => (
            <Input 
                key={control.id}
                elementType={control.config.elementType}
                elementConfig={control.config.elementConfig}
                value={control.config.value}
                invalid={!control.config.valid}
                shouldValidate={control.config.validation}
                touched={control.config.touched}
                chenged={(event) => this.inputChangedHandler(event, control.id)}/>
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p style={{color: 'red'}}>{this.props.error}</p>
        }

        return (
                <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler}>
                        {errorMessage}
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
