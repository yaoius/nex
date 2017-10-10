import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoginPanel from '../../../components/splash/login-panel';

import FirebaseService from '../../../services/firebase-service';

import './splash.css';

class Splash extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: this.props.location.state && !(this.props.location.state.fromSignOut),
            redirectToReferrer: false,
            authenticated: FirebaseService.isAuthenticated()
        };
        console.log(this.state);
        FirebaseService.addAuthListener('splash-login', (user) => this.onAuthStateChange(user));
    }

    render() {
        if (this.state.loading) {
            return <div className='splash'/>
        }
        if (this.state.authenticated) {
            FirebaseService.removeAuthListener('splash-login');
            if (this.state.redirectToReferrer) {
                return <Redirect to={this.props.location.state.from} replace/>;
            } else {
                return <Redirect to={{pathname: '/classes'}} replace/>;
            }
        }
        return (
            <div className='splash'>
                <LoginPanel />
            </div>
        );
    }

    onAuthStateChange(user) {
        let redirectToReferrer = false;
        if (this.props.location && this.props.location.state && this.props.location.state.from) {
            redirectToReferrer = true;
        }
        this.setState({authenticated: !!user, redirectToReferrer, loading: false});
    }
}

export default Splash;