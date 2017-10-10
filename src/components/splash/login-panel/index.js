import React, { Component } from 'react';
import Login from '../login/index';
import CreateAccount from '../create-account/index';

import './login-panel.css';

const PANELS = {
    login: Login,
    createAccount: CreateAccount
};

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPanel: 'login'
        };
    }

    render() {
        const Panel = PANELS[this.state.currentPanel];
        return (
            <div className='login-panel'>
                <Panel
                    transitionTo={ (p) => this.transitionTo(p) }
                />
            </div>
        );
    }

    transitionTo(panel) {
        this.setState({ currentPanel: panel });
    }
}

export default LoginPanel;