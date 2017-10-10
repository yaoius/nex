import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../../../components/common/private-route';
import Loading from '../../../components/home/loading';
import ClassList from '../../../components/home/sidebar/class-list';
import Class from './class';

import FirebaseService from '../../../services/firebase-service';
import UserInfoService from '../../../services/user-info-service';

import './home.css';

class NoClasses extends Component {
    render() {
        return <div>Select a class</div>
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: this.initModel(),
            authenticated: true,
            loading: true
        };
        FirebaseService.addAuthListener('class', (user) => this.onDeauth(user))
    }

    render() {
        const { match } = this.props;
        const { model, loading } = this.state;

        if (!this.state.authenticated) {
            return <Redirect to={{pathname: '/', state: {fromSignOut: true}}}/>;
        }

        return (
            <div className='home fill'>
                { loading ? <Loading /> : null }
                <ClassList
                    model={model.classList}
                    baseUrl={match.url}
                />
                <div className='class-view-container fill'>
                    <Switch>
                        <PrivateRoute path={ `${match.url}/:cid` } component={Class}/>
                        <PrivateRoute exact path={match.url} component={NoClasses}/>
                    </Switch>
                </div>

            </div>
        );
    }

    componentDidMount() {
        this.fetchModel();
    }

    initModel() {
        return {
            userInfo: {},
            classList: []
        };
    }

    fetchModel() {
        UserInfoService.fetchUserInfo().then(userInfo => {
            UserInfoService.fetchClassList(userInfo.uid).then(classList => {
                const model = {
                    userInfo,
                    classList
                };
                this.setState({
                    model,
                    loading: false
                });
            });
        });
    }

    onDeauth(user) {
        if (!user) {
            this.setState({authenticated: false});
        }
    }
}

export default Home;