import React, {Component} from 'react';
import { isValidEmail, isValidPassword } from '../../../common/util';

import FirebaseService from '../../../services/firebase-service';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validEmail: false,
            validPassword: false
        };
    }

    render() {
        const canSubmit = this.state.validEmail && this.state.validPassword;

        return (
            <div className='login'>
                <div className='email-login-container'>
                    <form
                        onSubmit={ (e) => this.onSubmit(e) }
                    >
                        <input
                            type='text'
                            name='email'
                            placeholder='email'
                            value={this.state.email}
                            onChange={ (e) => this.onInputChange(e) }
                        /><br/>
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            value={this.state.password}
                            onChange={ (e) => this.onInputChange(e) }
                        /><br/>
                        <button
                            className='login-button'
                            type='submit'
                            style={{backgroundColor: canSubmit ? 'white' : 'black'}}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className='oauth-login-container'>

                </div>
                <div className='create-account-container'>
                    <button onClick={ () => this.props.transitionTo('createAccount') }>
                        Create an Account
                    </button>
                </div>
            </div>
        )
    }

    onInputChange(e) {
        const { target } = e;
        const newState = { [target.name]: target.value };
        if (target.name === 'email') {
            newState.validEmail = isValidEmail(target.value);
        } else {
            newState.validPassword = isValidPassword(target.value);
        }
        this.setState(newState);
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('login', this.state.email, this.state.password);
        if (this.state.validEmail && this.state.validPassword) {
            FirebaseService.authenticate(this.state.email, this.state.password)
                .then(() => this.onLogin())
                .catch((e) => this.onError(e));
        }
    }

    onLogin(e) {
        alert('success');
    }

    onError(e) {
        alert(`login failed: ${e.message}`);
    }
}

export default Login;