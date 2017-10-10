import React, { Component } from 'react';
import { isValidEmail, isValidPassword } from '../../../common/util';

import UserInfoService from '../../../services/user-info-service';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            validEmail: false,
            validPassword: false,
            passwordsMatch: false
        }
    }

    render() {
        const canSubmit = this.state.validEmail && this.state.validPassword && this.state.passwordsMatch;
        return (
            <div className='create-account'>
                <form
                    onSubmit={ (e) => this.onSubmit(e) }
                >
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        value={ this.state.email }
                        onChange={ (e) => this.onInputChange(e) }
                    /><br/>
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={ this.state.password }
                        onChange={ (e) => this.onInputChange(e) }
                    /><br/>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='retype password'
                        value={ this.state.confirmPassword }
                        onChange={ (e) => this.onInputChange(e) }
                    /><br/>
                    <button
                        type='submit'
                        style={{backgroundColor: canSubmit ? 'white' : 'black'}}
                    >
                        Create Account
                    </button>
                </form>
                <button onClick={ () => this.props.transitionTo('login') }>
                    Return to Login
                </button>
            </div>
        );
    }

    onInputChange(e) {
        const { target } = e;
        const newState = { [target.name]: target.value };
        switch (target.name) {
            case 'email': {
                newState.validEmail = isValidEmail(target.value);
                break;
            }
            case 'password': {
                newState.validPassword = isValidPassword(target.value);
                break;
            }
            case 'confirmPassword': {
                newState.passwordsMatch = this.state.password === target.value;
                break;
            }
            default:
                break;
        }
        this.setState(newState);
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.validEmail && this.state.validPassword && this.state.passwordsMatch) {
            UserInfoService.createUser(this.state.email, this.state.password)
                .then((e) => this.onCreateUserSuccess(e))
                .catch((e) => this.onCreateUserFailure(e));
        }
    }

    onCreateUserSuccess(e) {
        this.props.transitionTo('login');
    }

    onCreateUserFailure(e) {
        console.log(e);
    }
}

export default CreateAccount;