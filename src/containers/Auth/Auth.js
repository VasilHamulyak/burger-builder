import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { auth, authRedirectPath } from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

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

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.redirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.conrtols, {
            [controlName]: updateObject(this.state.conrtols[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.conrtols[controlName].validation),
                touched: true
            })
        });
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

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.redirectPath}/>
        }

        return (
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger">SWITCH TO {!this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(authRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
